import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import PageContainer from "@/components/PageContainer";
import Seo from "@/components/Seo";
import { SEO_PAGES } from "@/config/seo.config";
import { PATH_PAGE } from "@/routes/paths";

/**
 * Page 404 : route inconnue
 */
function PageNotFound() {
  return (
    <PageContainer motionVariant="bottom-in">
      <Seo {...SEO_PAGES.notFound} />

      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
          px: 2,
        }}
      >
        <Typography variant="h1" component="p" sx={{ color: "primary.main", fontWeight: 800 }}>
          404
        </Typography>

        <Typography variant="h4" component="h1">
          Page introuvable
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 420 }}>
          La page que vous cherchez n'existe pas ou a été déplacée.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={NavLink}
          to={PATH_PAGE.home}
          startIcon={<HomeIcon />}
          sx={{ mt: 1 }}
        >
          Retour à l'accueil
        </Button>
      </Box>
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageNotFound;
