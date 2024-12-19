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
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ArtistService from "@/services/ArtistService";

const LoginArtist: React.FC = () => {
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
      setNameError(t('loginArtist.error.artistNameRequired'));
      result = false;
    }
    if (!password || password.trim() === "") {
      setPasswordError(t('loginArtist.error.passWordRequired'));
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
      const response = await ArtistService.loginArtist({
        artistName: username,
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
            message: t('loginArtist.statusMessages.success'),
          },
        ]);

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const error = await response.json();
        setStatusMessages([
          { message: error.message || t('loginArtist.statusMessages.loginFailed'), type: "error" },
        ]);
      }
    } catch (error) {
      setStatusMessages([
        {
          message: t('loginArtist.error.errorStatus'),
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
      <main style={{backgroundColor: "white"}}>
      <Box className={styles.page}>
        <Box className={styles.loginContainer}>
          <Typography variant="h4" gutterBottom align="center">
            {t('loginArtist.title')}
          </Typography>
          {statusMessages && (
            <ul className={styles.statusMessageList}>
              {statusMessages.map(({ message, type }, index) => (
                <li
                  key={index}
                  className={classNames(
                    styles.statusMessageItem,
                    type === "error" ? styles.error : styles.success
                  )}
                >
                  {message}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={(event) => handleSubmit(event)}>
            <InputField
              label={t('loginArtist.label.artistName')}
              margin="normal"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
            <InputField
              label={t('loginArtist.label.password')}
              margin="normal"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              secure={true}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                {t('loginArtist.label.loginButton')}
              </Button>
            </Box>
          </form>
          <Typography align="center" mt={2}>
            {t('loginArtist.label.account')}{" "}
            <Button
              color="primary"
              href="/artist/artistSignup"
              variant="outlined"
              className={styles.signupButton}
            >
              {t('loginArtist.label.signup')}
            </Button>
          </Typography>
        </Box>
      </Box>
      </main>
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

export default LoginArtist;
