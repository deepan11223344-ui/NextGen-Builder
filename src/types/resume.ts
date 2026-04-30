export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  jobTitle: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
}

export type TemplateId = 
  | 'classic' | 'modern' | 'minimalist' | 'creative' 
  | 'professional' | 'executive' | 'tech' | 'elegant' | 'compact' | 'bold'
  | 'minimal-dark' | 'academic' | 'gradient-border' | 'classic-navy' | 'startup'
  | 'formal-centered' | 'sidebar-right' | 'geometric' | 'soft-pastel' | 'industrial';

export interface AtsResult {
  score: number;
  grammarScore: number;
  keywordScore: number;
  formattingScore: number;
  keywordMatches: string[];
  missingKeywords: string[];
  suggestions: string[];
}
