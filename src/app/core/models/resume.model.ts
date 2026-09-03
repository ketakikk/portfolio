export interface ContactInfo {
  name: string;
  title: string;
  tagline: string;
  phone: string;
  email: string;
  linkedin: string;
  location: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  duration: string;
  clients: string; // e.g. "Citi Bank — API Onboarding, CitiDigital MFE"
  domain: string; // e.g. "Banking Domain"
  stack: string[];
  bullets: string[];
  current?: boolean;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: string[];
}

export interface Achievement {
  id: string;
  text: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  year: string;
  detail: string;
}

/** A node in the 3D Micro-Frontend Constellation — mirrors the real MFE / client
 *  modules Ketaki has shipped, so the hero visual is literally her architecture. */
export interface ConstellationNode {
  id: string;
  label: string;
  sublabel: string;
  cluster: 'core' | 'banking' | 'telecom' | 'energy';
}
