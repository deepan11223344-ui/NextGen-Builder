import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, Code, FolderGit2, Award, Plus, Trash2, ChevronRight
} from 'lucide-react';
import { ResumeData, Experience, Education, Skill, Project, Certification } from '../types/resume';
import { prewrittenRoles } from '../data/prewrittenData';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
}

const tabs = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'certs', label: 'Certifications', icon: Award },
];

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPrewritten, setShowPrewritten] = useState(false);

  // Personal Info handlers
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [name]: value
      }
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: updated });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = data.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: updated });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter(edu => edu.id !== id) });
  };

  // Skills handlers
  const addSkill = (name = '', level: Skill['level'] = 'Intermediate') => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}-${Math.random()}`,
      name,
      level
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, value: string) => {
    const updated = data.skills.map(s => s.id === id ? { ...s, name: value } : s);
    onChange({ ...data, skills: updated });
  };

  const updateSkillLevel = (id: string, level: Skill['level']) => {
    const updated = data.skills.map(s => s.id === id ? { ...s, level } : s);
    onChange({ ...data, skills: updated });
  };

  const removeSkill = (id: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  // Projects handlers
  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: ''
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updated = data.projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    onChange({ ...data, projects: updated });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter(proj => proj.id !== id) });
  };

  // Certifications handlers
  const addCert = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: ''
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const updateCert = (id: string, field: keyof Certification, value: string) => {
    const updated = data.certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    onChange({ ...data, certifications: updated });
  };

  const removeCert = (id: string) => {
    onChange({ ...data, certifications: data.certifications.filter(cert => cert.id !== id) });
  };

  // Handle adding prewritten role bullets/skills
  const handleAddPrewritten = (role: typeof prewrittenRoles[0]) => {
    // Add skills not present
    const existingSkills = data.skills.map(s => s.name.toLowerCase());
    const newSkills: Skill[] = [];
    role.skills.forEach(skillName => {
      if (!existingSkills.includes(skillName.toLowerCase())) {
        newSkills.push({
          id: `skill-${Date.now()}-${Math.random()}`,
          name: skillName,
          level: 'Intermediate'
        });
      }
    });

    // Add as a new experience placeholder or add to current
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: 'Company Name',
      position: role.category,
      startDate: '2024-01',
      endDate: '',
      current: true,
      description: role.bullets.join('\n')
    };

    onChange({
      ...data,
      skills: [...data.skills, ...newSkills],
      experience: [...data.experience, newExp]
    });
    setShowPrewritten(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Tabs list */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-4 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6 flex-1 overflow-y-auto max-h-[calc(100vh-320px)]">
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={data.personalInfo.fullName}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2.5"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Professional Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={data.personalInfo.jobTitle}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2.5"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={data.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2.5"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={data.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2.5"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Location</label>
                <input
                  type="text"
                  name="location"
                  value={data.personalInfo.location}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2.5"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase">Website / Portfolio</label>
                <input
                  type="text"
                  name="website"
                  value={data.personalInfo.website}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2.5"
                  placeholder="https://johndoe.dev"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 uppercase">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin"
                  value={data.personalInfo.linkedin}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2.5"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-600 uppercase">Professional Summary</label>
              <textarea
                name="summary"
                rows={4}
                value={data.personalInfo.summary}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50 border p-2.5"
                placeholder="A short, catchy summary of your professional background..."
              />
            </div>

            {/* Smart Suggestions Callout */}
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between mt-4">
              <div>
                <h4 className="text-sm font-semibold text-indigo-900">Need inspiration?</h4>
                <p className="text-xs text-indigo-700">Import pre-written experiences and targeted skills.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPrewritten(!showPrewritten)}
                className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
              >
                Insert Examples
              </button>
            </div>

            {showPrewritten && (
              <div className="mt-3 border border-gray-200 rounded-xl p-4 bg-white grid grid-cols-1 gap-2">
                <h5 className="text-xs font-bold text-gray-500 uppercase mb-1">Select a Role Profile:</h5>
                {prewrittenRoles.map((role) => (
                  <button
                    key={role.category}
                    type="button"
                    onClick={() => handleAddPrewritten(role)}
                    className="flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:bg-indigo-50/50 hover:border-indigo-200 transition text-left text-sm text-gray-700 font-medium"
                  >
                    <span>{role.category}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Tech Global Inc"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Job Title / Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Senior Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Start Date</label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">End Date</label>
                    <input
                      type="month"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 disabled:bg-gray-100 disabled:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-xs font-semibold text-gray-600">
                      I currently work here
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600">
                      Description / Key Achievements (Use bullet points for better ATS scoring)
                    </label>
                    <textarea
                      rows={4}
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      placeholder="- Spearheaded feature X reducing downtime by 10%&#10;- Coached a team of 4 interns"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addExperience}
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <Plus size={16} />
              Add Experience
            </button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">School/University</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="MIT"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">GPA (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="3.8"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Start Date</label>
                    <input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">End Date</label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addEducation}
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <Plus size={16} />
              Add Education
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg group">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, e.target.value)}
                    className="flex-1 text-sm bg-white border border-gray-200 rounded px-2 py-1 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Skill Name"
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkillLevel(skill.id, e.target.value as Skill['level'])}
                    className="text-xs bg-white border border-gray-200 rounded p-1"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mb-4 items-center">
              <button
                onClick={() => addSkill()}
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <Plus size={16} />
                Add Skill
              </button>
            </div>

            {/* Quick Skills Pick */}
            <div>
              <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Quick Add Popular Skills:</h5>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "Python", "Project Management", "Data Analysis", "SQL", "Team Leadership", "Communication"].map(sk => (
                  <button
                    key={sk}
                    onClick={() => addSkill(sk, 'Intermediate')}
                    disabled={data.skills.some(s => s.name.toLowerCase() === sk.toLowerCase())}
                    className="text-xs px-2.5 py-1 bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 transition"
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                <button
                  onClick={() => removeProject(proj.id)}
                  className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="My Portfolio"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Technologies Used</label>
                    <input
                      type="text"
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="React, Firebase, Tailwind"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600">Link (Optional)</label>
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600">Description</label>
                    <textarea
                      rows={3}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      placeholder="Describe the objective, features, and your role..."
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addProject}
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        )}

        {activeTab === 'certs' && (
          <div className="space-y-6">
            {data.certifications.map((cert) => (
              <div key={cert.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                <button
                  onClick={() => removeCert(cert.id)}
                  className="absolute top-4 right-4 p-1 text-gray-400 hover:text-red-500 rounded"
                >
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Certification Name</label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600">Issuing Organization</label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600">Issue Date</label>
                    <input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCert(cert.id, 'date', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-200 bg-white border p-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addCert}
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <Plus size={16} />
              Add Certification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
