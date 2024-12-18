import Navbar from "@/components/navbar";
import { StatusMessage, User } from "@/types"
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import styles from "@/styles/Login.module.css";
import classNames from "classnames";
import InputField from "@/components/InputField";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserService from "@/services/UserService";
import { useRouter } from "next/router";

type Error = {
    email: string | null,
    firstName: string | null,
    lastName: string | null,
    phoneNumber: string | null,
    password: string | null,
    username: string | null,
    accountStatus: string | null
}

const EditProfilePage: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [userData, setUserData] = useState<User>({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        username: "",
        accountStatus: true,
    });
    const [formData, setFormData] = useState<User>({
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        username: "",
        accountStatus: true,
    });
    const [errors, setErrors] = useState<Error>({
        email: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        password: null,
        username: null,
        accountStatus: null
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const validate = (): boolean => {
        let result = true;
        if ((!formData.email || formData.email.trim() === "") && (!userData.email || userData.email.trim() === "")) {
            setErrors({ ...errors, email: t('editProfile.error.emailRequired') });
            result = false
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (userData.email) {
                if (!emailRegex.test(userData.email)) {
                    setErrors({ ...errors, email: t('editProfile.error.invalidEmail') });
                    result = false;
                }
            }
        }
        if ((!formData.firstName || formData.firstName.trim() === "") && (!userData.firstName || userData.firstName.trim() === "")) {
            setErrors({ ...errors, firstName: t('editProfile.error.firstNameRequired') });
            result = false;
        }
        if ((!formData.lastName || formData.lastName.trim() === "") && (!userData.lastName || userData.lastName.trim() === "")) {
            setErrors({ ...errors, lastName: t('editProfile.error.lastNameRequired') });
            result = false;
        }
        if ((!formData.phoneNumber || formData.phoneNumber.trim() === "") && (!userData.phoneNumber || userData.phoneNumber.trim() === "")) {
            setErrors({ ...errors, phoneNumber: t('editProfile.error.phoneNumRequired') });
            result = false;
        } else {
            const phoneRegex = /^\+?[0-9]\d{1,14}$/;
            if (userData.phoneNumber) {
                if (!phoneRegex.test(userData.phoneNumber)) {
                    setErrors({ ...errors, phoneNumber: t('editProfile.error.invalidPhoneNumber') });
                    result = false;
                }
            }
        }
        if ((!formData.password || formData.password.trim() === "") && (!userData.password || userData.password.trim() === "")) {
            setErrors({ ...errors, password: t('editProfile.error.passWordRequired') });
            result = false;
        } else {
            if (userData.password && userData.password.length < 8) {
                setErrors({ ...errors, password: t('editProfile.error.passwordLength') });
                result = false;
            }
        }
        if ((!formData.username || formData.username.trim() === "") && (!userData.username || userData.username.trim() === "")) {
            setErrors({ ...errors, username: t('editProfile.error.usernameRequired') });
            result = false;
        }
        return result;
    }

    const clearErrors = () => {
        setErrors({
            email: null,
            firstName: null,
            lastName: null,
            username: null,
            phoneNumber: null,
            password: null,
            accountStatus: null
        });
        setStatusMessages([]);
    }

    const getUserByUsername = async () => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            const userResponse = await UserService.getUserByUsername(user ? JSON.parse(user).username : null);
            const gottenData = await userResponse.json();
            setFormData({
                ...formData,
                id: gottenData.id,
                email: gottenData.email,
                firstName: gottenData.firstName,
                lastName: gottenData.lastName,
                username: gottenData.username,
                phoneNumber: gottenData.phoneNumber,
                password: gottenData.password,
                accountStatus: gottenData.accountStatus
            });
            setUserData(gottenData); // Make sure both formData and userData are synchronized
        }
    }

    useEffect(() => {
        getUserByUsername();
    }, []);
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        try {
            if (!formData.username) {
                throw new Error("Username is required.");
            }
            
            const response = await UserService.editProfile(formData.username, {
                email: userData.email ?? formData.email,
                firstName: userData.firstName ?? formData.firstName,
                lastName: userData.lastName ?? formData.lastName,
                password: userData.password ?? formData.password,
                username: userData.username ?? formData.username,
                accountStatus: formData.accountStatus,
            });

            if (response.status === 200) {
                setStatusMessages([
                    ...statusMessages,
                    {
                        type: "success",
                        message: t('editProfile.statusMessages.success'),
                    },
                ]);

                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                const error = await response.json();
                setStatusMessages([
                    {message: error.message || t('editProfile.statusMessages.failed'), type: "error"},
                ]);
            }
        } catch (error) {
            console.log("Edit profile error", error);
            setStatusMessages([
                {
                    message: t('editProfile.statusMessages.error'),
                    type: "error",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <Box className={styles.page}>
                <Box className={styles.loginContainer}>
                    <Typography variant="h4" gutterBottom align="center">
                        {t('editProfile.label.title')}
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
                        label={t('editProfile.label.email')}
                        margin="normal"
                        value={formData.email}
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <InputField 
                        label={t('editProfile.label.firstName')}
                        margin="normal"
                        value={formData.firstName}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <InputField 
                        label={t('editProfile.label.lastName')}
                        margin="normal"
                        value={formData.lastName}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    <InputField 
                        label={t('editProfile.label.phoneNumber')}
                        margin="normal"
                        value={formData.phoneNumber}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                    <InputField 
                        label={t('editProfile.label.username')}
                        margin="normal"
                        value={formData.username}
                        error={!!errors.username}
                        helperText={errors.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            {t('editProfile.button')}
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
  

export default EditProfilePage;
