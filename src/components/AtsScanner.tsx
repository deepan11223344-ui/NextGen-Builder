import { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, FileCheck, CheckCircle2, Award } from 'lucide-react';
import { ResumeData, AtsResult } from '../types/resume';
import { atsBuzzwords } from '../data/prewrittenData';
import confetti from 'canvas-confetti';

interface AtsScannerProps {
  data: ResumeData;
}

export default function AtsScanner({ data }: AtsScannerProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [scanResult, setScanResult] = useState<AtsResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Calculate scores
      let formattingScore = 0;
      let grammarScore = 80; // base score
      let keywordScore = 0;
      const suggestions: string[] = [];
      const keywordMatches: string[] = [];
      const missingKeywords: string[] = [];

      // 1. Formatting Check
      const { personalInfo, experience, skills, projects, education } = data;

      if (personalInfo.email && personalInfo.phone) formattingScore += 20;
      else suggestions.push("Add both your Email and Phone number for contact availability.");

      if (personalInfo.linkedin) formattingScore += 10;
      else suggestions.push("Add a LinkedIn URL. 87% of recruiters search for candidates on LinkedIn.");

      if (personalInfo.summary && personalInfo.summary.length > 100) formattingScore += 15;
      else if (personalInfo.summary) formattingScore += 5;
      else suggestions.push("Write a professional summary (100+ chars) that introduces your value proposition.");

      if (experience.length >= 2) formattingScore += 15;
      else suggestions.push("Expand your experience to at least 2 roles to demonstrate consistency.");

      if (skills.length >= 8) formattingScore += 15;
      else if (skills.length >= 5) formattingScore += 10;
      else suggestions.push("List at least 8 core hard & soft skills for better keyword density.");

      if (education.length >= 1) formattingScore += 15;
      else suggestions.push("Add your educational background.");

      if (projects.length >= 1) formattingScore += 10;

      // 2. Keyword/Buzzword Matching in Experience/Summary
      const fullResumeText = `
        ${personalInfo.jobTitle} 
        ${personalInfo.summary} 
        ${experience.map(e => `${e.position} ${e.company} ${e.description}`).join(' ')}
        ${skills.map(s => s.name).join(' ')}
        ${projects.map(p => `${p.name} ${p.description} ${p.technologies}`).join(' ')}
      `.toLowerCase();

      // Check for ATS Action Verbs
      const usedBuzzwords = atsBuzzwords.filter(word =>
        fullResumeText.includes(word.toLowerCase())
      );

      if (usedBuzzwords.length >= 10) grammarScore = 100;
      else if (usedBuzzwords.length >= 5) grammarScore = 90;
      else if (usedBuzzwords.length >= 3) grammarScore = 80;
      else {
        suggestions.push(`Use more strong action verbs (e.g. ${atsBuzzwords.slice(0, 4).join(', ')}) to describe your impact.`);
        grammarScore = 60;
      }

      // 3. Keyword Match with Job Description
      if (jobDescription.trim().length > 50) {
        const jdWords = jobDescription.toLowerCase();
        // Extract potential keywords from JD (simple version: split by space and filter common long words)
        const jdKeywords = jdWords.split(/[\s,.\/]+/).filter(w => w.length > 4);
        const uniqueJdKeywords = Array.from(new Set(jdKeywords)).slice(0, 30);

        uniqueJdKeywords.forEach(kw => {
          if (fullResumeText.includes(kw)) {
            keywordMatches.push(kw);
          } else if (["react", "node", "python", "java", "typescript", "cloud", "agile", "leadership", "management", "strategy"].includes(kw)) {
            missingKeywords.push(kw);
          }
        });

        const totalPotentialKeywords = keywordMatches.length + Math.min(missingKeywords.length, 10);
        keywordScore = totalPotentialKeywords > 0
          ? Math.round((keywordMatches.length / totalPotentialKeywords) * 100)
          : 0;

        if (missingKeywords.length > 0) {
          suggestions.push(`Integrate missing targeted keywords: ${missingKeywords.slice(0, 5).join(', ')}.`);
        }
      } else {
        // Evaluate based on industry standards if no JD provided
        const industryKeywords = ["leadership", "communication", "problem solving", "analysis", "collaboration", "strategy", "innovation"];
        let industryMatches = 0;
        industryKeywords.forEach(kw => {
          if (fullResumeText.includes(kw)) industryMatches++;
        });
        keywordScore = Math.round((industryMatches / industryKeywords.length) * 100);
        if (industryMatches < 3) {
          suggestions.push("Include more industry-standard soft skills like 'leadership', 'analysis', or 'strategy'.");
        }
      }

      const totalScore = Math.round((formattingScore * 0.4) + (grammarScore * 0.3) + (keywordScore * 0.3));

      setScanResult({
        score: totalScore,
        grammarScore,
        keywordScore,
        formattingScore,
        keywordMatches,
        missingKeywords,
        suggestions
      });

      setIsScanning(false);

      if (totalScore >= 80) {
        confetti({
          particleCount: 80,
          spread: 50,
          origin: { y: 0.6 }
        });
      }
    }, 1500);
  };

  useEffect(() => {
    if (jobDescription.length > 0 || data) {
      if (scanResult) {
        runScan();
      }
    }
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">ATS Score & Keyword Scanner</h3>
          <p className="text-xs text-gray-500">Analyze your resume against Applicant Tracking Systems</p>
        </div>
      </div>

      {/* JD Paste Area */}
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
          Paste Targeted Job Description (Optional but Recommended)
        </label>
        <textarea
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full rounded-lg border-gray-200 bg-gray-50 border p-3 focus:border-indigo-500 focus:ring-indigo-500 text-sm placeholder-gray-400"
          placeholder="Paste the job listing text here to analyze skill gaps and keyword match percentage..."
        />
      </div>

      <button
        onClick={runScan}
        disabled={isScanning}
        className="w-full py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 flex items-center justify-center gap-2 transition-all disabled:bg-slate-400"
      >
        {isScanning ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            Analyzing Content...
          </>
        ) : (
          <>
            <FileCheck size={18} />
            Scan Resume Score
          </>
        )}
      </button>

      {/* Results Display */}
      {scanResult && (
        <div className="mt-2 border-t border-gray-100 pt-6 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Score Wheel */}
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="#E2E8F0"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke={scanResult.score >= 80 ? '#10B981' : scanResult.score >= 60 ? '#F59E0B' : '#EF4444'}
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={326.7}
                  strokeDashoffset={326.7 - (326.7 * scanResult.score) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-gray-900">{scanResult.score}%</span>
                <span className="text-xxs font-bold uppercase tracking-wider text-gray-400">ATS Match</span>
              </div>
            </div>

            {/* Sub scores */}
            <div className="flex-1 grid grid-cols-3 gap-3 w-full">
              <div className="p-3 bg-gray-50 border rounded-xl text-center">
                <div className="text-xs font-semibold text-gray-500">Keywords</div>
                <div className="text-lg font-bold text-gray-800">{scanResult.keywordScore}%</div>
              </div>
              <div className="p-3 bg-gray-50 border rounded-xl text-center">
                <div className="text-xs font-semibold text-gray-500">Formatting</div>
                <div className="text-lg font-bold text-gray-800">{scanResult.formattingScore}%</div>
              </div>
              <div className="p-3 bg-gray-50 border rounded-xl text-center">
                <div className="text-xs font-semibold text-gray-500">Grammar</div>
                <div className="text-lg font-bold text-gray-800">{scanResult.grammarScore}%</div>
              </div>
            </div>
          </div>

          {/* Keyword tags */}
          {scanResult.keywordMatches.length > 0 && (
            <div className="mt-4">
              <div className="text-xs font-bold text-gray-600 uppercase mb-1.5 flex items-center gap-1">
                <CheckCircle2 size={14} className="text-green-500" />
                Matching Keywords Found:
              </div>
              <div className="flex flex-wrap gap-1">
                {scanResult.keywordMatches.map(kw => (
                  <span key={kw} className="text-xxs font-semibold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Improvement Suggestions */}
          <div className="mt-6">
            <h4 className="text-xs font-bold text-gray-600 uppercase mb-2 flex items-center gap-1">
              <AlertCircle size={14} className="text-amber-500" />
              Actionable Fixes:
            </h4>
            <ul className="space-y-2">
              {scanResult.suggestions.map((sug, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                  {sug}
                </li>
              ))}
              {scanResult.suggestions.length === 0 && (
                <li className="text-xs text-green-600 flex items-center gap-1">
                  <Award size={14} /> Perfect! Your resume meets all the foundational ATS requirements.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
