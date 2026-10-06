export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI / Machine Learning' | 'Mobile & Web' | 'MLOps';
  projectType: 'Group Project' | 'Individual Project';
  summary: string;
  role: string;
  contribution: string;
  whatILearned: string;
  techStack: string[];
  previewImage: string;
  githubUrl?: string;
  deployUrl?: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  images: string[];
  tags: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  description: string;
  badge?: string;
}

export interface AcademicCommunityItem {
  id: string;
  role: string;
  event: string;
  year: string;
  image: string;
  category: 'Asisten Laboratorium' | 'AI Cohort' | 'Riset & Software' | 'Workshop & Hackathon';
  description: string;
}

export interface ToolItem {
  name: string;
  category: string;
  description: string;
  iconPath?: string;
}

export interface ContactInfo {
  whatsapp: string;
  whatsappDisplay: string;
  whatsappLink: string;
  email: string;
  instagram: string;
  instagramLink: string;
  github: string;
  githubLink: string;
  linkedin: string;
  linkedinLink: string;
  location: string;
}

export interface PersonalProfile {
  name: string;
  roles: string[];
  university: string;
  faculty: string;
  major: string;
  gpa: string;
  bio: string;
  motto: string;
  portraitImage: string;
}
