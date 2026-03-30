import dynamic from "next/dynamic";
import { AboutSection } from "@/components/about-section";
import { BootLoader } from "@/components/boot-loader";
import { ContactSection } from "@/components/contact-section";
import { CredibilityStrip } from "@/components/credibility-strip";
import { CustomCursor } from "@/components/custom-cursor";
import { EducationSection } from "@/components/education-section";
import { FallInLoader } from "@/components/fall-in-loader";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { GithubActivitySection } from "@/components/github-activity-section";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { SkillsSection } from "@/components/skills-section";
import { SiteBackground } from "@/components/site-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const ProjectsSection = dynamic(
  () => import("@/components/projects-section").then((mod) => mod.ProjectsSection),
);
const CertificatesSection = dynamic(
  () => import("@/components/certificates-section").then((mod) => mod.CertificatesSection),
);
const VisualsSection = dynamic(() => import("@/components/visuals-section").then((mod) => mod.VisualsSection));
const AIAssistant = dynamic(() => import("@/components/ai-assistant").then((mod) => mod.AIAssistant));

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      <BootLoader />
      <ScrollProgress />
      <SmoothScrollProvider />
      <CustomCursor />
      <FallInLoader />
      <SiteBackground />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="pb-8 sm:pb-10">
          <CredibilityStrip />
        </div>
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <VisualsSection />
        <CertificatesSection />
        <GithubActivitySection />
        <ContactSection />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
