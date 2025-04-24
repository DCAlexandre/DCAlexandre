export type SkillCategory = "frontend" | "backend" | "database" | "devops" | "testing";

export type Skill = {
  name: string;
  color: string;
  level: number;
};

export type Skills = {
  [key in SkillCategory]: Skill[];
};
