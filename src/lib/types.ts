export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  previewImage: string;
  highlights: string[];
  screenshots: string[];
};

export type Education = {
  id: string;
  institution: string;
  qualification: string;
  location: string;
  period: string;
};

export type SkillCard = {
  id: string;
  label: string;
  detail: string;
  mark: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: SkillCard[];
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verificationUrl: string;
  previewImage?: string;
};

export type SocialLink = {
  label: string;
  href: string;
};
