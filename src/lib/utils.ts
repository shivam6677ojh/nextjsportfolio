import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isTouchDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(pointer: coarse)").matches;
}
