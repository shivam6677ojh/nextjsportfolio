"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function FallInLoader() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[data-fall]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((section) => section.classList.add("is-visible"));
      observer.disconnect();
      return;
    }

    const targets = document.querySelectorAll<HTMLElement>("[data-fall]");

    // Lightweight load sequence to create the "falling into place" effect.
    gsap.fromTo(
      targets,
      { y: -80, opacity: 0, rotateX: -6 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.075,
        ease: "power4.out",
      },
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
