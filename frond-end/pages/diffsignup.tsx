import Navbar from "@/components/navbar";
import { StatusMessage } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router"
import classNames from "classnames";
import styles from "@styles/Login.module.css";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import ArtistService from "@/services/ArtistService";

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
            setArtistNameError("Artist name is required.");
            result = false;
        }
        if (!password || password.trim() === "") {
            setPasswordError("Password is required.");
            result = false;
        } else {
            if (password.length < 8) {
              setPasswordError("Password must be at least 8 characters long.");
              result = false;
            }
        }
        if (!genres || genres.trim() === "") {
            setGenresError("Genres is required.");
            result = false;
        }
        if (!biography || biography.trim() === "") {
            setBiographyError("Biography is required.");
            result = false;
        }
        if (!bookingFee) {
            setBookingFeeError("Booking fee is required.");
            result = false;
        }
        if (!socialMedia || socialMedia.trim() === "") {
            setSocialMediaError("Social media is required.");
            result = false;
        }
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

            const response = await ArtistService.registerArtist({
                artistName,
                password,
                genres: genresArray,
                biography,
                bookingFee,
                socialMedia: socialMediaArray,
                email,
            });

            if (response.status === 201) {
                setStatusMessages([
                    ...statusMessages,
                    {
                        type: "success",
                        message: "Signup successful. Redirecting you...",
                    },
                ]);

                setTimeout(() => {
                    router.push("/");
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
                    Sign up as an artist
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
                    label="Email"
                    margin="normal"
                    value={email}
                    error={!!emailError}
                    helperText={emailError}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Artist Name"
                    margin="normal"
                    value={artistName}
                    error={!!artistNameError}
                    helperText={artistNameError}
                    onChange={(e) => setArtistName(e.target.value)}
                />
                <InputField
                    label="Password"
                    margin="normal"
                    value={password}
                    error={!!passwordError}
                    helperText={passwordError}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    label="Genres"
                    margin="normal"
                    value={genres}
                    error={!!genresError}
                    helperText={genresError}
                    onChange={(e) => setGenres(e.target.value)}
                />
                <InputField
                    label="Biography"
                    margin="normal"
                    value={biography}
                    error={!!biographyError}
                    helperText={biographyError}
                    onChange={(e) => setBiography(e.target.value)}
                />
                <InputField
                    label="Booking Fee"
                    margin="normal"
                    value={bookingFee}
                    error={!!bookingFeeError}
                    typeof="number"
                    helperText={bookingFeeError}
                    onChange={(e) => setBookingFee(parseInt(e.target.value) || 0)}
                    inputProps={{ min: 0 }}

                />
                <InputField
                    label="Social media"
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
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </Button>
                </Box>
                </form>
            </Box>

          </Box>
        </>
    )
}

export default SignUpArtist;