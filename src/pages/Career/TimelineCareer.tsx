import { motion } from "framer-motion";
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
import useCareers from "@/stores/hooks/useCareers";

/**
 * Timeline des carrières
 * @description Affiche les carrières
 */
function TimelineCareer() {
  const { careers } = useCareers();

  // ----------------------------------------------------------------------

  return (
    <Timeline position="alternate" sx={{ p: 0 }}>
      {careers.map((item, idx) => {
        const timelineItemMotionProps = {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: idx * 0.2 },
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
                {item.img && <Avatar src={item.img} alt={item.title} sx={{ width: 36, height: 36 }} />}
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

                <Typography>{item.subtitle}</Typography>
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
