import { useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { useTheme } from "@kared/kui/ThemeProvider";
import { Project } from "@/stores/types/projects.types";

// ----------------------------------------------------------------------

type DialogProjectProps = {
  project: Project | null;
  open: boolean;
  onClose: () => void;
};

/**
 * Affiche un dialogue avec les détails d'un projet
 * @param {DialogProjectProps} props
 * @returns {JSX.Element}
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
          sx: {
            borderRadius: 2
            // overflow: "hidden",
          }
        }
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: theme.palette.primary.main,
          color: "white",
          py: 2
        }}
      >
        <Typography variant="h5" component="div" fontWeight="bold">
          {project.title}
        </Typography>

        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              sx={{
                width: "100%",
                borderRadius: 1,
                boxShadow: theme.shadows[2],
                mb: 2
              }}
              src={project.image || `https://source.unsplash.com/random/600x400?app&sig=${project.id}`}
              alt={project.title}
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Technologies utilisées
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 3 }}>
              {project.technologies.map((tech, i) => (
                <Chip
                  key={i}
                  label={tech.name}
                  sx={{
                    bgcolor: `${tech.color}20`,
                    color: tech.color,
                    fontWeight: "bold"
                  }}
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Liens
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {project.links.website && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<OpenInNewIcon />}
                  href={project.links.website}
                  target="_blank"
                  sx={{ mr: 1, mb: 1 }}
                >
                  Site Web
                </Button>
              )}

              {project.links.ios && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AppleIcon />}
                  href={project.links.ios}
                  target="_blank"
                  sx={{ mr: 1, mb: 1 }}
                >
                  App Store
                </Button>
              )}

              {project.links.android && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AndroidIcon />}
                  href={project.links.android}
                  target="_blank"
                  sx={{ mb: 1 }}
                >
                  Google Play
                </Button>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>

            <Typography variant="body1" paragraph>
              {project.longDescription}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Fonctionnalités clés
            </Typography>

            <Box component="ul" sx={{ pl: 2 }}>
              {project.id === 1 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Planification de routines sportives personnalisées
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Défis entre amis et suivi en temps réel
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Système de récompenses et de progression
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Applications iOS et Android natives via Capacitor
                  </Typography>
                </>
              )}

              {project.id === 2 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Valorisation d'assiettes foncières
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Mise en relation entre propriétaires et acheteurs
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Interface intuitive et outils de recherche avancés
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Disponible sur web, iOS et Android
                  </Typography>
                </>
              )}

              {project.id === 3 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Gestion administrative complète pour sociétés de sécurité
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Optimisation des processus administratifs
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Solution SaaS sécurisée et performante
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Interface utilisateur intuitive
                  </Typography>
                </>
              )}

              {project.id === 4 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Extension modulaire pour la solution Comète
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Espaces dédiés et modules complémentaires
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Personnalisation selon les besoins des clients
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Disponible sur web, iOS, Android et desktop
                  </Typography>
                </>
              )}

              {project.id === 5 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Pointages géolocalisés pour agents de sécurité
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Vérification de présence sur site en temps réel
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Interface adaptée aux besoins des agents
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Intégration complète avec la solution Comète
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>

        {project.links.website && (
          <Button
            variant="contained"
            color="primary"
            href={project.links.website}
            target="_blank"
            endIcon={<OpenInNewIcon />}
          >
            Visiter le site
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

export default DialogProject;
