import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Avatar from "@mui/material/Avatar";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import StarIcon from "@mui/icons-material/Star";
import DialogProject from "@/components/DialogProject";
import useCareers from "@/stores/hooks/useCareers";
import useProjects from "@/stores/hooks/useProjects";
import { Career } from "@/stores/types/careers.types";
import { Project } from "@/stores/types/projects.types";
import { trackEvent } from "@/utils/analytics";

// ----------------------------------------------------------------------

// Une entrée de la timeline : soit un poste/formation, soit un projet « à la une ».
type TimelineEntry =
  | { kind: "career"; date: string; career: Career }
  | { kind: "project"; date: string; project: Project };

/**
 * Timeline des carrières
 * @description Affiche les postes et formations, avec les projets « à la une »
 *   intercalés chronologiquement (petits points cliquables ouvrant le détail projet).
 */
function TimelineCareer() {
  const { careers, loading } = useCareers();
  const { projects } = useProjects();
  const shouldReduceMotion = useReducedMotion();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fusion postes + projets mis en avant, triés du plus récent au plus ancien.
  const entries = useMemo<TimelineEntry[]>(() => {
    const careerEntries: TimelineEntry[] = careers.map((career) => ({ kind: "career", date: career.date, career }));
    const projectEntries: TimelineEntry[] = projects
      .filter((project) => project.featured)
      .map((project) => ({ kind: "project", date: project.dateStart, project }));

    return [...careerEntries, ...projectEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [careers, projects]);

  // ----------------------------------------------------------------------

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
    trackEvent("project_details_open", { project: project.title, location: "career" });
  };

  const closeProject = () => setDialogOpen(false);

  // ----------------------------------------------------------------------

  if (loading && careers.length === 0) {
    return (
      <Timeline position="alternate" sx={{ p: 0 }}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <TimelineItem key={idx}>
            <TimelineOppositeContent sx={{ m: "auto 0", px: 0 }}>
              <Skeleton variant="text" width={90} sx={{ ml: idx % 2 === 0 ? 0 : "auto" }} />
            </TimelineOppositeContent>

            <TimelineSeparator sx={{ px: 1 }}>
              <TimelineConnector sx={{ height: "25px" }} />
              <Skeleton variant="circular" width={36} height={36} />
              <TimelineConnector sx={{ height: "25px" }} />
            </TimelineSeparator>

            <TimelineContent sx={{ m: "auto 0", py: 1, px: 0 }}>
              <Skeleton variant="text" width="60%" height={28} sx={{ ml: idx % 2 === 0 ? 0 : "auto" }} />
              <Skeleton variant="text" width="40%" sx={{ ml: idx % 2 === 0 ? 0 : "auto" }} />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  }

  return (
    <>
      <DialogProject project={selectedProject} open={dialogOpen} onClose={closeProject} />

      <Timeline position="alternate" sx={{ p: 0 }}>
        {entries.map((entry, idx) => {
          const timelineItemMotionProps = {
            initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.4 },
            transition: { duration: 0.4, ease: "easeOut" as const },
          };

          const align = idx % 2 === 0 ? "left" : "right";

          // Projet « à la une » : petit point cliquable qui ouvre la modale de détail.
          if (entry.kind === "project") {
            const { project } = entry;

            return (
              <TimelineItem key={`project-${project.title}`}>
                <TimelineOppositeContent
                  sx={{ m: "auto 0", px: 0 }}
                  align={align}
                  variant="caption"
                  color="text.secondary"
                >
                  <motion.div {...timelineItemMotionProps}>
                    {format(new Date(project.dateStart), "MMM yyyy", { locale: fr })}
                  </motion.div>
                </TimelineOppositeContent>

                <TimelineSeparator sx={{ px: 1 }}>
                  <TimelineConnector sx={{ bgcolor: "divider", height: "25px" }} />

                  <TimelineDot
                    color="secondary"
                    variant="outlined"
                    role="button"
                    tabIndex={0}
                    aria-label={`Voir le projet ${project.title}`}
                    onClick={() => openProject(project)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openProject(project);
                      }
                    }}
                    sx={{
                      p: 0.5,
                      boxShadow: "none",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.25)" },
                    }}
                  >
                    <StarIcon sx={{ fontSize: 14 }} />
                  </TimelineDot>

                  <TimelineConnector sx={{ bgcolor: "divider", height: "25px" }} />
                </TimelineSeparator>

                <TimelineContent sx={{ m: "auto 0", py: 1, px: 0 }}>
                  <motion.div {...timelineItemMotionProps}>
                    <Typography
                      variant="body2"
                      component="span"
                      onClick={() => openProject(project)}
                      sx={{
                        fontWeight: 600,
                        color: "secondary.light",
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {project.title}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" display="block">
                      {project.subtitle}
                    </Typography>
                  </motion.div>
                </TimelineContent>
              </TimelineItem>
            );
          }

          // Poste / formation.
          const { career } = entry;

          return (
            <TimelineItem key={`career-${idx}`}>
              {/* Date */}
              <TimelineOppositeContent sx={{ m: "auto 0", px: 0 }} align={align} variant="body2" color="text.secondary">
                <motion.div {...timelineItemMotionProps}>
                  {format(new Date(career.date), "MMMM yyyy", { locale: fr })}
                </motion.div>
              </TimelineOppositeContent>

              {/* Separator */}
              <TimelineSeparator sx={{ px: 1 }}>
                <TimelineConnector sx={{ bgcolor: `${career.color}.main`, height: "25px" }} />

                <TimelineDot color={career.color} variant={career.variant} sx={{ p: career.img ? 0 : 0.5 }}>
                  {career.img && (
                    <Avatar
                      src={career.img}
                      alt={`Logo ${career.title}`}
                      imgProps={{ loading: "lazy" }}
                      sx={{ width: 36, height: 36 }}
                    />
                  )}
                  {career.icon && career.icon}
                </TimelineDot>

                <TimelineConnector sx={{ bgcolor: `${career.color}.main`, height: "25px" }} />
              </TimelineSeparator>

              {/* Content */}
              <TimelineContent sx={{ m: "auto 0", py: 1, px: 0 }}>
                <motion.div {...timelineItemMotionProps}>
                  <Typography variant="h6" component="span">
                    {career.title}
                  </Typography>

                  <Typography sx={{ fontWeight: 600, color: "primary.light" }}>{career.subtitle}</Typography>

                  {career.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {career.description}
                    </Typography>
                  )}
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );
}

// ----------------------------------------------------------------------

export default TimelineCareer;
