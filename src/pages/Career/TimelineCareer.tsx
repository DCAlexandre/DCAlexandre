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
import useCareers from "@/stores/hooks/useCareers";

/**
 * Timeline des carrières
 * @description Affiche les carrières
 */
function TimelineCareer() {
  const { careers, loading } = useCareers();
  const shouldReduceMotion = useReducedMotion();

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
    <Timeline position="alternate" sx={{ p: 0 }}>
      {careers.map((item, idx) => {
        const timelineItemMotionProps = {
          initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.4, ease: "easeOut" as const },
        };

        return (
          <TimelineItem key={idx}>
            {/* Date */}
            <TimelineOppositeContent
              sx={{ m: "auto 0", px: 0 }}
              align={idx % 2 === 0 ? "left" : "right"}
              variant="body2"
              color="text.secondary"
            >
              <motion.div {...timelineItemMotionProps}>
                {format(new Date(item.date), "MMMM yyyy", { locale: fr })}
              </motion.div>
            </TimelineOppositeContent>

            {/* Separator */}
            <TimelineSeparator sx={{ px: 1 }}>
              <TimelineConnector sx={{ bgcolor: `${item.color}.main`, height: "25px" }} />

              <TimelineDot color={item.color} variant={item.variant} sx={{ p: item.img ? 0 : 0.5 }}>
                {item.img && (
                  <Avatar
                    src={item.img}
                    alt={`Logo ${item.title}`}
                    imgProps={{ loading: "lazy" }}
                    sx={{ width: 36, height: 36 }}
                  />
                )}
                {item.icon && item.icon}
              </TimelineDot>

              <TimelineConnector sx={{ bgcolor: `${item.color}.main`, height: "25px" }} />
            </TimelineSeparator>

            {/* Content */}
            <TimelineContent sx={{ m: "auto 0", py: 1, px: 0 }}>
              <motion.div {...timelineItemMotionProps}>
                <Typography variant="h6" component="span">
                  {item.title}
                </Typography>

                <Typography sx={{ fontWeight: 600, color: "primary.light" }}>{item.subtitle}</Typography>

                {item.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.description}
                  </Typography>
                )}
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}

// ----------------------------------------------------------------------

export default TimelineCareer;
