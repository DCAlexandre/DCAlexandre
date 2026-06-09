import technology from "@/stores/data/technology";
import { Skill } from "@/stores/types/skills.types";

// ----------------------------------------------------------------------

const data: Skill[] = [
  { ...technology.nodeJs, level: 95 },
  { ...technology.socketIo, level: 90 },
  { ...technology.express, level: 90 },
  { ...technology.php, level: 90 },
  { ...technology.laravel, level: 85 },
  { ...technology.python, level: 50 },
  { ...technology.ai, name: "IA appliquée", level: 60 },
];

// ----------------------------------------------------------------------

export default data;
