import { Skills } from "../types/skills.types";

// ----------------------------------------------------------------------

const data: Skills = {
  frontend: [
    { name: "HTML", color: "#E34F26", level: 95 },
    { name: "CSS", color: "#1572B6", level: 90 },
    { name: "JavaScript", color: "#F7DF1E", level: 95 },
    { name: "TypeScript", color: "#3178C6", level: 90 },
    { name: "React", color: "#61DAFB", level: 95 },
    { name: "Capacitor", color: "#119EFF", level: 85 },
    { name: "Electron", color: "#47848F", level: 80 }
  ],

  // ----------------------------------------------------------------------

  backend: [
    { name: "NodeJS", color: "#339933", level: 90 },
    { name: "PHP", color: "#777BB4", level: 85 },
    { name: "Laravel", color: "#FF2D20", level: 85 },
    { name: "Express", color: "#000000", level: 90 },
    { name: "Python", color: "#3776AB", level: 75 }
  ],

  // ----------------------------------------------------------------------

  database: [
    { name: "SQL", color: "#4479A1", level: 90 },
    { name: "MySQL", color: "#4479A1", level: 90 },
    { name: "PostgreSQL", color: "#4169E1", level: 85 },
    { name: "Firebase", color: "#FFCA28", level: 85 }
  ],

  // ----------------------------------------------------------------------

  devops: [
    { name: "AWS", color: "#FF9900", level: 80 },
    { name: "Linux", color: "#FCC624", level: 85 },
    { name: "Docker", color: "#2496ED", level: 85 },
    { name: "Kubernetes", color: "#326CE5", level: 75 },
    { name: "Ansible", color: "#000000", level: 70 },
    { name: "Sentry", color: "#362D59", level: 80 },
    { name: "Grafana", color: "#F46800", level: 75 }
  ],

  // ----------------------------------------------------------------------

  testing: [
    { name: "Cypress", color: "#17202C", level: 85 },
    { name: "Jest", color: "#C21325", level: 85 },
    { name: "PHPUnit", color: "#8892BE", level: 80 },
    { name: "Firebase Test Lab", color: "#FFCA28", level: 75 }
  ]
};

// ----------------------------------------------------------------------

export default data;
