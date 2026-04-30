import { TemplateId } from '../types/resume';

interface TemplateSelectorProps {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}

const templates = [
  {
    id: 'classic',
    title: 'Executive Classic',
    description: 'Traditional layout ideal for Corporate, Legal, and Finance.',
    style: 'font-serif bg-gray-50 border-t-4 border-gray-700'
  },
  {
    id: 'modern',
    title: 'Modern Professional',
    description: 'Clean sidebar style for Technology, Engineering, & Startups.',
    style: 'font-sans bg-slate-900 text-white'
  },
  {
    id: 'minimalist',
    title: 'Sleek Minimal',
    description: 'Ultra-clean, elegant spacing best for Business Analytics.',
    style: 'font-light bg-white border border-gray-200'
  },
  {
    id: 'creative',
    title: 'Creative Edge',
    description: 'Bold visual statements perfect for Marketing & Design.',
    style: 'font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
  },
  {
    id: 'professional',
    title: 'Professional Blue',
    description: 'Modern serif headings with clean, professional accents.',
    style: 'font-serif bg-white border-l-4 border-blue-600'
  },
  {
    id: 'executive',
    title: 'Executive Leader',
    description: 'Bold top-header designed for high-level management.',
    style: 'font-sans bg-slate-800 text-white'
  },
  {
    id: 'tech',
    title: 'Tech & Dev',
    description: 'Skills-first layout with developer-friendly aesthetics.',
    style: 'font-mono bg-emerald-50 text-emerald-900 border border-emerald-200'
  },
  {
    id: 'elegant',
    title: 'Elegant Ivory',
    description: 'Refined spacing and soft colors for a premium feel.',
    style: 'font-light bg-[#FCF9F2] text-[#4A4A4A]'
  },
  {
    id: 'compact',
    title: 'Compact Pro',
    description: 'Maximum density for extensive career histories.',
    style: 'font-sans bg-gray-100 text-gray-800 border-y border-gray-300'
  },
  {
    id: 'bold',
    title: 'High Contrast',
    description: 'Impactful design with strong typography and borders.',
    style: 'font-black bg-black text-white'
  },
  {
    id: 'minimal-dark',
    title: 'Minimalist Dark',
    description: 'Ultra-sleek dark theme for a sophisticated digital presence.',
    style: 'font-sans bg-gray-900 text-gray-100'
  },
  {
    id: 'academic',
    title: 'Academic CV',
    description: 'Structured layout optimized for research and publications.',
    style: 'font-serif bg-white border-y-2 border-gray-400'
  },
  {
    id: 'gradient-border',
    title: 'Gradient Edge',
    description: 'Modern aesthetic featuring a dynamic, colorful border.',
    style: 'font-sans bg-white border-4 border-indigo-500'
  },
  {
    id: 'classic-navy',
    title: 'Classic Navy',
    description: 'Traditional corporate look with deep navy accents.',
    style: 'font-serif bg-white border-t-8 border-blue-900'
  },
  {
    id: 'startup',
    title: 'Startup Vibes',
    description: 'Bold, energetic colors perfect for the tech industry.',
    style: 'font-bold bg-teal-500 text-white'
  },
  {
    id: 'formal-centered',
    title: 'Formal Centered',
    description: 'Perfectly symmetrical layout for a balanced, formal look.',
    style: 'font-serif bg-white text-center border-x-4 border-gray-100'
  },
  {
    id: 'sidebar-right',
    title: 'Right Sidebar',
    description: 'An unconventional but effective right-side info panel.',
    style: 'font-sans bg-white border-r-8 border-indigo-100'
  },
  {
    id: 'geometric',
    title: 'Geometric Flow',
    description: 'Clean shapes and sharp lines for a modern, structured feel.',
    style: 'font-sans bg-gray-50 border-l-8 border-emerald-500'
  },
  {
    id: 'soft-pastel',
    title: 'Soft Pastel',
    description: 'Approachable, warm design with gentle rose accents.',
    style: 'font-light bg-rose-50 text-rose-900 border border-rose-100'
  },
  {
    id: 'industrial',
    title: 'Industrial Grid',
    description: 'Heavy fonts and steel tones for a robust, technical vibe.',
    style: 'font-mono bg-zinc-200 text-zinc-900 border border-zinc-400'
  }
];

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Choose Design Template</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => onSelect(tmpl.id as TemplateId)}
            className={`p-4 rounded-xl text-left border-2 transition-all flex flex-col justify-between h-32 ${
              selected === tmpl.id
                ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-md'
                : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
            }`}
          >
            <div>
              <div className="text-xs font-bold text-gray-900">{tmpl.title}</div>
              <p className="text-xxs text-gray-500 mt-1 leading-tight">{tmpl.description}</p>
            </div>
            <div className={`mt-2 w-full h-8 rounded flex items-center justify-center text-[10px] font-semibold uppercase tracking-wider ${tmpl.style}`}>
              Aa
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
