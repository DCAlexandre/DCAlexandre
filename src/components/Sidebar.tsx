import { NavLink } from "react-router-dom";
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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
          <Typography variant="h6" component="h1">
            {title}
          </Typography>

          <Typography variant="body2" component="h2">
            {subtitle}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {isMobile ? (
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ p: 1 }}>
          {items.map((item, idx) => (
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
          {items.map((item, idx) => (
            <li key={idx}>
              <ListItem
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
            </li>
          ))}
        </List>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

export default Sidebar;
