import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Typography from "@mui/material/Typography";

/**
 * Carte de LinkedIn
 * @description Affiche un lien vers LinkedIn
 */
function CardLinkedIn() {
  const { VITE_MY_LINKEDIN } = import.meta.env;

  // ----------------------------------------------------------------------

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card
        elevation={2}
        sx={{
          mt: 4,
          p: 2,
          elevation: 3,
          maxWidth: { md: "100%", lg: "60%" },
          margin: "auto",
          bgcolor: "background.paper",
          borderColor: "primary.main",
        }}
      >
        <CardContent sx={{ p: 1, paddingBottom: "8px !important" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h6" component="div">
              En savoir plus sur LinkedIn
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <IconButton
                  href={VITE_MY_LINKEDIN}
                  target="_blank"
                  sx={{
                    bgcolor: "#078ad120",
                    color: "#078ad1",
                    "&:hover": { bgcolor: "#078ad130" },
                  }}
                >
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </motion.div>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ----------------------------------------------------------------------

export default CardLinkedIn;
