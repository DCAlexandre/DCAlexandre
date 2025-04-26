import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Sidebar from "./Sidebar";

// ----------------------------------------------------------------------

type LayoutProps = {
  children: React.ReactNode;
};

/**
 * Layout pour les pages
 * @param children - Les enfants à afficher
 */
function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarWidthMd = "25%";
  const sidebarWidthXl = "20%";

  // ----------------------------------------------------------------------

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  // ----------------------------------------------------------------------

  return (
    <Grid container sx={{ minHeight: "100vh", width: "100%" }}>
      <Grid
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
        <Sidebar />
      </Grid>

      <Grid
        ref={contentRef}
        size={{ xs: 12, md: 9, xl: 10 }}
        sx={{
          overflow: "auto",
          boxSizing: "border-box",
          bgcolor: "background.default",
          height: { xs: "auto", md: "100vh" },
          minHeight: { xs: "100vh" },
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
