import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@kared/kui/ThemeProvider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

// ----------------------------------------------------------------------

export type SidebarItem = {
  text: string;
  icon: React.ReactNode;
  path: string;
};

type SidebarProps = {
  title: string;
  subtitle: string;
  imageUrl?: string;
  items: SidebarItem[];
};

/**
 * Barre de navigation latérale
 */
function Sidebar({ title, subtitle, imageUrl, items }: SidebarProps) {
  const { theme } = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isAvailable = import.meta.env.VITE_MY_AVAILABLE === "true";

  // Détermine si un item correspond à la route courante
  const isItemActive = (path: string) => location.pathname === path;

  // ----------------------------------------------------------------------

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRadius: 4,
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: isMobile ? "flex-start" : "center",
          p: isMobile ? 2 : 3,
        }}
      >
        {imageUrl && (
          <Avatar
            alt={title}
            src={imageUrl}
            sx={{
              width: isMobile ? 60 : 100,
              height: isMobile ? 60 : 100,
              mb: isMobile ? 0 : 2,
              mr: isMobile ? 2 : 0,
            }}
          />
        )}

        <Box>
          {/* Identité du site (présente sur toutes les pages) : volontairement
              hors de la hiérarchie des titres pour laisser chaque page définir
              son unique <h1> et garantir un ordre de titres séquentiel. */}
          <Typography variant="h6" component="p">
            {title}
          </Typography>

          <Typography variant="body2" component="p">
            {subtitle}
          </Typography>

          {isAvailable && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.75 }}>
              <Box
                sx={{
                  position: "relative",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  // Halo animé via transform/opacity (composé GPU) au lieu de box-shadow.
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    animation: "availablePulse 2s infinite",
                  },
                  "@keyframes availablePulse": {
                    "0%": { transform: "scale(1)", opacity: 0.6 },
                    "70%": { transform: "scale(2.6)", opacity: 0 },
                    "100%": { transform: "scale(2.6)", opacity: 0 },
                  },
                }}
              />

              <Typography variant="caption" sx={{ color: "primary.light", fontWeight: 600 }}>
                Disponible en freelance
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      <Box
        component="nav"
        aria-label="Navigation principale"
        sx={{ display: "flex", flexDirection: "column", flexGrow: isMobile ? 0 : 1 }}
      >
        {isMobile ? (
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ p: 1 }}>
            {items.map((item, idx) => (
              <Box
                key={idx}
                component={NavLink}
                to={item.path}
                aria-label={item.text}
                title={item.text}
                sx={{
                  position: "relative",
                  color: "text.secondary",
                  borderRadius: 2,
                  p: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "color 0.2s ease",
                  "&.active": {
                    color: "primary.light",
                    "& .MuiSvgIcon-root": {
                      color: "primary.main",
                    },
                  },
                  "&:hover": {
                    color: "primary.light",
                    "& .MuiSvgIcon-root": {
                      color: "primary.light",
                    },
                  },
                }}
              >
                {isItemActive(item.path) && (
                  <Box
                    component={motion.span}
                    layoutId="sidebar-active-mobile"
                    sx={{
                      position: "absolute",
                      left: 8,
                      right: 8,
                      bottom: 0,
                      height: 3,
                      borderRadius: 2,
                      bgcolor: "primary.main",
                    }}
                  />
                )}
                {item.icon}
              </Box>
            ))}
          </Stack>
        ) : (
          <List sx={{ flexGrow: 1 }}>
            {items.map((item, idx) => (
              <li key={idx}>
                <ListItem
                  component={NavLink}
                  to={item.path}
                  aria-label={item.text}
                  title={item.text}
                  sx={{
                    position: "relative",
                    color: "text.secondary",
                    borderRadius: 2,
                    my: 0.5,
                    transition: "color 0.2s ease, background-color 0.2s ease, padding-left 0.2s ease",
                    "&.active": {
                      color: "primary.light",
                      bgcolor: "action.selected",
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                    },
                    "&:hover": {
                      color: "primary.light",
                      bgcolor: "rgba(255,255,255,0.04)",
                      pl: 3,
                      "& .MuiListItemIcon-root": {
                        color: "primary.light",
                      },
                    },
                  }}
                >
                  {isItemActive(item.path) && (
                    <Box
                      component={motion.span}
                      layoutId="sidebar-active"
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 8,
                        bottom: 8,
                        width: 4,
                        borderRadius: 4,
                        bgcolor: "primary.main",
                      }}
                    />
                  )}

                  <ListItemIcon>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.text} />
                </ListItem>
              </li>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

export default Sidebar;
