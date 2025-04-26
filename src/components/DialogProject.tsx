import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { useTheme } from "@kared/kui/ThemeProvider";
import ChipList from "@/components/ChipList";
import { Project } from "@/stores/types/projects.types";

// ----------------------------------------------------------------------

type DialogProjectProps = {
  project: Project | null;
  open: boolean;
  onClose: () => void;
};

/**
 * Affiche un dialogue avec les détails d'un projet
 * @param project - Le projet à afficher
 * @param open - Indique si le dialogue est ouvert
 * @param onClose - Fonction appelée lors de la fermeture du dialogue
 */
function DialogProject({ project, open, onClose }: DialogProjectProps) {
  const { theme } = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // ----------------------------------------------------------------------

  if (!project) return null;

  // ----------------------------------------------------------------------

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          elevation: 1,
          sx: { borderRadius: { xs: 0, md: 2 } },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: theme.palette.primary.dark,
          py: 2,
        }}
      >
        <Typography variant="h5" component="div" fontWeight="bold">
          {project.title}
        </Typography>

        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 1.5 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              src={project.image}
              alt={project.title}
              component="img"
              sx={{
                width: "100%",
                borderRadius: 1,
                boxShadow: theme.shadows[2],
                mb: 2,
              }}
            />

            <Typography gutterBottom variant="h6">
              Technologies utilisées
            </Typography>

            <ChipList data={project.technologies} size="small" slotProps={{ box: { mb: 3 } }} />

            {project.links && (
              <>
                <Typography variant="h6" gutterBottom>
                  Liens
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {Object.entries(project.links).map(([key, value]) => {
                    let icon = <OpenInNewIcon />;
                    let text = "Site web";
                    switch (key) {
                      case "website":
                        icon = <OpenInNewIcon />;
                        text = "Site web";
                        break;
                      case "ios":
                        icon = <AppleIcon />;
                        text = "iOS";
                        break;
                      case "android":
                        icon = <AndroidIcon />;
                        text = "Android";
                        break;
                    }

                    return (
                      <Button
                        key={key}
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={icon}
                        href={value}
                        target="_blank"
                        sx={{ mr: 1 }}
                      >
                        {text}
                      </Button>
                    );
                  })}
                </Box>
              </>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>

            <Typography variant="body1">{project.description}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Fonctionnalités clés
            </Typography>

            <Box component="ul" sx={{ pl: 2 }}>
              {project.features.map((feature, idx) => (
                <Typography component="li" variant="body1" key={idx}>
                  {feature}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

export default DialogProject;
