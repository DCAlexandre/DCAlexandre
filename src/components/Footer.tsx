import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { PATH_PAGE } from "@/routes/paths";

// ----------------------------------------------------------------------

/**
 * Pied de page discret : copyright + lien vers les mentions légales.
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        pt: 3,
        pb: 2,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {year} Kared Dev, Alexandre Da Costa ·{" "}
        <Link component={NavLink} to={PATH_PAGE.legal} underline="hover" color="inherit">
          Mentions légales & confidentialité
        </Link>
      </Typography>
    </Box>
  );
};

// ----------------------------------------------------------------------

export default Footer;
