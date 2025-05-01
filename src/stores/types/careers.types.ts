import { ReactNode } from "react";
import { TimelineDotProps } from "@mui/lab/TimelineDot";

// ----------------------------------------------------------------------

export type Career = {
  title: string;
  subtitle: string;
  date: string;
  img?: string;
  icon?: ReactNode;
  color?: TimelineDotProps["color"];
  variant?: TimelineDotProps["variant"];
};
