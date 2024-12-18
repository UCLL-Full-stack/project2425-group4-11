import Navbar from "@/components/navbar";
import { StatusMessage } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router"
import classNames from "classnames";
import styles from "@/styles/Login.module.css";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import ArtistService from "@/services/ArtistService";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SignUpArtist: React.FC = () => {
    const router = useRouter();
    const [artistName, setArtistName] = useState("");
    const [artistNameError, setArtistNameError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [genres, setGenres] = useState("");
    const [genresError, setGenresError] = useState<string | null>(null);
    const [biography, setBiography] = useState("");
    const [biographyError, setBiographyError] = useState<string | null>(null);
    const [bookingFee, setBookingFee] = useState<number>(0);
    const [bookingFeeError, setBookingFeeError] = useState<string | null>(null);
    const [socialMedia, setSocialMedia] = useState("");
    const [socialMediaError, setSocialMediaError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    const clearErrors = () => {
        setArtistNameError(null);
        setPasswordError(null);
        setGenresError(null);
        setBiographyError(null);
        setBookingFeeError(null);
        setSocialMediaError(null);
        setEmailError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;
        if (!artistName || artistName.trim() === "") {
            setArtistNameError(t('artistSignup.error.artistNameRequired'));
            result = false;
        }
        if (!password || password.trim() === "") {
            setPasswordError(t('artistSignup.error.passWordRequired'));
            result = false;
        } else {
            if (password.length < 8) {
              setPasswordError(t('artistSignup.error.passwordLength'));
              result = false;
            }
        }
        if (!genres || genres.trim() === "") {
            setGenresError(t('artistSignup.error.genresRequired'));
            result = false;
        }
        if (!biography || biography.trim() === "") {
            setBiographyError(t('artistSignup.error.biographyRequired'));
            result = false;
        }
        if (!bookingFee) {
            setBookingFeeError(t('artistSignup.error.bookingFeeRequired'));
            result = false;
        }
        if (!socialMedia || socialMedia.trim() === "") {
            setSocialMediaError(t('artistSignup.error.socialMediaRequired'));
            result = false;
        }
        if (!email || email.trim() === "") {
            setEmailError(t('artistSignup.error.emailRequired'));
            result = false;
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setEmailError(t('artistSignup.error.invalidEmail'));
            result = false;
          }
        }
        return result;
    };

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        clearErrors();
    
        if (!validate()) {
            return;
        }
    
        setIsLoading(true);
    
        try {
            const genresArray = genres.split(',').map((genre) => genre.trim());
            const socialMediaArray = socialMedia.split(',').map((link) => link.trim());
    
            // Register the artist
            const registerResponse = await ArtistService.registerArtist({
                artistName,
                password,
                genres: genresArray,
                biography,
                bookingFee,
                socialMedia: socialMediaArray,
                email,
            });
    
            if (registerResponse.status === 201) {
                // Automatically log in the artist after successful signup
                const loginResponse = await ArtistService.loginArtist({
                    artistName: artistName,
                    password,
                });
    
                if (loginResponse.status === 200) {
                    const user = await loginResponse.json();
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
                            message: t('artistSignup.statusMessages.success'),
                        },
                    ]);
    
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                } else {
                    setStatusMessages([
                        {
                            message: t('artistSignup.statusMessages.loginFailed'),
                            type: "error",
                        },
                    ]);
                }
            } else {
                const error = await registerResponse.json();
                setStatusMessages([
                    { message: error.message || t('artistSignup.statusMessages.failed'), type: "error" },
                ]);
            }
        } catch (error) {
            console.error("Signup or login error", error);
            setStatusMessages([
                {
                    message: t('artistSignup.statusMessages.error'),
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
                    {t('artistSignup.label.title')}
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
                <form onSubmit={handleSignUp}>
                <InputField
                    label={t('artistSignup.label.email')}
                    margin="normal"
                    value={email}
                    error={!!emailError}
                    helperText={emailError}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label={t('artistSignup.label.artistName')}
                    margin="normal"
                    value={artistName}
                    error={!!artistNameError}
                    helperText={artistNameError}
                    onChange={(e) => setArtistName(e.target.value)}
                />
                <InputField
                    label={t('artistSignup.label.password')}
                    margin="normal"
                    value={password}
                    error={!!passwordError}
                    helperText={passwordError}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    label={t('artistSignup.label.genres')}
                    margin="normal"
                    value={genres}
                    error={!!genresError}
                    helperText={genresError}
                    onChange={(e) => setGenres(e.target.value)}
                />
                <InputField
                    label={t('artistSignup.label.biography')}
                    margin="normal"
                    value={biography}
                    error={!!biographyError}
                    helperText={biographyError}
                    onChange={(e) => setBiography(e.target.value)}
                />
                <InputField
                    label={t('artistSignup.label.bookingFee')}
                    margin="normal"
                    value={bookingFee}
                    error={!!bookingFeeError}
                    typeof="number"
                    helperText={bookingFeeError}
                    onChange={(e) => setBookingFee(parseInt(e.target.value) || 0)}
                    inputProps={{ min: 0 }}

                />
                <InputField
                    label={t('artistSignup.label.socialMedia')}
                    margin="normal"
                    value={socialMedia}
                    error={!!socialMediaError}
                    helperText={socialMediaError}
                    onChange={(e) => setSocialMedia(e.target.value)}
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
                        {isLoading ? t('artistSignup.buttin.loading') : t('artistSignup.button.signup')}
                    </Button>
                </Box>
                </form>
            </Box>

          </Box>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { locale } = context;
  
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
  };

export default SignUpArtist;