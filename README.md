# Shivam Ojha Portfolio

Production-ready portfolio built with Next.js App Router, Tailwind CSS, Framer Motion, GSAP, and React Three Fiber.

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- GSAP
- React Three Fiber + Drei + Three.js
- Lenis (smooth scroll)
- Resend (contact email API)

## Features

- Full-screen immersive hero with performance-optimized 3D object
- Black and red premium visual language with glow accents and subtle glassmorphism
- Falling-into-place entry sequence and lightweight parallax interaction
- Custom red glow cursor (desktop only)
- Trust-based projects section with real GitHub and live links
- Visual proof gallery for project/certificate artifacts
- Certificates verification cards with source links
- AI assistant panel backed by OpenAI API route
- Contact form with validation and email delivery via Resend
- SEO metadata via Next.js Metadata API

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env.local
```

3. Add your values in `.env.local`:

```env
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4o-mini
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=Portfolio Contact <you@yourdomain.com>
CONTACT_TO_EMAIL=your_inbox@example.com
```

4. Run development server:

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import project into Vercel.
3. Set environment variables from `.env.example` in Vercel Project Settings.
4. Deploy.

## Notes

- Hero 3D canvas is disabled on small screens and reduced-motion preferences.
- Remote images are loaded from GitHub domains configured in `next.config.ts`.
- Replace or expand project and certificate proof links in `src/lib/site-data.ts` as needed.
