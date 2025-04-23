import { HashRouter as Router } from "react-router-dom";
import ThemeProvider from "@kared/kui/ThemeProvider";
// import AvatarMenu from "@kared/kui/AvatarMenu";
import Layout from "@/components/Layout";
import AnimatedRoutes from "@/routes";
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
 * Main component for the application
 * @returns {JSX.Element} - The root component
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

          <AnimatedRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

// ----------------------------------------------------------------------

export default App;
