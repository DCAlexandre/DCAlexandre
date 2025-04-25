/**
 * Type pour une technologie
 */
type Technology = {
  name: string;
  color: string;
};

/**
 * Type pour les technologies
 */
type Technologies = { [key: string]: Technology };

/**
 * Liste des technologies utilisées
 */
const data: Technologies = {
  /**
   * Backend
   */
  nodeJs: { name: "NodeJS", color: "#339933" },
  php: { name: "PHP", color: "#777BB4" },
  laravel: { name: "Laravel", color: "#FF2D20" },
  express: { name: "Express", color: "#000000" },
  python: { name: "Python", color: "#3776AB" },

  /**
   * Database
   */
  mysql: { name: "MySQL", color: "#4479A1" },
  postgresql: { name: "PostgreSQL", color: "#4169E1" },
  firebase: { name: "Firebase", color: "#FFCA28" },

  /**
   * DevOps
   */
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
  typescript: { name: "TypeScript", color: "#3178C6" },
  react: { name: "React", color: "#61DAFB" },
  capacitor: { name: "Capacitor", color: "#119EFF" },
  electron: { name: "Electron", color: "#47848F" },

  /**
   * Testing
   */
  cypress: { name: "Cypress", color: "#a7a7a7" },
  jest: { name: "Jest", color: "#C21325" },
  phpunit: { name: "PHPUnit", color: "#8892BE" },
  firebaseTestLab: { name: "Firebase Test Lab", color: "#FFCA28" },

  /**
   * Platform
   */
  web: { name: "Web", color: "#FF7139" },
  webApp: { name: "WebApp", color: "#4285F4" },
  ios: { name: "iOS", color: "#ffffff" },
  android: { name: "Android", color: "#3DDC84" },
  saas: { name: "SaaS", color: "#0080FF" },
  omnis: { name: "Omnis", color: "#0080FF" },
};

// ----------------------------------------------------------------------

export default data;
