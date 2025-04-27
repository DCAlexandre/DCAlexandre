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
import TimelineDot, { TimelineDotProps } from "@mui/lab/TimelineDot";
import WorkIcon from "@mui/icons-material/Work";
import Typography from "@mui/material/Typography";

/**
 * Carte de LinkedIn
 * @description Affiche un lien vers LinkedIn
 */
function TimelineCareer() {
  type TimelineItem = {
    title: string;
    subtitle: string;
    date: string;
    img?: string;
    icon?: React.ReactNode;
    color?: TimelineDotProps["color"];
    variant?: TimelineDotProps["variant"];
  };

  const timelineItems: TimelineItem[] = [
    {
      title: "Entrepreneur indépendant",
      subtitle: "Kared Dev",
      date: "2024-12-01",
      color: "primary",
      variant: "filled",
      img: "/assets/career/logo_kared_dev.jpg",
    },
    {
      title: "Lead developer",
      subtitle: "Logiciel Comète",
      date: "2020-01-01",
      color: "primary",
      variant: "filled",
      img: "/assets/career/logo_comete.jpg",
    },
    {
      title: "Software Engineer",
      subtitle: "Aexae",
      date: "2017-07-01",
      color: "primary",
      variant: "outlined",
      img: "/assets/career/logo_aexae.jpg",
    },
    {
      title: "Développeur en alternance",
      subtitle: "Aexae",
      date: "2016-10-09",
      color: "secondary",
      variant: "filled",
      img: "/assets/career/logo_aexae.jpg",
    },
    {
      title: "Développeur en alternance",
      subtitle: "GuestWhat",
      date: "2016-05-01",
      color: "secondary",
      variant: "filled",
      icon: <WorkIcon />,
    },
    {
      title: "Formation - BTS SIO",
      subtitle: "INSTA",
      date: "2015-09-01",
      color: "secondary",
      variant: "outlined",
      img: "/assets/career/logo_insta.jpg",
    },
    {
      title: "Licence informatique",
      subtitle: "Université Évry Paris-Saclay",
      date: "2013-09-01",
      color: "secondary",
      variant: "outlined",
      img: "/assets/career/logo_universite_evry.jpg",
    },
  ];

  // ----------------------------------------------------------------------

  return (
    <Timeline position="alternate">
      {timelineItems.map((item, idx) => {
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
