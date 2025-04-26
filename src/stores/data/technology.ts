/**
 * Type pour une technologie
 */
type Technology = {
  name: string;
  color: string;
  inTraining?: boolean;
};

type TechnologyKeys =
  /**
   * Backend
   */
  | "nodeJs"
  | "socketIo"
  | "php"
  | "laravel"
  | "express"
  | "python"
  | "ai"

  /**
   * Database
   */
  | "mysql"
  | "postgresql"
  | "firebase"

  /**
   * DevOps
   */
  | "githubActions"
  | "aws"
  | "linux"
  | "docker"
  | "kubernetes"
  | "ansible"
  | "sentry"
  | "grafana"

  /**
   * Frontend
   */
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "capacitor"
  | "electron"

  /**
   * Testing
   */
  | "cypress"
  | "jest"
  | "phpUnit"
  | "firebaseTestLab"

  /**
   * Platform
   */
  | "web"
  | "webApp"
  | "ios"
  | "android"
  | "saas"
  | "omnis";

/**
 * Type pour les technologies
 */
type Technologies = { [key in TechnologyKeys]: Technology };

/**
 * Liste des technologies utilisées
 */
const data: Technologies = {
  /**
   * Backend
   */
  nodeJs: { name: "NodeJS", color: "#47c047" },
  socketIo: { name: "Socket.io", color: "#3be0b7" },
  php: { name: "PHP", color: "#777BB4" },
  laravel: { name: "Laravel", color: "#FF2D20" },
  express: { name: "Express", color: "#000000" },
  python: { name: "Python", color: "#3776AB" },
  ai: { name: "IA", color: "#8b3bd5" },

  /**
   * Database
   */
  mysql: { name: "MySQL", color: "#6494b8" },
  postgresql: { name: "PostgreSQL", color: "#5b77cb" },
  firebase: { name: "Firebase", color: "#FFCA28" },

  /**
   * DevOps
   */
  githubActions: { name: "GitHub Actions", color: "#2088FF" },
  aws: { name: "AWS", color: "#FF9900" },
  linux: { name: "Linux", color: "#e3bb40" },
  docker: { name: "Docker", color: "#2496ED" },
  kubernetes: { name: "Kubernetes", color: "#326CE5" },
  ansible: { name: "Ansible", color: "#a7a7a7" },
  sentry: { name: "Sentry", color: "#362D59" },
  grafana: { name: "Grafana", color: "#F46800" },

  /**
   * Frontend
   */
  html: { name: "HTML", color: "#E34F26" },
  css: { name: "CSS", color: "#1572B6" },
  javascript: { name: "JavaScript", color: "#F7DF1E" },
  typescript: { name: "TypeScript", color: "#417fc2" },
  react: { name: "React", color: "#61DAFB" },
  capacitor: { name: "Capacitor", color: "#119EFF" },
  electron: { name: "Electron", color: "#7eb5be" },

  /**
   * Testing
   */
  cypress: { name: "Cypress", color: "#a7a7a7" },
  jest: { name: "Jest", color: "#ce3241" },
  phpUnit: { name: "PHPUnit", color: "#8892BE" },
  firebaseTestLab: { name: "Firebase Test Lab", color: "#FFCA28" },

  /**
   * Platform
   */
  web: { name: "Web", color: "#FF7139" },
  webApp: { name: "WebApp", color: "#5994f3" },
  ios: { name: "iOS", color: "#ffffff" },
  android: { name: "Android", color: "#3DDC84" },
  saas: { name: "SaaS", color: "#7eb7f0" },
  omnis: { name: "Omnis", color: "#4f96de" },
};

// ----------------------------------------------------------------------

export default data;
