export type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  links: {
    website?: string;
    ios?: string;
    android?: string;
  };
  technologies: { name: string; color: string }[];
};
