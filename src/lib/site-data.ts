import type { Certificate, Education, Project, SkillGroup, SocialLink } from "@/lib/types";

export const siteConfig = {
  name: "Shivam Ojha",
  role: "Full Stack Developer",
  profileImage: "/images/projects/profile-avatar.webp",
  resumeUrl: "/resume/shivam-ojha-resume.pdf",
  email: "Ojhashivam936@gmail.com",
  github: "https://github.com/shivam6677ojh",
  linkedin: "https://www.linkedin.com/in/shivamojha07/",
  tagline: "I build immersive web experiences",
  bio: "I am a full stack engineer focused on production-grade web products with clean architecture, secure APIs, and polished interfaces. My recent work includes booking systems, real-time communication products, and CI/CD powered deployments.",
};

export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Socket.io",
  "Docker",
  "GitHub Actions",
  "Clerk",
];

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    items: [
      { id: "c", label: "C", detail: "C", mark: "C" },
      { id: "cpp", label: "C++", detail: "C++", mark: "++" },
      { id: "java", label: "Java", detail: "Java", mark: "J" },
      { id: "javascript", label: "JavaScript", detail: "(ES6+)", mark: "JS" },
      { id: "typescript", label: "TypeScript", detail: "TypeScript", mark: "TS" },
      { id: "python", label: "Python", detail: "Python", mark: "Py" },
      { id: "php", label: "PHP", detail: "PHP", mark: "PHP" },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    items: [
      { id: "reactjs", label: "React.js", detail: "React.js", mark: "R" },
      { id: "nodejs", label: "Node.js", detail: "Node.js", mark: "N" },
      { id: "expressjs", label: "Express.js", detail: "Express.js", mark: "Ex" },
      { id: "tailwind", label: "Tailwind CSS", detail: "Tailwind CSS", mark: "TW" },
      { id: "vite", label: "Vite", detail: "Vite", mark: "V" },
      { id: "axios", label: "Axios", detail: "Axios", mark: "AX" },
      { id: "react-router", label: "React Router", detail: "React Router", mark: "RR" },
      { id: "jwt", label: "JWT", detail: "JWT", mark: "JW" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { id: "git", label: "Git", detail: "Git", mark: "G" },
      { id: "github-actions", label: "GitHub Actions", detail: "(CI/CD)", mark: "GA" },
      { id: "vscode", label: "VS Code", detail: "VS Code", mark: "VS" },
      { id: "docker", label: "Docker", detail: "Docker", mark: "DK" },
      { id: "mongodb", label: "MongoDB", detail: "MongoDB", mark: "MDB" },
      { id: "postman", label: "Postman", detail: "Postman", mark: "PM" },
      { id: "wordpress", label: "WordPress", detail: "WordPress", mark: "W" },
      { id: "cloudinary", label: "Cloudinary", detail: "Cloudinary", mark: "CL" },
      { id: "render", label: "Render", detail: "Render", mark: "R" },
      { id: "vercel", label: "Vercel", detail: "Vercel", mark: "V" },
      { id: "android-studio", label: "Android Studio", detail: "Android Studio", mark: "AS" },
    ],
  },
  {
    id: "soft-skills",
    title: "SoftSkills",
    items: [
      { id: "problem-solving", label: "Problem Solving", detail: "Problem Solving", mark: "PS" },
      { id: "adaptability", label: "Adaptability", detail: "Adaptability", mark: "AD" },
      { id: "leadership", label: "Leadership", detail: "Leadership", mark: "LD" },
      { id: "project-management", label: "Project Management", detail: "Project Management", mark: "PM" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "quickstay",
    title: "QuickStay Hotel Booking",
    subtitle: "Full-stack booking platform",
    description:
      "Hotel reservation platform with search, booking workflows, role-based dashboards, and secure checkout flow.",
    techStack: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Clerk",
      "Stripe",
      "Cloudinary",
    ],
    githubUrl: "https://github.com/shivam6677ojh/QuickStay-HotelBooking",
    liveUrl: "https://quick-stay-hotel-booking-etxe.vercel.app/",
    previewImage: "/images/projects/quickstay-cover.webp",
    highlights: [
      "Role-based dashboards for admin, owner, and customers",
      "Booking lifecycle management with secure validation",
      "Cloudinary-based media optimization pipeline",
      "Deployed and validated with production test checklist",
    ],
    screenshots: [
      "/images/projects/quickstay-1.webp",
      "/images/projects/quickstay-2.webp",
    ],
  },
  {
    id: "chatsphere",
    title: "ChatSphere Real-Time Messaging",
    subtitle: "Live chat and presence platform",
    description:
      "Realtime communication app with private messaging, online status tracking, typing indicators, and secure JWT auth.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Docker",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/shivam6677ojh/chatting-platform",
    liveUrl: "https://chatting-platform.vercel.app/",
    previewImage:
      "/images/projects/previewimgchatspere.webp",
    highlights: [
      "WebSocket-based real-time transport for low-latency messaging",
      "JWT authentication and protected API boundaries",
      "Presence and typing state broadcast with socket rooms",
      "Containerized deployment flow with CI/CD automation",
    ],
    screenshots: [
      "/images/projects/chatsphere2.png",
      "/images/projects/previewimgchatspere.webp",
    ],
  },
  {
    id: "yoga-planner",
    title: "Yoga Planner",
    subtitle: "Routine planning and wellness tracker",
    description:
      "Yoga planning app for organizing daily sessions, tracking progress, and maintaining consistent wellness routines.",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/shivam6677ojh",
    liveUrl: "https://yoga-planner-ruddy.vercel.app",
    previewImage: "/images/projects/yoga-planner-1.webp",
    highlights: [
      "Structured daily and weekly yoga routine planning",
      "Simple progress tracking to maintain consistency",
      "Responsive interface optimized for mobile and desktop",
      "Fast deployment pipeline on Vercel",
    ],
    screenshots: [
      "/images/projects/yoga-planner-1.webp",
      "/images/projects/yoga-planner-2.webp",
    ],
  },
  {
    id: "delhi-water-monitor-system",
    title: "Delhi Water Monitor System",
    subtitle: "Real-time water tracking dashboard",
    description:
      "Real-time tracker focused on Delhi water monitoring with live status visibility and clear metric-driven views.",
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/shivam6677ojh",
    liveUrl: "https://real-time-ochre.vercel.app/",
    previewImage: "/images/projects/delhi-water-monitor-1.png",
    highlights: [
      "Real-time monitoring experience for water tracking",
      "Dashboard-first layout for fast data interpretation",
      "Clean visualization focused on operational status",
      "Production deployment accessible on web",
    ],
    screenshots: [
      "/images/projects/delhi-water-monitor-1.png",
      "/images/projects/delhi-water-monitor-2.webp",
    ],
  },
];

export const certificates: Certificate[] = [
  {
    id: "frontend-react",
    title: "Frontend Developer - React",
    issuer: "HackerRank",
    issueDate: "October 2025",
    credentialId: "HR-REACT-FE-2025",
    previewImage: "/images/projects/fr.png",
    verificationUrl:
      "https://github.com/shivam6677ojh/shivam-certificate/blob/main/frontend_developer_react%20certificate.pdf",
  },
  {
    id: "gen-ai",
    title: "Master Generative AI and Generative AI Tools",
    issuer: "Infosys",
    issueDate: "September 2025",
    credentialId: "INFY-GENAI-2025",
    verificationUrl:
      "https://github.com/shivam6677ojh/shivam-certificate/blob/main/masteredgenrativeai%20tools.pdf",
  },
  {
    id: "vanillakart",
    title: "Full Stack Internship Certificate",
    issuer: "VanillaKart",
    issueDate: "2025",
    credentialId: "VK-INT-2025",
    verificationUrl:
      "https://github.com/shivam6677ojh/shivam-certificate/blob/main/Vanillakart%20internship%20certificate%20for%20Shivam.jpg",
    previewImage:
      "https://raw.githubusercontent.com/shivam6677ojh/shivam-certificate/main/Vanillakart%20internship%20certificate%20for%20Shivam.jpg",
  },
];

export const education: Education[] = [
  {
    id: "lpu-btech-cse",
    institution: "Lovely Professional University",
    qualification: "Bachelor of Technology in Computer Science and Engineering; CGPA: 7.49",
    location: "Punjab, India",
    period: "Since August 2023",
  },
  {
    id: "kv-intermediate",
    institution: "Kendriya Vidyalaya",
    qualification: "Intermediate; Percentage: 82%",
    location: "BHU, Varanasi",
    period: "April 2021 - March 2022",
  },
  {
    id: "kv-matriculation",
    institution: "Kendriya Vidyalaya",
    qualification: "Matriculation; Percentage: 83%",
    location: "BHU, Varanasi",
    period: "April 2019 - March 2020",
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}` },
];
