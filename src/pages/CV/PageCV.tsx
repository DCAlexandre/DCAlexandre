import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import PrintIcon from "@mui/icons-material/Print";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PageContainer from "@/components/PageContainer";
import Seo from "@/components/Seo";
import { SEO_PAGES } from "@/config/seo.config";
import { trackEvent } from "@/utils/analytics";

// ----------------------------------------------------------------------

// CV design autonome servi depuis public/ ; `?embed` masque sa barre d'outils
// interne (la page fournit ses propres boutons Material).
const CV_FILE = `${import.meta.env.BASE_URL}files/cvalexandredacosta.html`;
const CV_EMBED_URL = `${CV_FILE}?embed`;

// Fichiers téléchargeables :
//  - PDF  : le CV design (identique à l'aperçu affiché).
//  - DOCX : la version ATS 1 colonne (éditable, pour les candidatures / robots ATS).
const CV_DOWNLOAD_PDF = `${import.meta.env.BASE_URL}assets/cv/CV-Alexandre-Da-Costa.pdf`;
const CV_DOWNLOAD_DOCX = `${import.meta.env.BASE_URL}assets/cv/CV-Alexandre-Da-Costa-ATS.docx`;

// Hauteur de repli avant la mesure du contenu réel de l'iframe.
const FALLBACK_HEIGHT = 1400;

// Nom de fichier suggéré à l'impression PDF (dérivé du titre de l'onglet).
const CV_FILENAME = "CV - Alexandre Da Costa - Tech Lead";

/**
 * Page CV
 * @description Aperçu du CV design (iframe même origine) avec impression en version
 *   claire (économe en encre) et téléchargement de la version ATS (PDF ou Word).
 */
function PageCV() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState(FALLBACK_HEIGHT);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // ----------------------------------------------------------------------

  // Ajuste la hauteur de l'iframe à celle de son contenu (document même origine).
  const syncHeight = useCallback(() => {
    const doc = iframeRef.current?.contentWindow?.document;
    if (doc?.documentElement) {
      setHeight(doc.documentElement.scrollHeight);
    }
  }, []);

  // Au chargement : mesure initiale + observation des reflows (webfonts, etc.).
  const handleLoad = useCallback(() => {
    syncHeight();

    const doc = iframeRef.current?.contentWindow?.document;
    if (doc?.body && "ResizeObserver" in window) {
      observerRef.current?.disconnect();
      observerRef.current = new ResizeObserver(syncHeight);
      observerRef.current.observe(doc.body);
    }
  }, [syncHeight]);

  useEffect(() => {
    window.addEventListener("resize", syncHeight);

    return () => {
      window.removeEventListener("resize", syncHeight);
      observerRef.current?.disconnect();
    };
  }, [syncHeight]);

  // ----------------------------------------------------------------------

  // Imprime le CV design via son document → déclenche son @media print (clair).
  // Le nom du fichier PDF vient du titre de l'onglet : on le bascule le temps de
  // l'impression puis on le restaure.
  const handlePrint = () => {
    trackEvent("cv_print", { location: "cv" });

    const win = iframeRef.current?.contentWindow;
    if (!win) {
      window.open(CV_FILE, "_blank", "noopener");
      return;
    }

    const previousTitle = document.title;
    document.title = CV_FILENAME;

    const restore = () => {
      document.title = previousTitle;
    };
    win.addEventListener("afterprint", restore, { once: true });
    window.setTimeout(restore, 1000);

    win.focus();
    win.print();
  };

  // ----------------------------------------------------------------------

  const openMenu = (event: MouseEvent<HTMLElement>) => setMenuAnchor(event.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const handleDownload = (format: "pdf" | "docx") => {
    trackEvent("cv_download", { location: "cv", format });
    closeMenu();
  };

  // ----------------------------------------------------------------------

  return (
    <PageContainer motionVariant="bottom-in">
      <Seo {...SEO_PAGES.cv} />

      <Typography gutterBottom variant="h3" component="h1" align="center">
        Mon CV
      </Typography>

      <Typography variant="h6" component="h2" color="textSecondary" align="center" sx={{ mb: 4 }}>
        Consultez-le ci-dessous, imprimez-le en version claire, ou téléchargez-le (PDF ou Word).
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<DownloadIcon />}
          endIcon={<ArrowDropDownIcon />}
          onClick={openMenu}
          aria-haspopup="true"
          aria-expanded={Boolean(menuAnchor)}
          sx={{ px: 4, py: 1.25 }}
        >
          Télécharger
        </Button>

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
          <MenuItem component="a" href={CV_DOWNLOAD_PDF} download onClick={() => handleDownload("pdf")}>
            <ListItemIcon>
              <PictureAsPdfIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>PDF</ListItemText>
          </MenuItem>

          <MenuItem component="a" href={CV_DOWNLOAD_DOCX} download onClick={() => handleDownload("docx")}>
            <ListItemIcon>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Word (.docx)</ListItemText>
          </MenuItem>
        </Menu>

        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ px: 4, py: 1.25 }}
        >
          Imprimer
        </Button>

        <Button
          variant="outlined"
          color="primary"
          size="large"
          href={CV_FILE}
          target="_blank"
          rel="noopener"
          startIcon={<OpenInNewIcon />}
          onClick={() => trackEvent("cv_open_fullscreen", { location: "cv" })}
          sx={{ px: 4, py: 1.25 }}
        >
          Plein écran
        </Button>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Box
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <iframe
          ref={iframeRef}
          src={CV_EMBED_URL}
          title="CV d'Alexandre Da Costa"
          onLoad={handleLoad}
          style={{ display: "block", width: "100%", height, border: 0 }}
        />
      </Box>
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageCV;
