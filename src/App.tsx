import { HashRouter as Router } from "react-router-dom";
import ThemeProvider from "@kared/kui/ThemeProvider";
// import AvatarMenu from "@kared/kui/AvatarMenu";
import Layout from "@/components/Layout";
import Routes from "@/routes";
import themeConfig from "@/config/theme.config";
import "@/App.css";

// const mockOptions = [
//   {
//     label: "My Profile",
//     id: "profile",
//   },
//   {
//     label: "Settings",
//     id: "settings",
//   },
//   {
//     label: "Logout",
//     id: "logout",
//   },
// ];

/**
 * Composant principal de l'application
 */
function App() {
  return (
    <ThemeProvider themeOptions={themeConfig}>
      <Router>
        <Layout>
          {/* <AvatarMenu
            title="User Profile"
            imageUrl="https://i.pravatar.cc/150?img=3"
            options={mockOptions}
            onClickOption={() => {}}
          /> */}

          <Routes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

export default App;
