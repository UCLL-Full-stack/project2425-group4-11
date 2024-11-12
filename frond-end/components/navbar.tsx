import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box, Button } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import styles from '@styles/Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="a" href="/" className={styles.logo}>
          ShowTime
        </Typography>

        <Box className={styles.searchContainer}>
          <TextField
            variant="outlined"
            placeholder="Search Artists/Genre"
            size="small"
            fullWidth
          />
        </Box>

        <Box>
          <Button color="inherit" href="/login" sx={{ marginRight: 1 }}>
            Login/Sign Up
          </Button>
          <IconButton edge="end" color="inherit" href="/account">
            <AccountCircle fontSize="large" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
