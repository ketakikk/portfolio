import {
  Achievement,
  ConstellationNode,
  ContactInfo,
  EducationEntry,
  ExperienceEntry,
  SkillCategory,
} from '../models/resume.model';

export const CONTACT: ContactInfo = {
  name: 'Ketaki Kadam',
  title: 'Senior Angular Developer',
  tagline:
    '8+ years shipping enterprise-scale, micro-frontend architectures for banking, telecom & energy platforms.',
  phone: '8369816146',
  email: 'Kadamketaki25@gmail.com',
  linkedin: 'linkedin.com/in/ketaki-kadam',
  location: 'Pune, India',
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'photon',
    role: 'Sr. Software Engineer II',
    company: 'Photon Interactive Pvt. Ltd',
    duration: 'Apr 2025 — Present',
    clients: 'Citi Bank — API Onboarding, CitiDigital MFE, SLA Dashboard MFE',
    domain: 'Banking',
    stack: ['Angular 18', 'RxJS', 'Jest', 'Harness CI/CD'],
    current: true,
    bullets: [
      "Independently designed and integrated 3 Micro-Frontend modules on Citi's Olympus platform, enabling modular, scalable deployment across cross-functional teams.",
      'Implemented new platform features using the latest RxJS operators and Angular 18 best practices, improving maintainability and cutting review cycle time.',
      'Wrote comprehensive Jest unit test suites and enforced SonarQube quality gates across all MFEs before deployment via Harness CI/CD.',
      'Conducted PR reviews for team members, ensuring coding-standard adherence and reducing post-release defects.',
      'Coordinated end-to-end releases from dev through production; ran daily Scrum ceremonies and sprint planning.',
    ],
  },
  {
    id: 'techm',
    role: 'Sr. Software Engineer',
    company: 'Tech Mahindra',
    duration: 'Sep 2020 — Mar 2025',
    clients: 'AT&T — CNIO / ATLAS  ·  Reliance Industries — Platform & BOC',
    domain: 'Telecom & Oil / Gas',
    stack: ['Angular 16', 'Angular 8', 'Node.js', 'NestJS', 'MySQL', 'Azure', 'Jest'],
    bullets: [
      'Authored solution documents and presented technical designs to a 10+ member cross-domain team ahead of every sprint.',
      'Spearheaded migration of the Central Office team from legacy GCAS to the unified ATLAS platform, streamlining operations across Digital Electronics Groups.',
      'Built scalable Angular 16 features with RxJS; implemented lazy loading and change-detection optimisations for performance.',
      'Authored NestJS microservice controllers, contributing to cleaner backend separation of concerns.',
      'Developed a multi-application platform (Reliance Industries) replacing manual Excel workflows for crude and product trades.',
      'Designed Node.js microservices with MySQL stored procedures for trade-data management; configured Azure Pipelines for automated deployment.',
    ],
  },
  {
    id: 'mindcraft',
    role: 'Frontend Developer',
    company: 'MindCraft Software Pvt. Ltd',
    duration: 'Sep 2019 — Aug 2020',
    clients: 'RBL Bank — FinHsac, STP, Video KYC Login, PAN Validation',
    domain: 'Banking',
    stack: ['Angular 5', 'jQuery', 'XML', 'JavaScript'],
    bullets: [
      'Delivered 4 production banking applications spanning approval workflows, product upgrades, video KYC onboarding and PAN validation.',
      'Built dual-view (web and mobile) Angular 5 applications ensuring cross-browser compatibility and accessibility.',
      'Integrated XML-format APIs and implemented OTP authentication flows for secure customer onboarding.',
      'Ran usability testing and best-practice diagnostics ahead of every production release.',
    ],
  },
  {
    id: 'vernost',
    role: 'Software Engineer',
    company: 'Vernost Marketing Services Pvt. Ltd',
    duration: 'Jun 2017 — Jul 2019',
    clients: 'Hospitality, Retail Affiliate, CRM, Airline domains',
    domain: 'Multi-domain',
    stack: ['Angular 2', 'NativeScript', 'MySQL', 'jQuery', 'AWS S3'],
    bullets: [
      'Built hotel and retail-affiliate platforms (HAMSE, Shop Affiliate) surfacing real-time pricing from multiple vendors, with Google Maps and push notifications.',
      'Built the VMS-CRM system managing customer relationships and transaction history for a loyalty-marketing suite.',
      'Delivered QE App, a NativeScript iOS quick-enrolment app for the Jet Privilege frequent-flyer programme.',
      'Managed AWS S3 deployments and handled production fixes with minimal downtime.',
    ],
  },
];

export const SKILLS: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      'Angular 2 → 18',
      'TypeScript',
      'JavaScript (ES6+)',
      'RxJS',
      'NgRx',
      'Micro-Frontend (MFE)',
      'Change Detection Strategies',
      'PWA / Lazy Loading',
      'HTML5 / CSS3 / Bootstrap',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'NestJS', 'RESTful APIs', 'Microservices'],
  },
  {
    id: 'data',
    label: 'Data',
    items: ['MySQL (Stored Procedures)', 'MongoDB', 'NoSQL'],
  },
  {
    id: 'testing',
    label: 'Quality',
    items: ['Jest', 'Jasmine', 'SonarQube gates', 'Unit & integration testing', 'E2E testing'],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    items: [
      'Azure Pipelines / DevOps',
      'Harness CI/CD',
      'GitHub / SVN',
      'Kubernetes',
      'Docker',
      'Autosys',
      'JIRA',
    ],
  },
  {
    id: 'practice',
    label: 'Practice',
    items: ['Agile / Scrum', 'SDLC', 'Code Reviews', 'Mentoring', 'Citi Olympus Design System'],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'patb',
    text: "Received the Pat on the Back Award at Tech Mahindra for transitioning from Frontend to Full-Stack Developer and delivering full-stack features independently.",
  },
  {
    id: 'olympus',
    text: "Recognised for single-handedly architecting and integrating Micro-Frontends on Citi's globally deployed Olympus banking platform, on timeline.",
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    id: 'be',
    degree: 'B.E.',
    institution: 'Datta Meghe College of Engineering',
    year: '2016',
    detail: 'CGPA 6.47',
  },
  {
    id: 'dip',
    degree: 'Diploma',
    institution: "St. Xavier's Technical Institute",
    year: '2013',
    detail: '77%',
  },
];

/** Nodes for the hero 3D constellation — each is a real module/client Ketaki has shipped. */
export const CONSTELLATION_NODES: ConstellationNode[] = [
  { id: 'core', label: 'Ketaki Kadam', sublabel: 'Senior Angular Developer', cluster: 'core' },
  { id: 'citi-api', label: 'API Onboarding', sublabel: 'Citi Bank · MFE', cluster: 'banking' },
  { id: 'citi-digital', label: 'CitiDigital MFE', sublabel: 'Citi Bank', cluster: 'banking' },
  { id: 'citi-sla', label: 'SLA Dashboard', sublabel: 'Citi Bank · MFE', cluster: 'banking' },
  { id: 'rbl', label: 'Video KYC', sublabel: 'RBL Bank', cluster: 'banking' },
  { id: 'atlas', label: 'ATLAS Platform', sublabel: 'AT&T · Telecom', cluster: 'telecom' },
  { id: 'gcas', label: 'GCAS Migration', sublabel: 'AT&T · Central Office', cluster: 'telecom' },
  { id: 'reliance', label: 'Trade Platform', sublabel: 'Reliance · Oil & Gas', cluster: 'energy' },
];
