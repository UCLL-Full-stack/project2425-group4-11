import React, { useState } from 'react';
import { Checkbox, FormControlLabel, TextField, Button, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '@styles/Login.module.css';
import Navbar from '../components/navbar';
import { StatusMessage } from "../types";
import classNames from "classnames";

const Login: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<String>("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError("");
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;
    if (!name || name.trim() === "") {
      setNameError("Name is required.");
      result = false;
    }
    return result;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    if (!validate()) {
      return;
    }
    setStatusMessages([
      ...statusMessages,
      {
        type: "success",
        message: "Login successful. Redirecting to homepage...",
      },
    ]);

    sessionStorage.setItem("loggedInUser", name);
    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <>
      <Navbar />
      <Box className={styles.page}>
        <Box className={styles.loginContainer}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
          {statusMessages && (
            <ul className="list-none mb-3 mx-auto">
              {statusMessages.map(({ message, type }, index) => (
                <li
                  key={index}
                  className={classNames({
                    "text-red-800": type === "error",
                    "text-green-800": type === "success",
                  })}
                >
                  {message}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={(event) => handleSubmit(event)}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Login
              </Button>
            </Box>
          </form>
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
