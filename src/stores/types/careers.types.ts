import { ReactNode } from "react";
import { TimelineDotProps } from "@mui/lab/TimelineDot";

// ----------------------------------------------------------------------

export type Career = {
  title: string;
  subtitle: string;
  date: string;
  /**
   * Description courte du rôle / des réalisations (optionnel).
   */
  description?: string;
  img?: string;
  icon?: ReactNode;
  color?: TimelineDotProps["color"];
  variant?: TimelineDotProps["variant"];
};
