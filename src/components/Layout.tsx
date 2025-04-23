import { Box, Grid } from "@mui/material";
import Sidebar from "./Sidebar";

// ----------------------------------------------------------------------

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the application
 * @param {LayoutProps} children - The children to be rendered
 * @returns {JSX.Element} - The layout component
 */
function Layout({ children }: LayoutProps) {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      <Grid
        size={{ xs: 12, md: 3, lg: 2 }}
        sx={{
          position: { md: "fixed" },
          height: { md: "100vh" },
          width: { md: "250px" },
        }}
      >
        <Sidebar />
      </Grid>

      <Grid
        size={{ xs: 12, md: 9, lg: 10 }}
        sx={{
          ml: { md: "250px" },
          p: 3,
        }}
      >
        <Box sx={{ maxWidth: "1200px", width: "100%", mx: "auto" }}>
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

export default Layout;
