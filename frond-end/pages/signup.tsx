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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const clearErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setUsernameError(null);
    setPhoneNumberError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;
    if (!email || email.trim() === "") {
      setEmailError("Email is required.");
      result = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email format.");
        result = false;
      }
    }
    if (!password || password.trim() === "") {
      setPasswordError("Password is required.");
      result = false;
    } else {
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
      }
    }
    if (!firstName || firstName.trim() === "") {
      setFirstNameError("First name is required.");
      result = false;
    }
    if (!lastName || lastName.trim() === "") {
      setLastNameError("Last name is required.");
      result = false;
    }
    if (!username || username.trim() === "") {
      setUsernameError("Username is required.");
      result = false;
    }
    if (!phoneNumber || phoneNumber.trim() === "") {
      setPhoneNumberError("Phone number is required.");
      result = false;
    }
    const phoneRegex = /^\+?[0-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError("Invalid phone number format.");
      result = false;
    }
    return result;
  }

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await UserService.registerUser({
        email,
        password,
        firstName,
        lastName,
        username,
        phoneNumber,
        accountStatus: true,
      });

      if (response.status === 201) {
        setStatusMessages([
          ...statusMessages,
          {
            type: "success",
            message: "Signup successful. Redirecting to login page...",
          },
        ]);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const error = await response.json();
        setStatusMessages([
          {message: error.message || "Signup failed", type: "error"},
        ]);
      }
    } catch (error) {
      console.log("Signup error", error);
      setStatusMessages([
        {
          message: "An error has occurred. Please try again later.",
          type: "error",
        },
      ]);
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
          <form onSubmit={(event) => handleSignUp(event)}>
            <InputField
              label="Email"
              margin="normal"
              value={email}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Username"
              margin="normal"
              value={username}
              error={!!usernameError}
              helperText={usernameError}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label="Password"
              secure={true}
              margin="normal"
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label="First Name"
              margin="normal"
              value={firstName}
              error={!!firstNameError}
              helperText={firstNameError}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label="Last Name"
              margin="normal"
              value={lastName}
              error={!!lastNameError}
              helperText={lastNameError}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputField
              label="Phone Number"
              margin="normal"
              value={phoneNumber}
              error={!!phoneNumberError}
              helperText={phoneNumberError}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
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
