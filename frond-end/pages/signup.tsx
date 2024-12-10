import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@styles/Login.module.css";
import Navbar from "../components/navbar";
import { StatusMessage } from "../types";
import classNames from "classnames";
import InputField from "@/components/InputField";
import UserService from "@/services/UserService";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const clearErrors = () => {
    setStatusMessages([]);
  };

  const handleSignUp = async () => {
    clearErrors();
    setIsLoading(true);
    try {
      await UserService.registerUser({
        email,
        password,
        firstName,
        lastName,
        username,
        phoneNumber,
      });
      router.push("/login");
    } catch (error) {
      setStatusMessages([{ message: error.message, type: "error" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box className={styles.page}>
        <Box className={styles.loginContainer}>
          <Typography variant="h4" gutterBottom align="center">
            Sign Up
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
          <form onSubmit={(event) => event.preventDefault()}>
            <InputField
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label="First Name"
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label="Last Name"
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputField
              label="Phone Number"
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSignUp}
                disabled={isLoading}
                className={classNames(styles.button, {
                  [styles.loading]: isLoading,
                })}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
