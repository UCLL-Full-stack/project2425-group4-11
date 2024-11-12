import React from 'react';
import { Checkbox, FormControlLabel, TextField, Button, Typography, Box } from '@mui/material';
import styles from '@styles/Login.module.css';
import Navbar from '../components/navbar';

const Login: React.FC = () => {
  return (
    <>
      <Navbar/>
      <Box className = {styles.page}>
        <Box className={styles.loginContainer}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>

          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            margin="normal"
          />

          <TextField 
            label="Password" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal"
          />

          <FormControlLabel
            control={<Checkbox name="remember" color="primary" />}
            label="Remember me"
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>

          <Typography align="center" mt={2}>
            Don’t have an account?{' '}
            <Button color="primary" href="/signup" variant="outlined" className={styles.signupButton}>
              Sign up
            </Button>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
