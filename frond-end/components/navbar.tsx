import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import styles from "@styles/Navbar.module.css";
import DropdownMenu from "./dropdownMenu";

const Navbar: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<String | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };
  
  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="a" href="/" className={styles.logo}>
          ShowTime
        </Typography>
        <Box>
          <Button color="inherit" href="/login" sx={{ marginRight: 1 }}>
            Login/Sign Up
          </Button>
          <DropdownMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
