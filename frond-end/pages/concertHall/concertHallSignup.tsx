import Navbar from "@/components/navbar";
import { StatusMessage } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router"
import classNames from "classnames";
import styles from "@/styles/Login.module.css";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ConcertHallService from "@/services/ConcertHallService";

const SignUpArtist: React.FC = () => {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [capacity, setCapacity] = useState<number>(0);
    const [capacityError, setCapacityError] = useState<string | null>(null);
    const [facilities, setFacilities] = useState("");
    const [facilitiesError, setFacilitiesError] = useState<string | null>(null);
    const [contactEmail, setContactEmail] = useState("");
    const [contactInstagram, setContactInstagram] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [contactInfoError, setContactInfoError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const contactInfo = `${contactEmail}, ${contactInstagram}, ${contactNumber}`;

    const { t } = useTranslation();

    const clearErrors = () => {
        setLocationError(null);
        setPasswordError(null);
        setUsernameError(null);
        setCapacityError(null);
        setNameError(null);
        setFacilitiesError(null);
        setContactInfoError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;
        if (!location || location.trim() === "") {
            setLocationError(t('CHSignup.error.locationRequired'));
            result = false;
        }
        if (!password || password.trim() === "") {
            setPasswordError(t('CHSignup.error.passWordRequired'));
            result = false;
        } else {
            if (password.length < 8) {
              setPasswordError(t('CHSignup.error.passwordLength'));
              result = false;
            }
        }
        if (!username || username.trim() === "") {
            setUsernameError(t('CHSignup.error.usernameRequired'));
            result = false;
        }
        if (!facilities || facilities.length <= 0) {
            setFacilitiesError(t('CHSignup.error.facilitiesRequired'));
            result = false;
        }
        if (!capacity) {
            setCapacityError(t('CHSignup.error.capacityRequired'));
            result = false;
        }
        if (!name || name.trim() === "") {
            setNameError(t('CHSignup.error.nameRequired'));
            result = false;
        }
        if (
            !contactEmail.trim() ||
            !contactInstagram.trim() ||
            !contactNumber.trim()
        ) {
            setContactInfoError(t('CHSignup.error.contactInfoRequired'));
            result = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactEmail)) {
                setContactInfoError(t('CHSignup.error.invalidEmail'));
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
            const facilitiesArray = facilities.split(',').map((facilities) => facilities.trim());
            const contactInfoArray = contactInfo.split(',').map((contact) => contact.trim());
    
            // Register the concert hall
            const registerResponse = await ConcertHallService.registerConcertHall({
                location,
                capacity,
                name,
                facilities: facilitiesArray,
                contactInfo: contactInfoArray,
                isVerified: 'Pending', 
                username,
                password,
            });

            if (registerResponse.status === 201) {
                // Automatically log in the artist after successful signup
                const loginResponse = await ConcertHallService.loginConcertHall({
                    username,
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
                            message: t('CHSignup.statusMessages.success'),
                        },
                    ]);

                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                } else {
                    setStatusMessages([
                        {
                            message: t('CHSignup.statusMessages.loginFailed'),
                            type: "error",
                        },
                    ]);
                }
            } else {
                const error = await registerResponse.json();
                setStatusMessages([
                    { message: error.message || t('CHSignup.statusMessages.failed'), type: "error" },
                ]);
            }
        } catch (error) {
            console.error(t('CHSignup.error.signupOrLoginError'), error);
            setStatusMessages([
                {
                    message: t('CHSignup.statusMessages.error'),
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
                    {t('CHSignup.label.title')}
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
                    label={t('CHSignup.label.username')}
                    margin="normal"
                    value={username}
                    error={!!usernameError}
                    helperText={usernameError}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    label={t('CHSignup.label.password')}
                    margin="normal"
                    value={password}
                    error={!!passwordError}
                    helperText={passwordError}
                    secure={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    label={t('CHSignup.label.name')}
                    margin="normal"
                    value={name}
                    error={!!nameError}
                    helperText={nameError}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputField
                    label={t('CHSignup.label.location')}
                    margin="normal"
                    value={location}
                    error={!!locationError}
                    helperText={locationError}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <InputField
                    label={t('CHSignup.label.capacity')}
                    margin="normal"
                    value={capacity}
                    typeof="number"
                    error={!!capacityError}
                    helperText={capacityError}
                    onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                />
                <InputField
                    label={t('CHSignup.label.facilities')}
                    margin="normal"
                    value={facilities}
                    error={!!facilitiesError}
                    helperText={facilitiesError}
                    onChange={(e) => setFacilities(e.target.value)}
                    inputProps={{ min: 0 }}

                />
                <Box mt={3} p={2} border={1} borderRadius={4} borderColor="grey.300">
                    <Typography variant="h6" gutterBottom>
                        {t('CHSignup.label.contactInfoTitle')}
                    </Typography>
                    <InputField
                        label={t('CHSignup.label.contactEmail')}
                        margin="normal"
                        value={contactEmail}
                        error={!!contactInfoError && !contactEmail.trim()}
                        helperText={!!contactInfoError && !contactEmail.trim() ? contactInfoError : ''}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />
                    <InputField
                        label={t('CHSignup.label.contactInstagram')}
                        margin="normal"
                        value={contactInstagram}
                        error={!!contactInfoError && !contactInstagram.trim()}
                        helperText={!!contactInfoError && !contactInstagram.trim() ? contactInfoError : ''}
                        onChange={(e) => setContactInstagram(e.target.value)}
                    />
                    <InputField
                        label={t('CHSignup.label.contactNumber')}
                        margin="normal"
                        value={contactNumber}
                        error={!!contactInfoError && !contactNumber.trim()}
                        helperText={!!contactInfoError && !contactNumber.trim() ? contactInfoError : ''}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                </Box>

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
                        {isLoading ? t('CHSignup.buttin.loading') : t('CHSignup.button.signup')}
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