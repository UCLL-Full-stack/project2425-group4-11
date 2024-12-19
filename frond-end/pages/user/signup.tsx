import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css";
import Navbar from "../../components/navbar";
import { StatusMessage } from "../../types";
import classNames from "classnames";
import InputField from "@/components/InputField";
import UserService from "@/services/UserService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";



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

  const {t} = useTranslation();

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
      setEmailError(t('signup.error.emailRequired'));
      result = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError(t('signup.error.invalidEmail'));
        result = false;
      }
    }
    if (!password || password.trim() === "") {
      setPasswordError(t('signup.error.passWordRequired'));
      result = false;
    } else {
      if (password.length < 8) {
        setPasswordError(t('signup.error.passwordLength'));
      }
    }
    if (!firstName || firstName.trim() === "") {
      setFirstNameError(t('signup.error.firstNameRequired'));
      result = false;
    }
    if (!lastName || lastName.trim() === "") {
      setLastNameError(t('signup.error.lastNameRequired'));
      result = false;
    }
    if (!username || username.trim() === "") {
      setUsernameError(t('signup.error.userNameRequired'));
      result = false;
    }
    if (!phoneNumber || phoneNumber.trim() === "") {
      setPhoneNumberError(t('signup.error.phoneNumRequired'));
      result = false;
    }
    const phoneRegex = /^\+?[0-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError(t('signup.error.invalidPhoneNumber'));
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
            message: t('signup.statusMessages.succes'),
          },
        ]);

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const error = await response.json();
        setStatusMessages([
          {message: error.message || t('signup.statusMessages.failed'), type: "error"},
        ]);
      }
    } catch (error) {
      console.log(t('signup.statusMessages.signupError'), error);
      setStatusMessages([
        {
          message: t('signup.statusMessages.error'),
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
            {t('signup.label.title')}
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
              label={t('signup.label.email')}
              margin="normal"
              value={email}
              error={!!emailError}
              helperText={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label={t('signup.label.username')}
              margin="normal"
              value={username}
              error={!!usernameError}
              helperText={usernameError}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label={t('signup.label.password')}
              secure={true}
              margin="normal"
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label={t('signup.label.firstName')}
              margin="normal"
              value={firstName}
              error={!!firstNameError}
              helperText={firstNameError}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <InputField
              label={t('signup.label.lastName')}
              margin="normal"
              value={lastName}
              error={!!lastNameError}
              helperText={lastNameError}
              onChange={(e) => setLastName(e.target.value)}
            />
            <InputField
              label={t('signup.label.phoneNumber')}
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
                {isLoading ? t('signup.button.loading') : t('signup.button.signup')}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default SignUp;
