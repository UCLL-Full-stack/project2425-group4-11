import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Tabs } from "@mui/material";
import styles from "@/styles/Navbar.module.css";
import DropdownMenu from "./dropdownMenu";
import { useTranslation } from "next-i18next";
import Language from "./language/Language";


const Navbar: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const {t} = useTranslation();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user ? JSON.parse(user).fullname : null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="a" href="/" className={styles.logo}>
          {t("navbar.logo")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {loggedInUser && (
            <Typography variant="body1" className={styles.welcomeMessage}>
              {t('navbar.welcome')}, {loggedInUser}
            </Typography>
          )}
          <Box sx={{ mx: 2 }}>
            <Tabs/>
          </Box>
          <Box sx={{ mx: 2 }}>
            <Language/>
          </Box>
          <DropdownMenu
            loggedInUser={loggedInUser}
            handleLogout={handleLogout}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
