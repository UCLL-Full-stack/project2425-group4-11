import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import styles from "@styles/Navbar.module.css";
import DropdownMenu from "./dropdownMenu";

const Navbar: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
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
          ShowTime
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {loggedInUser && (
            <Typography variant="body1" className={styles.welcomeMessage}>
              Welcome, {loggedInUser}
            </Typography>
          )}
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
