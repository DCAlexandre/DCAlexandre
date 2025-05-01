import technology from "@/stores/data/technology";
import { Skill } from "@/stores/types/skills.types";

// ----------------------------------------------------------------------

const data: Skill[] = [
  { ...technology.mysql, level: 95 },
  { ...technology.postgresql, level: 90 },
  { ...technology.firebase, level: 85 },
];

// ----------------------------------------------------------------------

export default data;
