import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/askalex_ai.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2025-06-07",
  title: "AskAlex AI",
  subtitle:
    "Backend du chatbot de ce portfolio : un assistant RAG qui répond aux questions sur mon parcours, sans hallucination.",
  description:
    "AskAlex AI est le service d'intelligence artificielle qui alimente la bulle de discussion de ce portfolio.\n\nIl s'appuie sur une architecture RAG (Retrieval-Augmented Generation) : recherche sémantique par embeddings dans une base de connaissances, puis génération d'une réponse ancrée dans ces sources par un modèle de langage.\n\nDéployé en production avec gestion du débit (rate-limiting), journalisation structurée et conteneurisation Docker.",
  image,
  features: [
    "Pipeline RAG : recherche sémantique + génération ancrée",
    "Embeddings et recherche par similarité cosinus",
    "Modèle de langage local avec repli sur une API",
    "Rate-limiting, logs structurés et déploiement Docker",
    "Alimente le chatbot « AskAlex » de ce site",
  ],
  technologies: [technology.nodeJs, technology.typescript, technology.express, technology.ai, technology.docker],
  role: "Conception de l'architecture RAG de bout en bout : ingestion de la base de connaissances, embeddings, inférence et exposition d'une API.",
  impact: "Un chatbot qui répond précisément sur mon parcours — et qui tourne en production sur ce site même.",
  featured: false,
};

// ----------------------------------------------------------------------

export default project;
