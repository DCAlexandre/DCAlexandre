import { NavLink } from "react-router-dom";
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
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@kared/kui/ThemeProvider";
import { PATH_PAGE } from "@/routes/paths";

/**
 * Barre de navigation latérale
 */
function Sidebar() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { VITE_MY_NAME, VITE_MY_JOB } = import.meta.env;
  const menuItems = [
    { text: "Accueil", icon: <HomeIcon />, path: PATH_PAGE.home },
    { text: "Compétences", icon: <CodeIcon />, path: PATH_PAGE.skills },
    { text: "Projets", icon: <WorkIcon />, path: PATH_PAGE.projects },
    { text: "Contact", icon: <EmailIcon />, path: PATH_PAGE.contact },
  ];

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
        sx={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: isMobile ? "flex-start" : "center",
          p: isMobile ? 2 : 3,
        }}
      >
        <Avatar
          sx={{
            width: isMobile ? 60 : 100,
            height: isMobile ? 60 : 100,
            mb: isMobile ? 0 : 2,
            mr: isMobile ? 2 : 0,
          }}
          alt={VITE_MY_NAME}
          src="/assets/me.jpg"
        />

        <Box>
          <Typography variant="h6" component="h1">
            {VITE_MY_NAME}
          </Typography>

          <Typography variant="body2" component="h2">
            {VITE_MY_JOB}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {isMobile ? (
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ p: 1 }}>
          {menuItems.map((item, idx) => (
            <Box
              key={idx}
              component={NavLink}
              to={item.path}
              sx={{
                color: "text.secondary",
                p: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&.active": {
                  color: "primary.light",
                  bgcolor: "action.selected",
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
              {item.icon}
            </Box>
          ))}
        </Stack>
      ) : (
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item, idx) => (
            <ListItem
              key={idx}
              component={NavLink}
              to={item.path}
              sx={{
                color: "text.secondary",
                "&.active": {
                  color: "primary.light",
                  bgcolor: "action.selected",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
                "&:hover": {
                  color: "primary.light",
                  borderTop: "1px solid",
                  borderBottom: "1px solid",
                  borderColor: "primary.light",
                  "& .MuiListItemIcon-root": {
                    color: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

export default Sidebar;
