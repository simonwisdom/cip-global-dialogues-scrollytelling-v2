"use client";

import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";

// Register the plugin at the module level to ensure it's available before any animations are created.
gsap.registerPlugin(CSSPlugin);

export const ScrollytellingRegistrar = () => {
  // This component now only serves to ensure this module is imported and the registration occurs.
  return null;
}; 