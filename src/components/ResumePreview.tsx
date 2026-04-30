import { forwardRef } from 'react';
import { ResumeData, TemplateId } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateId;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template }, ref) => {
    const { personalInfo, experience, education, skills, projects, certifications } = data;

    const renderClassic = () => (
      <div className="p-8 font-serif text-gray-900 bg-white max-w-4xl mx-auto shadow-sm">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-900 pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-lg font-semibold text-gray-700 mt-1">{personalInfo.jobTitle}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="underline">
                Portfolio
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="underline">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2">Professional Summary</h2>
            <p className="text-sm leading-relaxed text-gray-800">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-semibold text-sm">
                    <span>{exp.position} — {exp.company}</span>
                    <span>{exp.startDate} to {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-gray-700 whitespace-pre-line mt-1 pl-4 leading-relaxed border-l-2 border-gray-200">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-3">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-bold">{edu.degree} {edu.field && `in ${edu.field}`}</span>
                    <br />
                    <span className="text-gray-700">{edu.school}</span>
                  </div>
                  <div className="text-right text-gray-600">
                    <span>{edu.startDate} to {edu.endDate}</span>
                    {edu.gpa && <p className="text-xs mt-0.5">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-3">Projects</h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="text-sm">
                  <div className="flex justify-between font-semibold">
                    <span>{proj.name}</span>
                    <span className="text-xs text-gray-500 font-normal">{proj.technologies}</span>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Certifications */}
        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-800">
                {skills.map((skill) => (
                  <span key={skill.id}>
                    {skill.name} <span className="text-xs text-gray-400">({skill.level})</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-2">Certifications</h2>
              <div className="space-y-1 text-sm text-gray-800">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between">
                    <span>{cert.name}</span>
                    <span className="text-xs text-gray-500">{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );

    const renderModern = () => (
      <div className="font-sans text-gray-800 bg-white max-w-4xl mx-auto shadow-sm flex min-h-[842px]">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-900 text-white p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-tight">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-sm text-indigo-400 font-medium mt-1 uppercase tracking-wide">{personalInfo.jobTitle}</p>

            <div className="mt-8 space-y-4 text-xs">
              <h3 className="text-indigo-400 uppercase font-bold tracking-wider text-sm border-b border-slate-700 pb-1 mb-2">Contact</h3>
              {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.location && <p>{personalInfo.location}</p>}
              {personalInfo.website && <p className="underline break-all">{personalInfo.website}</p>}
              {personalInfo.linkedin && <p className="underline break-all">{personalInfo.linkedin}</p>}
            </div>

            {skills.length > 0 && (
              <div className="mt-8 text-xs">
                <h3 className="text-indigo-400 uppercase font-bold tracking-wider text-sm border-b border-slate-700 pb-1 mb-3">Skills</h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex flex-col">
                      <span className="font-medium">{skill.name}</span>
                      <div className="w-full bg-slate-700 h-1 mt-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full" 
                          style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Intermediate' ? '65%' : '35%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {certifications.length > 0 && (
            <div className="text-xs mt-8">
              <h3 className="text-indigo-400 uppercase font-bold tracking-wider text-sm border-b border-slate-700 pb-1 mb-2">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold">{cert.name}</p>
                    <p className="text-slate-400 text-xxs">{cert.issuer} • {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-8">
          {personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b-2 border-indigo-500 pb-1 mb-2">About Me</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b-2 border-indigo-500 pb-1 mb-4">Experience</h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 border-indigo-100">
                    <div className="absolute w-2 h-2 bg-indigo-500 rounded-full -left-[5px] top-1.5" />
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{exp.position}</h4>
                        <span className="text-xs text-indigo-600 font-semibold">{exp.company}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded border">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 whitespace-pre-line mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b-2 border-indigo-500 pb-1 mb-3">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                      <p className="text-xs text-gray-600">{edu.school}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xxs font-bold text-gray-500 uppercase tracking-wider">{edu.startDate} - {edu.endDate}</span>
                      {edu.gpa && <p className="text-xs text-indigo-600 mt-0.5 font-semibold">GPA {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b-2 border-indigo-500 pb-1 mb-3">Projects</h2>
              <div className="grid grid-cols-1 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex justify-between font-semibold text-sm">
                      <span className="text-slate-900 font-bold">{proj.name}</span>
                      <span className="text-xxs bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold uppercase">{proj.technologies}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );

    const renderMinimalist = () => (
      <div className="p-10 font-sans text-gray-700 bg-white max-w-4xl mx-auto shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <div>
            <h1 className="text-3xl font-light text-black tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-sm text-gray-500 mt-1 tracking-wider">{personalInfo.jobTitle}</p>
          </div>
          <div className="flex flex-col text-right text-xs text-gray-500 space-y-0.5 mt-4 md:mt-0">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.website && <span className="underline">{personalInfo.website}</span>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-8">
            <p className="text-sm text-gray-600 leading-relaxed font-light text-justify">{personalInfo.summary}</p>
          </div>
        )}

        <div className="space-y-8">
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-black uppercase tracking-widest border-b pb-2 mb-4">Work Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="grid md:grid-cols-4 gap-2">
                    <span className="text-xs text-gray-400 mt-0.5">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                    <div className="md:col-span-3">
                      <h4 className="text-sm font-semibold text-black">{exp.position}</h4>
                      <p className="text-xs text-gray-500">{exp.company}</p>
                      <p className="text-xs text-gray-600 whitespace-pre-line mt-2 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-black uppercase tracking-widest border-b pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="grid md:grid-cols-4 gap-2">
                    <span className="text-xs text-gray-400 mt-0.5">{edu.startDate} - {edu.endDate}</span>
                    <div className="md:col-span-3">
                      <h4 className="text-sm font-semibold text-black">{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                      <p className="text-xs text-gray-500">{edu.school} {edu.gpa && `| GPA ${edu.gpa}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-black uppercase tracking-widest border-b pb-2 mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="grid md:grid-cols-4 gap-2">
                    <span className="text-xxs font-semibold text-gray-400 mt-1 uppercase tracking-wider">{proj.technologies}</span>
                    <div className="md:col-span-3">
                      <h4 className="text-sm font-semibold text-black">{proj.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">{proj.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-black uppercase tracking-widest border-b pb-2 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );

    const renderCreative = () => (
      <div className="p-8 font-sans text-slate-800 bg-white max-w-4xl mx-auto shadow-sm rounded-lg overflow-hidden border-t-8 border-violet-600">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 mb-6 border-b border-violet-100">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-slate-900 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-lg font-semibold text-indigo-600 mt-1">{personalInfo.jobTitle}</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 text-xs text-slate-600">
            {personalInfo.email && <span className="bg-violet-50 text-violet-700 font-medium px-2 py-1 rounded-full">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="bg-violet-50 text-violet-700 font-medium px-2 py-1 rounded-full">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="bg-violet-50 text-violet-700 font-medium px-2 py-1 rounded-full">{personalInfo.location}</span>}
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mb-6 bg-gradient-to-r from-violet-50 to-indigo-50 p-4 rounded-xl border border-violet-100/50">
            <h2 className="text-sm font-bold text-violet-800 uppercase tracking-widest mb-1">About</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {experience.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-slate-900 border-b-2 border-violet-200 pb-1 mb-4 flex items-center gap-2">
                  <span className="w-2 h-4 bg-violet-600 rounded-sm"></span> Work Experience
                </h2>
                <div className="space-y-5">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative">
                      <div className="flex justify-between items-baseline font-bold text-sm text-slate-900">
                        <span>{exp.position}</span>
                        <span className="text-xs font-normal text-violet-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <p className="text-xs text-indigo-600 font-semibold mb-2">{exp.company}</p>
                      <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed pl-3 border-l border-violet-100">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-slate-900 border-b-2 border-violet-200 pb-1 mb-4 flex items-center gap-2">
                  <span className="w-2 h-4 bg-violet-600 rounded-sm"></span> Featured Projects
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 bg-violet-50/40 border border-violet-100 rounded-xl">
                      <div className="flex justify-between font-bold text-sm text-slate-900">
                        <span>{proj.name}</span>
                        <span className="text-xxs bg-violet-200/50 text-violet-800 px-1.5 py-0.5 rounded-md uppercase">{proj.technologies}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {skills.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-slate-900 border-b-2 border-violet-200 pb-1 mb-3 flex items-center gap-2">
                  <span className="w-2 h-4 bg-violet-600 rounded-sm"></span> Core Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="text-xs font-semibold bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-sm">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-slate-900 border-b-2 border-violet-200 pb-1 mb-3 flex items-center gap-2">
                  <span className="w-2 h-4 bg-violet-600 rounded-sm"></span> Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-slate-600 mt-0.5">{edu.school}</p>
                      <p className="text-xxs font-bold text-violet-600 mt-1 tracking-wider uppercase">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-slate-900 border-b-2 border-violet-200 pb-1 mb-3 flex items-center gap-2">
                  <span className="w-2 h-4 bg-violet-600 rounded-sm"></span> Certifications
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-xs p-2 bg-indigo-50/30 border border-indigo-100 rounded-lg">
                      <p className="font-semibold text-slate-900">{cert.name}</p>
                      <p className="text-slate-500 text-xxs mt-0.5">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

    const renderProfessional = () => (
      <div className="p-8 font-serif text-gray-800 bg-white max-w-4xl mx-auto shadow-sm border-t-8 border-blue-700">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-xl text-blue-700 font-medium mt-1">{personalInfo.jobTitle}</p>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-2xl">{personalInfo.summary}</p>
          </div>
          <div className="text-right space-y-1 text-xs text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-100">
            {personalInfo.email && <div className="flex items-center justify-end gap-2">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center justify-end gap-2">{personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center justify-end gap-2">{personalInfo.location}</div>}
            {personalInfo.linkedin && <div className="flex items-center justify-end gap-2 underline">{personalInfo.linkedin}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-blue-700 uppercase tracking-widest border-b border-blue-100 pb-2 mb-4">Professional Experience</h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-xs font-semibold text-gray-500 uppercase">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-sm font-bold text-blue-600 mb-2">{exp.company}</p>
                    <p className="text-xs text-gray-700 leading-relaxed pl-4 border-l-2 border-blue-50">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-8">
              {education.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold text-blue-700 uppercase tracking-widest border-b border-blue-100 pb-2 mb-4">Education</h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <h4 className="font-bold text-sm text-gray-900">{edu.degree}</h4>
                        <p className="text-xs text-gray-600">{edu.school}</p>
                        <p className="text-[10px] text-blue-600 font-bold mt-1 uppercase">{edu.startDate} - {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-8">
              {skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold text-blue-700 uppercase tracking-widest border-b border-blue-100 pb-2 mb-4">Core Competencies</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill.id} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    const renderExecutive = () => (
      <div className="font-sans text-slate-800 bg-white max-w-4xl mx-auto shadow-sm">
        <div className="bg-slate-900 text-white p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-light tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-lg text-slate-400 mt-2 font-medium tracking-wide uppercase">{personalInfo.jobTitle}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            {personalInfo.email && <span className="flex items-center gap-2">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-2">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-2">{personalInfo.location}</span>}
          </div>
        </div>
        
        <div className="p-10">
          {personalInfo.summary && (
            <div className="mb-10 text-center max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed italic text-slate-600 font-serif">"{personalInfo.summary}"</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-10">
              {experience.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 border-b-2 border-slate-900 pb-2">Leadership Experience</h2>
                  <div className="space-y-8">
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                          <span className="text-sm font-bold text-slate-500">{exp.startDate} - {exp.current ? 'PRESENT' : exp.endDate}</span>
                        </div>
                        <p className="text-md font-semibold text-slate-700 mb-3">{exp.company}</p>
                        <p className="text-sm text-slate-600 leading-relaxed text-justify">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-10">
              {skills.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 border-b-2 border-slate-900 pb-2">Expertise</h2>
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center py-1 border-b border-slate-100">
                        <span className="text-sm font-semibold">{skill.name}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {education.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 border-b-2 border-slate-900 pb-2">Credentials</h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <h4 className="font-bold text-sm">{edu.degree}</h4>
                        <p className="text-xs text-slate-500">{edu.school}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    const renderTech = () => (
      <div className="p-8 font-mono text-emerald-900 bg-emerald-50/30 max-w-4xl mx-auto shadow-sm min-h-[1000px] border border-emerald-100">
        <header className="mb-8 border-b-4 border-emerald-500 pb-6">
          <h1 className="text-4xl font-bold text-emerald-950">&gt; {personalInfo.fullName || 'USER_NAME'}</h1>
          <p className="text-xl text-emerald-700 mt-2 font-semibold">[{personalInfo.jobTitle || 'DEVELOPER'}]</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-emerald-600">
            <span># {personalInfo.email}</span>
            <span># {personalInfo.phone}</span>
            <span># {personalInfo.location}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="space-y-8">
            {skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold bg-emerald-900 text-white px-2 py-1 mb-4 inline-block">STACK</h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="flex justify-between items-center text-xs">
                        <span>{skill.name}</span>
                      </div>
                      <div className="w-full bg-emerald-100 h-1 mt-1">
                        <div 
                          className="bg-emerald-500 h-full" 
                          style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Intermediate' ? '66%' : '33%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2 className="text-sm font-bold bg-emerald-900 text-white px-2 py-1 mb-4 inline-block">CERTS</h2>
                <div className="space-y-2 text-xs">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-emerald-700">
                      * {cert.name}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          <main className="md:col-span-3 space-y-8">
            {personalInfo.summary && (
              <section>
                <h2 className="text-sm font-bold border-l-4 border-emerald-500 pl-2 mb-3 text-emerald-900 uppercase">System.log</h2>
                <p className="text-sm leading-relaxed text-emerald-800">{personalInfo.summary}</p>
              </section>
            )}

            {experience.length > 0 && (
              <section>
                <h2 className="text-sm font-bold border-l-4 border-emerald-500 pl-2 mb-6 text-emerald-900 uppercase">Work_History</h2>
                <div className="space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative">
                      <div className="flex justify-between text-sm font-bold mb-1">
                        <span>{exp.position} @ {exp.company}</span>
                        <span className="text-emerald-500">{exp.startDate} - {exp.current ? 'HEAD' : exp.endDate}</span>
                      </div>
                      <div className="text-xs text-emerald-700 whitespace-pre-line leading-relaxed pl-4 border-l border-emerald-200">
                        {exp.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 className="text-sm font-bold border-l-4 border-emerald-500 pl-2 mb-4 text-emerald-900 uppercase">Repositories</h2>
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 bg-white border border-emerald-100 rounded">
                      <div className="flex justify-between font-bold text-xs mb-1">
                        <span>./{proj.name}</span>
                        <span className="text-emerald-500 font-normal">{proj.technologies}</span>
                      </div>
                      <p className="text-xs text-emerald-700">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    );

    const renderElegant = () => (
      <div className="p-12 font-light text-slate-700 bg-[#FCF9F2] max-w-4xl mx-auto shadow-sm min-h-[1000px]">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extralight tracking-[0.2em] text-slate-900 uppercase">{personalInfo.fullName || 'Your Name'}</h1>
          <div className="w-12 h-0.5 bg-slate-300 mx-auto my-6" />
          <p className="text-sm font-medium tracking-[0.3em] text-slate-500 uppercase">{personalInfo.jobTitle}</p>
          <div className="mt-8 flex justify-center gap-6 text-[10px] tracking-widest text-slate-400 uppercase">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-16">
          {personalInfo.summary && (
            <section className="text-center italic text-lg font-serif text-slate-600 leading-relaxed">
              {personalInfo.summary}
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-[0.2em] text-slate-900 uppercase text-center mb-10">Experience</h2>
              <div className="space-y-12">
                {experience.map((exp) => (
                  <div key={exp.id} className="text-center">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">{exp.position}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">{exp.company} | {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                    <p className="text-xs leading-relaxed max-w-xl mx-auto">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-[0.2em] text-slate-900 uppercase text-center mb-8">Education</h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h4 className="text-sm font-semibold">{edu.degree}</h4>
                    <p className="text-xs text-slate-500">{edu.school} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );

    const renderCompact = () => (
      <div className="p-6 font-sans text-gray-900 bg-white max-w-4xl mx-auto shadow-sm text-[11px]">
        <div className="flex justify-between items-end border-b-2 border-gray-900 pb-2 mb-4">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-sm font-bold text-gray-700">{personalInfo.jobTitle}</p>
          </div>
          <div className="text-right text-[10px] leading-tight">
            {personalInfo.email} | {personalInfo.phone}<br />
            {personalInfo.location} | {personalInfo.linkedin}
          </div>
        </div>

        <div className="space-y-4">
          {personalInfo.summary && (
            <p className="leading-tight text-justify font-medium">{personalInfo.summary}</p>
          )}

          <section>
            <h2 className="font-black uppercase border-b border-gray-200 mb-2">Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between font-bold">
                    <span>{exp.position}, {exp.company}</span>
                    <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-gray-700 leading-snug">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section>
              <h2 className="font-black uppercase border-b border-gray-200 mb-1">Education</h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between font-bold">
                      <span>{edu.degree}</span>
                      <span>{edu.endDate}</span>
                    </div>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-black uppercase border-b border-gray-200 mb-1">Skills</h2>
              <p className="leading-tight">
                {skills.map(s => s.name).join(' • ')}
              </p>
            </section>
          </div>
        </div>
      </div>
    );

    const renderBold = () => (
      <div className="p-0 font-sans text-white bg-black max-w-4xl mx-auto shadow-2xl min-h-[1000px]">
        <div className="p-12 border-b-[20px] border-indigo-600">
          <h1 className="text-7xl font-black uppercase leading-none tracking-tighter italic">{personalInfo.fullName || 'NAME'}</h1>
          <p className="text-3xl font-black text-indigo-500 mt-4 uppercase italic">{personalInfo.jobTitle || 'EXPERTISE'}</p>
        </div>

        <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-black bg-white text-black px-4 py-1 inline-block mb-8 uppercase italic skew-x-[-10deg]">Experience</h2>
                <div className="space-y-10">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-indigo-600 pl-6">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-xl font-bold uppercase">{exp.position}</h3>
                        <span className="text-sm font-black text-indigo-500">{exp.startDate} // {exp.current ? 'NOW' : exp.endDate}</span>
                      </div>
                      <p className="text-lg font-bold text-gray-400 mb-4 uppercase">{exp.company}</p>
                      <p className="text-sm leading-relaxed text-gray-300">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-black border-b-4 border-indigo-600 pb-2 mb-6 uppercase italic">Contact</h2>
              <div className="space-y-4 text-sm font-bold uppercase tracking-wider">
                <p className="text-indigo-400">EM: <span className="text-white">{personalInfo.email}</span></p>
                <p className="text-indigo-400">PH: <span className="text-white">{personalInfo.phone}</span></p>
                <p className="text-indigo-400">LO: <span className="text-white">{personalInfo.location}</span></p>
              </div>
            </section>

            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-black border-b-4 border-indigo-600 pb-2 mb-6 uppercase italic">Arsenal</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="bg-white text-black text-xs font-black px-3 py-1 uppercase">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );

    const renderMinimalDark = () => (
      <div className="p-10 font-sans text-gray-300 bg-slate-900 max-w-4xl mx-auto shadow-2xl min-h-[1000px]">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">{personalInfo.fullName || 'NAME'}</h1>
          <p className="text-xl text-indigo-400 mt-2 font-medium">{personalInfo.jobTitle}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.location}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            {experience.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-6">Experience</h2>
                <div className="space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-bold text-gray-100">{exp.position}</h3>
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <p className="text-xs text-indigo-400 font-bold mb-3">{exp.company}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-12">
            {skills.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill.id} className="text-[10px] bg-slate-800 text-gray-300 px-2 py-1 rounded border border-slate-700">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <p className="font-bold text-gray-200">{edu.degree}</p>
                      <p className="text-gray-500 mt-0.5">{edu.school}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );

    const renderAcademic = () => (
      <div className="p-12 font-serif text-gray-800 bg-white max-w-4xl mx-auto shadow-sm border-y-[12px] border-gray-100">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-900">{personalInfo.fullName || 'Curriculum Vitae'}</h1>
          <div className="w-24 h-0.5 bg-gray-900 mx-auto my-4" />
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-600 italic">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>

        <div className="space-y-10">
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-4 italic">Professional Profile</h2>
              <p className="text-sm leading-relaxed text-gray-700 text-justify">{personalInfo.summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-6 italic">Appointments & Experience</h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-5 gap-4">
                    <div className="col-span-1 text-xs font-bold text-gray-500">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</div>
                    <div className="col-span-4">
                      <h3 className="font-bold text-sm">{exp.position}</h3>
                      <p className="text-xs font-bold text-gray-600 mb-2">{exp.company}</p>
                      <p className="text-xs text-gray-700 leading-relaxed italic">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase border-b border-gray-300 pb-1 mb-4 italic">Academic Preparation</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="font-bold text-sm">{edu.degree}, {edu.field}</p>
                      <p className="text-xs text-gray-600">{edu.school}</p>
                    </div>
                    <span className="text-xs font-bold">{edu.endDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );

    const renderGradientBorder = () => (
      <div className="relative p-[4px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl max-w-4xl mx-auto shadow-2xl">
        <div className="p-10 bg-white rounded-[12px] min-h-[1000px] font-sans">
          <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{personalInfo.fullName || 'NAME'}</h1>
              <p className="text-lg font-bold text-gray-500 mt-1 uppercase tracking-tighter">{personalInfo.jobTitle}</p>
            </div>
            <div className="flex flex-col gap-1 text-right text-xs font-bold text-gray-400">
              <span className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{personalInfo.email}</span>
              <span className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{personalInfo.phone}</span>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-3 space-y-10">
              {experience.length > 0 && (
                <section>
                  <h2 className="text-xl font-black text-gray-900 border-b-4 border-indigo-100 pb-2 mb-6">Experience</h2>
                  <div className="space-y-8">
                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-extrabold text-gray-900 text-lg">{exp.position}</h3>
                          <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg font-black">{exp.startDate} / {exp.current ? 'NOW' : exp.endDate}</span>
                        </div>
                        <p className="text-sm font-black text-purple-600 mb-3">{exp.company}</p>
                        <p className="text-sm text-gray-600 leading-relaxed pl-4 border-l-2 border-gray-100">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-10">
              {skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Skillset</h2>
                  <div className="flex flex-col gap-2">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex flex-col">
                        <span className="text-xs font-bold text-gray-700">{skill.name}</span>
                        <div className="w-full bg-gray-100 h-1.5 mt-1 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full" style={{ width: skill.level === 'Expert' ? '100%' : '60%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    );

    const renderClassicNavy = () => (
      <div className="p-8 font-serif text-gray-900 bg-white max-w-4xl mx-auto shadow-sm border-t-[16px] border-blue-950">
        <header className="text-center mb-10 pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-blue-950">{personalInfo.fullName || 'Professional CV'}</h1>
          <p className="text-md font-medium text-blue-900 mt-2 uppercase tracking-[0.2em]">{personalInfo.jobTitle}</p>
          <div className="mt-6 flex justify-center gap-6 text-xs font-bold text-gray-500">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-10">
            {experience.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-blue-950 border-b-2 border-blue-950 pb-1 mb-6">Work History</h2>
                <div className="space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between font-bold text-sm mb-1">
                        <h3 className="text-blue-950">{exp.position}</h3>
                        <span className="text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                      </div>
                      <p className="text-xs font-bold text-blue-900 italic mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-800 leading-relaxed text-justify">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="md:col-span-4 space-y-10">
            {skills.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-blue-950 border-b-2 border-blue-950 pb-1 mb-4">Competencies</h2>
                <ul className="space-y-2 text-sm font-medium text-gray-700">
                  {skills.map((skill) => (
                    <li key={skill.id} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-blue-950 border-b-2 border-blue-950 pb-1 mb-4">Education</h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <p className="font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-gray-600 mt-0.5 italic">{edu.school}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );

    const renderStartup = () => (
      <div className="p-10 font-bold text-slate-800 bg-white max-w-4xl mx-auto shadow-2xl rounded-3xl overflow-hidden border-[10px] border-teal-500">
        <div className="bg-teal-500 p-10 -m-10 mb-10 text-white flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <h1 className="text-5xl font-black tracking-tighter italic">{personalInfo.fullName || 'STARTUP_PRO'}</h1>
            <p className="text-xl text-teal-100 mt-2 font-black uppercase tracking-widest">{personalInfo.jobTitle}</p>
          </div>
          <div className="mt-6 md:mt-0 space-y-1 text-sm font-black text-teal-50">
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {experience.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-black text-teal-600 uppercase italic flex items-center gap-2">
                <div className="w-8 h-1 bg-teal-500" /> Journey
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 group hover:border-teal-300 transition-all">
                    <h3 className="text-lg font-black text-slate-900">{exp.position}</h3>
                    <p className="text-sm text-teal-600 font-black mb-4">{exp.company} // {exp.startDate}</p>
                    <p className="text-sm text-slate-600 leading-snug font-medium italic">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-10">
            {skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-teal-600 uppercase italic flex items-center gap-2">
                  <div className="w-8 h-1 bg-teal-500" /> Superpowers
                </h2>
                <div className="flex flex-wrap gap-2 mt-6">
                  {skills.map((skill) => (
                    <span key={skill.id} className="bg-slate-900 text-white text-xs px-4 py-2 rounded-xl">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-2xl font-black text-teal-600 uppercase italic flex items-center gap-2">
                  <div className="w-8 h-1 bg-teal-500" /> Build Log
                </h2>
                <div className="space-y-4 mt-6">
                  {projects.map((proj) => (
                    <div key={proj.id} className="border-l-4 border-teal-500 pl-4 py-1">
                      <h4 className="text-md font-black text-slate-900">{proj.name}</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase">{proj.technologies}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    );

    const renderFormalCentered = () => (
      <div className="p-16 font-serif text-gray-800 bg-white max-w-4xl mx-auto shadow-sm text-center border-x-[40px] border-gray-50">
        <header className="mb-16">
          <h1 className="text-4xl font-light tracking-[0.4em] uppercase text-gray-900 mb-6">{personalInfo.fullName || 'Formal Dossier'}</h1>
          <p className="text-sm font-bold tracking-[0.3em] uppercase text-gray-500 border-y border-gray-200 py-4 inline-block px-12">{personalInfo.jobTitle}</p>
          <div className="mt-8 flex justify-center gap-8 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.location}</span>
          </div>
        </header>

        <div className="max-w-2xl mx-auto space-y-16">
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-10">Professional Engagement</h2>
              <div className="space-y-12">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-md font-bold text-gray-900 uppercase tracking-widest mb-1">{exp.position}</h3>
                    <p className="text-xs font-bold text-gray-500 mb-4 italic">{exp.company} — {exp.startDate} to {exp.current ? 'Present' : exp.endDate}</p>
                    <p className="text-sm leading-relaxed text-gray-700 italic px-6">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-2 gap-12 pt-8">
            {skills.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-6">Expertise</h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <p key={skill.id} className="text-xs font-bold text-gray-600 uppercase tracking-widest">{skill.name}</p>
                  ))}
                </div>
              </section>
            )}
            {education.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.5em] text-gray-400 mb-6">Credentials</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <p className="text-xs font-bold text-gray-900 uppercase">{edu.degree}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{edu.school}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    );

    const renderSidebarRight = () => (
      <div className="font-sans text-gray-800 bg-white max-w-4xl mx-auto shadow-sm flex min-h-[1000px]">
        <div className="w-2/3 p-12">
          <header className="mb-12">
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">{personalInfo.fullName || 'PRO_NAME'}</h1>
            <p className="text-xl text-indigo-600 font-black mt-2 italic">{personalInfo.jobTitle}</p>
          </header>

          <div className="space-y-12">
            {personalInfo.summary && (
              <section>
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Core Mission</h2>
                <p className="text-lg leading-relaxed font-medium text-slate-700">{personalInfo.summary}</p>
              </section>
            )}

            {experience.length > 0 && (
              <section>
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Career Path</h2>
                <div className="space-y-10">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-8">
                      <div className="absolute w-1 h-full bg-indigo-50 left-0 rounded-full" />
                      <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-1 top-2" />
                      <h3 className="text-lg font-black text-slate-900">{exp.position}</h3>
                      <p className="text-sm font-bold text-indigo-600 mb-4">{exp.company} // {exp.startDate}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="w-1/3 bg-slate-50 border-l border-gray-100 p-12 space-y-12">
          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Contact</h2>
            <div className="space-y-3 text-xs font-bold text-slate-600">
              <p className="break-all">{personalInfo.email}</p>
              <p>{personalInfo.phone}</p>
              <p>{personalInfo.location}</p>
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Toolkit</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold shadow-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Training</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <p className="text-xs font-black text-slate-900">{edu.degree}</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{edu.school}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    );

    const renderGeometric = () => (
      <div className="p-0 font-sans text-slate-800 bg-white max-w-4xl mx-auto shadow-2xl min-h-[1000px] border-[20px] border-slate-50 overflow-hidden">
        <div className="relative p-12 bg-slate-900 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rotate-45 translate-x-32 -translate-y-32" />
          <h1 className="text-5xl font-black italic tracking-tighter relative z-10">{personalInfo.fullName || 'GEO_METRIC'}</h1>
          <p className="text-xl text-emerald-400 font-bold mt-4 uppercase tracking-[0.4em] relative z-10">{personalInfo.jobTitle}</p>
        </div>

        <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-12">
            {experience.length > 0 && (
              <section>
                <h2 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-4">
                  <div className="w-4 h-4 bg-emerald-500 rotate-45" /> PROFESSIONAL LOG
                </h2>
                <div className="space-y-10">
                  {experience.map((exp) => (
                    <div key={exp.id} className="group">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">{exp.position}</h3>
                        <span className="text-[10px] font-black text-slate-400 italic">{exp.startDate} // {exp.endDate || 'NOW'}</span>
                      </div>
                      <p className="text-xs font-black text-slate-500 mb-4 uppercase">{exp.company}</p>
                      <p className="text-sm leading-relaxed text-slate-600 pl-6 border-l-4 border-slate-100">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-12">
            <section className="bg-slate-50 p-8 rounded-tr-[40px]">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 border-b-2 border-emerald-500 pb-2 inline-block">CORE_DATA</h2>
              <div className="space-y-4 text-xs font-bold text-slate-500 break-all">
                <p>MAIL: {personalInfo.email}</p>
                <p>PHON: {personalInfo.phone}</p>
                <p>LOCA: {personalInfo.location}</p>
              </div>
            </section>

            {skills.length > 0 && (
              <section>
                <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 border-b-2 border-emerald-500 pb-2 inline-block">ARSENAL</h2>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="text-[10px] font-black bg-white border-2 border-slate-100 p-2 text-center uppercase group hover:border-emerald-500 transition-all">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );

    const renderSoftPastel = () => (
      <div className="p-12 font-light text-rose-950 bg-rose-50/50 max-w-4xl mx-auto shadow-sm min-h-[1000px] border-t-[12px] border-rose-200">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extralight tracking-tight text-rose-900">{personalInfo.fullName || 'Name'}</h1>
          <p className="text-lg text-rose-400 mt-2 font-medium italic">{personalInfo.jobTitle}</p>
          <div className="mt-8 flex justify-center gap-6 text-xs font-bold text-rose-300">
            <span>{personalInfo.email}</span>
            <span>✧</span>
            <span>{personalInfo.phone}</span>
            <span>✧</span>
            <span>{personalInfo.location}</span>
          </div>
        </header>

        <div className="max-w-2xl mx-auto space-y-16">
          {personalInfo.summary && (
            <section className="bg-white p-10 rounded-[40px] shadow-sm border border-rose-100 italic text-center leading-relaxed text-rose-800">
              {personalInfo.summary}
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-rose-300 text-center mb-10">Professional Narrative</h2>
              <div className="space-y-12">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative text-center">
                    <h3 className="text-lg font-bold text-rose-900 mb-1">{exp.position}</h3>
                    <p className="text-xs font-medium text-rose-400 mb-4 uppercase tracking-widest">{exp.company} • {exp.startDate}</p>
                    <p className="text-sm leading-relaxed text-rose-800/80 max-w-xl mx-auto">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section className="text-center">
              <h2 className="text-xs font-bold uppercase tracking-widest text-rose-300 mb-6">Expertise</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-white text-rose-800 px-4 py-2 rounded-full text-xs font-bold border border-rose-100 shadow-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );

    const renderIndustrial = () => (
      <div className="p-8 font-mono text-zinc-900 bg-zinc-100 max-w-4xl mx-auto shadow-2xl min-h-[1000px] border-8 border-zinc-900">
        <header className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-b-8 border-zinc-900 pb-8">
          <div>
            <h1 className="text-5xl font-black uppercase leading-none tracking-tighter">{personalInfo.fullName || 'OPERATOR'}</h1>
            <p className="text-2xl font-black bg-zinc-900 text-zinc-100 px-4 py-1 mt-4 inline-block">{personalInfo.jobTitle || 'SPEC_ROLE'}</p>
          </div>
          <div className="flex flex-col justify-end text-right text-sm font-black space-y-1">
            <p>[MAIL]: {personalInfo.email}</p>
            <p>[PHON]: {personalInfo.phone}</p>
            <p>[LOCA]: {personalInfo.location}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-black border-b-4 border-zinc-900 pb-2 mb-8 uppercase">Operational History</h2>
                <div className="space-y-12">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border-l-8 border-zinc-900 pl-6 py-2">
                      <div className="flex justify-between font-black text-lg mb-2">
                        <span>{exp.position}</span>
                        <span className="text-zinc-500">{exp.startDate}</span>
                      </div>
                      <p className="text-md font-black text-zinc-600 mb-4 uppercase">{exp.company}</p>
                      <p className="text-sm leading-tight text-zinc-800 font-bold">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-12">
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-black bg-zinc-900 text-zinc-100 px-3 py-1 mb-6 uppercase inline-block">Capability</h2>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-3 border-2 border-zinc-900 font-black text-xs uppercase text-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-black bg-zinc-900 text-zinc-100 px-3 py-1 mb-6 uppercase inline-block">Technical Ed</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-6 font-black text-xs">
                    <p className="text-zinc-900 uppercase">{edu.degree}</p>
                    <p className="text-zinc-500 mt-1">{edu.school}</p>
                  </div>
                ))}
              </section>
            )}
          </aside>
        </div>
      </div>
    );

    return (
      <div ref={ref} className="print:shadow-none print:p-0">
        {template === 'classic' && renderClassic()}
        {template === 'modern' && renderModern()}
        {template === 'minimalist' && renderMinimalist()}
        {template === 'creative' && renderCreative()}
        {template === 'professional' && renderProfessional()}
        {template === 'executive' && renderExecutive()}
        {template === 'tech' && renderTech()}
        {template === 'elegant' && renderElegant()}
        {template === 'compact' && renderCompact()}
        {template === 'bold' && renderBold()}
        {template === 'minimal-dark' && renderMinimalDark()}
        {template === 'academic' && renderAcademic()}
        {template === 'gradient-border' && renderGradientBorder()}
        {template === 'classic-navy' && renderClassicNavy()}
        {template === 'startup' && renderStartup()}
        {template === 'formal-centered' && renderFormalCentered()}
        {template === 'sidebar-right' && renderSidebarRight()}
        {template === 'geometric' && renderGeometric()}
        {template === 'soft-pastel' && renderSoftPastel()}
        {template === 'industrial' && renderIndustrial()}
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;
