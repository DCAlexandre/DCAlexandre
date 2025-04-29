import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar, { SidebarItem } from "./Sidebar";

// ----------------------------------------------------------------------

const { VITE_MY_NAME, VITE_MY_JOB } = import.meta.env;

type LayoutProps = {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
};

/**
 * Layout pour les pages
 * @param sidebarItems - Les items de la barre de navigation
 * @param children - Les enfants à afficher
 */
function Layout({ sidebarItems, children }: LayoutProps) {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const sidebarTitle = VITE_MY_NAME;
  const sidebarSubtitle = VITE_MY_JOB;
  const sidebarImageUrl = "/assets/me.jpg";
  const sidebarWidthMd = "25%";
  const sidebarWidthXl = "20%";

  // ----------------------------------------------------------------------

  // Recalcule de la hauteur de la sidebar
  const updateSidebarHeight = () => {
    if (sidebarRef.current) {
      setSidebarHeight(sidebarRef.current.clientHeight);
    }
  };

  useEffect(() => {
    // Calculer la hauteur initiale
    updateSidebarHeight();

    // Recalculer lors du redimensionnement
    window.addEventListener("resize", updateSidebarHeight);

    // Observer les changements de taille de la sidebar
    const resizeObserver = new ResizeObserver(updateSidebarHeight);

    if (sidebarRef.current) {
      resizeObserver.observe(sidebarRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateSidebarHeight);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  // ----------------------------------------------------------------------

  return (
    <Grid container sx={{ minHeight: "100vh", width: "100%", overflow: "hidden" }}>
      <Grid
        ref={sidebarRef}
        size={{ xs: 12, md: 3, xl: 2 }}
        sx={{
          p: 2,
          top: 0,
          zIndex: 1000,
          overflow: "auto",
          boxSizing: "border-box",
          bgcolor: "background.default",
          position: { xs: "sticky", md: "fixed" },
          width: { md: sidebarWidthMd, xl: sidebarWidthXl },
          height: { xs: "auto", md: "100vh" },
        }}
      >
        <Sidebar items={sidebarItems} title={sidebarTitle} subtitle={sidebarSubtitle} imageUrl={sidebarImageUrl} />
      </Grid>

      <Grid
        ref={contentRef}
        size={{ xs: 12, md: 9, xl: 10 }}
        sx={{
          // overflow: "auto",
          overflowY: "auto",
          overflowX: "hidden",
          boxSizing: "border-box",
          bgcolor: "background.default",
          position: "relative",
          height: { xs: `calc(100vh - ${sidebarHeight}px)`, md: "100vh" },
          minHeight: { xs: `calc(100vh - ${sidebarHeight}px)`, md: "100vh" },
          ml: { xs: 0, md: sidebarWidthMd, xl: sidebarWidthXl },
          p: { md: 2, xl: 4 },
          pt: { xs: 2 },
        }}
      >
        <Box sx={{ maxWidth: "1200px", width: "100%", mx: "auto" }}>{children}</Box>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

export default Layout;
