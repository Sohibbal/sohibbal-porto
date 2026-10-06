export interface Publication {
  id: string;
  title: string;
  journal: string;
  category: string;
  authors: string[];
  abstract: string;
  focus: string;
  link?: string;
  previewImage: string;
  pdfUrl?: string;
  year: string;
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
}

export interface OrganizationItem {
  id: string;
  role: string;
  event: string;
  year: string;
  image: string;
  category: 'Kepanitiaan' | 'Kepemimpinan' | 'Prestasi' | 'Dokumentasi' | 'Public Speaking';
}

export interface ToolItem {
  name: string;
  category: string;
  description: string;
  iconPath?: string;
  iconType: 'eviews' | 'excel' | 'mendeley' | 'word' | 'canva' | 'capcut';
}

export interface ContactInfo {
  whatsapp: string;
  whatsappDisplay: string;
  whatsappLink: string;
  email: string;
  instagram: string;
  instagramLink: string;
  location: string;
}

export interface PersonalProfile {
  name: string;
  role: string;
  university: string;
  faculty: string;
  major: string;
  semester: string;
  bio: string;
  quote: string;
  portraitImage: string;
}
