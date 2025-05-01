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
    <Timeline position="alternate">
      {careers.map((item, idx) => {
        const timelineItemMotionProps = {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: idx * 0.2 },
        };

        return (
          <TimelineItem key={idx}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align={idx % 2 === 0 ? "left" : "right"}
              variant="body2"
              color="text.secondary"
            >
              <motion.div {...timelineItemMotionProps}>
                {format(new Date(item.date), "MMMM yyyy", { locale: fr })}
              </motion.div>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: `${item.color}.main` }} />

              <TimelineDot color={item.color} variant={item.variant} sx={{ p: item.img ? 0 : 0.5 }}>
                {item.img && <Avatar src={item.img} alt={item.title} sx={{ width: 36, height: 36 }} />}
                {item.icon && item.icon}
              </TimelineDot>

              <TimelineConnector sx={{ bgcolor: `${item.color}.main` }} />
            </TimelineSeparator>

            <TimelineContent sx={{ py: "12px", px: 2 }}>
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
