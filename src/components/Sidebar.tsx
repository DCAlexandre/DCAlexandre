import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import { PATH_PAGE } from "@/routes/paths";

/**
 * Sidebar component
 * @returns {JSX.Element} - The sidebar component
 */
function Sidebar() {
  const menuItems = [
    { text: "Accueil", icon: <HomeIcon />, path: PATH_PAGE.home },
    { text: "Compétences", icon: <CodeIcon />, path: PATH_PAGE.skills },
    { text: "Projets", icon: <WorkIcon />, path: PATH_PAGE.projects },
    { text: "Contact", icon: <EmailIcon />, path: PATH_PAGE.contact },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: 250,
        color: "white",
        display: "flex",
        flexDirection: "column",
        m: 2,
        borderRadius: 4,
        bgcolor: "rgba(255,255,255,0.1)",
      }}
    >
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Avatar
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
          alt="Alexandre DC"
          src="/path-to-your-photo.jpg"
        />
        <Typography variant="h6">Alexandre DC</Typography>
        <Typography variant="body2">Lead Developer</Typography>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, idx) => (
          <ListItem
            key={idx}
            component={NavLink}
            to={item.path}
            sx={{
              color: "primary.main",
              borderRadius: 4,
              "&.active": {
                color: "primary.light",
                bgcolor: "rgba(255,255,255,0.2)",
              },
              "&:hover": {
                color: "primary.light",
                bgcolor: "rgba(255,255,255,0.1)",
                border: "1px solid",
                borderColor: "primary.light",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

export default Sidebar;
