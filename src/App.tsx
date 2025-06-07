import { HashRouter as Router } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import WorkIcon from "@mui/icons-material/Work";
import TimelineIcon from "@mui/icons-material/Timeline";
import EmailIcon from "@mui/icons-material/Email";
import ThemeProvider from "@kared/kui/ThemeProvider";
import Layout from "@/components/Layout";
import ChatWidget from "@/components/ChatWidget";
import themeConfig from "@/config/theme.config";
import Routes from "@/routes";
import { PATH_PAGE } from "@/routes/paths";
import "@/App.css";

/**
 * Composant principal de l'application
 */
function App() {
  const sidebarItems = [
    { text: "Accueil", icon: <HomeIcon />, path: PATH_PAGE.home },
    { text: "Projets", icon: <WorkIcon />, path: PATH_PAGE.projects },
    { text: "Parcours", icon: <TimelineIcon />, path: PATH_PAGE.career },
    { text: "Compétences", icon: <CodeIcon />, path: PATH_PAGE.skills },
    { text: "Contact", icon: <EmailIcon />, path: PATH_PAGE.contact },
  ];

  // ----------------------------------------------------------------------

  return (
    <ThemeProvider themeOptions={themeConfig}>
      <Router>
        <Layout sidebarItems={sidebarItems}>
          <Routes />

          <ChatWidget />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

export default App;
