import technology from "@/stores/data/technology";
import { Skill } from "@/stores/types/skills.types";

// ----------------------------------------------------------------------

const data: Skill[] = [
  { ...technology.jest, level: 95 },
  { ...technology.cypress, level: 90 },
  { ...technology.phpUnit, level: 85 },
  { ...technology.firebaseTestLab, level: 65 },
];

// ----------------------------------------------------------------------

export default data;
