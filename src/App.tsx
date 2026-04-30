import { useState, useRef } from 'react';
import { 
  Download, Sparkles, FileText, RefreshCcw, Eye, Edit3, ArrowUpRight
} from 'lucide-react';
import { ResumeData, TemplateId } from './types/resume';
import { initialResumeData } from './data/prewrittenData';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import AtsScanner from './components/AtsScanner';
import TemplateSelector from './components/TemplateSelector';

const emptyResume: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    jobTitle: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: []
};

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [template, setTemplate] = useState<TemplateId>('modern');
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to erase your resume data?")) {
      setResumeData(emptyResume);
    }
  };

  const handleLoadDemo = () => {
    setResumeData(initialResumeData);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans">
      {/* Header (Hidden on Print) */}
      <header className="no-print bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-200">
              <Sparkles size={22} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 flex items-center gap-1.5">
                NextGen Builder <span className="text-xxs px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">ATS Optimized</span>
              </h1>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleLoadDemo}
              className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 border border-indigo-100 rounded-lg transition"
            >
              <ArrowUpRight size={14} /> Load Demo
            </button>
            <button
              onClick={handleReset}
              className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition"
            >
              <RefreshCcw size={14} /> Clear
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition"
            >
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Template Selector (Hidden on Print) */}
        <div className="no-print">
          <TemplateSelector selected={template} onSelect={setTemplate} />
        </div>

        {/* Workspace Layout Controls (Hidden on Print) */}
        <div className="no-print flex justify-center">
          <div className="bg-white border border-gray-200 rounded-xl p-1 flex items-center shadow-sm">
            <button
              onClick={() => setViewMode('edit')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition ${
                viewMode === 'edit' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Edit3 size={14} /> Edit Form
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`hidden md:flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition ${
                viewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <FileText size={14} /> Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition ${
                viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Eye size={14} /> Final Preview
            </button>
          </div>
        </div>

        {/* Builder Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <div className={`lg:col-span-6 no-print ${viewMode === 'preview' ? 'hidden' : 'block'} ${viewMode === 'edit' ? 'lg:col-span-12' : ''}`}>
            <ResumeForm data={resumeData} onChange={setResumeData} />
            <div className="mt-8">
              <AtsScanner data={resumeData} />
            </div>
          </div>

          {/* Preview Side */}
          <div className={`lg:col-span-6 ${viewMode === 'edit' ? 'hidden' : 'block'} ${viewMode === 'preview' ? 'lg:col-span-12' : ''} print-full`}>
            <div className="bg-gray-100 p-4 md:p-8 rounded-xl border border-gray-200 shadow-inner flex justify-center overflow-auto print:bg-white print:p-0 print:border-0 print:shadow-none">
              <div className="w-full bg-white shadow-xl print:shadow-none print-full">
                <ResumePreview data={resumeData} template={template} ref={previewRef} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Info (Hidden on Print) */}
      <footer className="no-print text-center py-8 text-xs text-gray-400 border-t border-gray-100 mt-12 bg-white">
        <p>© 2026 NextGen Resume Builder. All templates are 100% compliant with enterprise applicant parsing engines.</p>
      </footer>
    </div>
  );
}
