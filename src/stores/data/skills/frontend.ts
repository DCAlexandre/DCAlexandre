import technology from "@/stores/data/technology";
import { Skill } from "@/stores/types/skills.types";

// ----------------------------------------------------------------------

const data: Skill[] = [
  { ...technology.html, level: 95 },
  { ...technology.javascript, level: 95 },
  { ...technology.typescript, level: 95 },
  { ...technology.react, level: 90 },
  { ...technology.capacitor, level: 90 },
  { ...technology.css, level: 85 },
  { ...technology.electron, level: 75 },
];

// ----------------------------------------------------------------------

export default data;
