import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css";
import Navbar from "../../components/navbar";
import { StatusMessage } from "../../types";
import classNames from "classnames";
import InputField from "@/components/InputField";
import UserService from "@/services/UserService";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;
    if (!username || username.trim() === "") {
      setNameError(t('login.error.userNameRequired'));
      result = false;
    }
    if (!password || password.trim() === "") {
      setPasswordError(t('login.error.passWordRequired'));
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await UserService.loginUser({
        username: username,
        password,
      });

      if (response.status === 200) {
        const user = await response.json();
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            token: user.token,
            fullname: user.fullname,
            username: user.username,
            role: user.role,
          })
        );
        setStatusMessages([
          {
            type: "success",
            message: "Login successful. Redirecting to homepage...",
          },
        ]);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const error = await response.json();
        setStatusMessages([
          { message: error.message || "Login failed", type: "error" },
        ]);
      }
    } catch (error) {
      setStatusMessages([
        {
          message: t('login.error.errorStatus'),
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
            {t('login.title')}
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
            <InputField
              label={t('login.label.username')}
              margin="normal"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
            <InputField
              label={t('login.label.password')}
              margin="normal"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              secure={true}
            />
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label={t('login.label.rememberMe')}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                {t('login.label.loginButton')}
              </Button>
            </Box>
          </form>
          <Typography align="center" mt={2}>
            {t('login.label.account')}{" "}
            <Button
              color="primary"
              href="/signup"
              variant="outlined"
              className={styles.signupButton}
            >
              {t('login.label.signup')}
            </Button>
          </Typography>
          <Typography align="center" mt={2}>
            {t('login.label.artist')}{" "}
            <Button
              color="primary"
              href="../artist/loginArtist"
              variant="outlined"
              className={styles.signupButton}
            >
              {t('login.label.artistButton')}
            </Button>
          </Typography>
          <Typography align="center" mt={2}>
            {t('login.label.concertHall')}{" "}
            <Button
              color="primary"
              href="../concertHall/loginCH"
              variant="outlined"
              className={styles.signupButton}
            >
              {t('login.label.concertHallButton')}
            </Button>
          </Typography>
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

export default Login;
