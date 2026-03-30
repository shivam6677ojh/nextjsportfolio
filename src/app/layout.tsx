import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shivam-ojha-portfolio.vercel.app"),
  title: {
    default: "Shivam Ojha | Full Stack Developer",
    template: "%s | Shivam Ojha",
  },
  description:
    "Portfolio of Shivam Ojha featuring full-stack projects, verified certifications, and contact access for collaboration.",
  keywords: [
    "Shivam Ojha",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "Portfolio",
    "Real-time applications",
  ],
  openGraph: {
    title: "Shivam Ojha | Full Stack Developer",
    description:
      "Production-focused full-stack developer portfolio with verified project and certificate proof.",
    type: "website",
    url: "https://shivam-ojha-portfolio.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Ojha | Full Stack Developer",
    description:
      "Portfolio of Shivam Ojha focused on immersive UI, robust backend engineering, and trusted project proof.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sora.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
