import technology from "@/stores/data/technology";
import { Skill } from "@/stores/types/skills.types";

// ----------------------------------------------------------------------

const data: Skill[] = [
  { ...technology.githubActions, level: 95 },
  { ...technology.linux, level: 90 },
  { ...technology.sentry, level: 85 },
  { ...technology.grafana, level: 75 },
  { ...technology.docker, level: 60 },
  { ...technology.aws, level: 50 },
  { ...technology.kubernetes, level: 30 },
  { ...technology.ansible, level: 25, inTraining: true },
];

// ----------------------------------------------------------------------

export default data;
