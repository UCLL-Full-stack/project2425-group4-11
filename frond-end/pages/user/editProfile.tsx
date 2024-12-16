import Navbar from "@/components/navbar";
import { StatusMessage, User } from "@/types"
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react"
import styles from "@styles/Login.module.css";
import classNames from "classnames";
import InputField from "@/components/InputField";

const EditProfilePage: React.FC = () => {
    const [userData, setUserData] = useState<User>({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        accountStatus: true,
    });
    const [formData, setFormData] = useState<User>({
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        accountStatus: true,
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    return (
        <>
            <Navbar />
            <Box className={styles.page}>
                <Box className={styles.loginContainer}>
                    <Typography variant="h4" gutterBottom align="center">
                        Edit Profile
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
                <form>
                    <InputField 
                        label={formData.email || "Email"}
                        margin="normal"
                        value={formData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value})}
                    />
                    <InputField 
                        label={formData.firstName || "First name"}
                        margin="normal"
                        value={formData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value})}
                    />
                    <InputField 
                        label={formData.lastName || "Last name"}
                        margin="normal"
                        value={formData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value})}
                    />
                    <InputField 
                        label={formData.password || "Password"}
                        margin="normal"
                        value={formData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value})}
                        secure={true}
                    />
                    <InputField 
                        label={formData.phoneNumber || "Phone number"}
                        margin="normal"
                        value={formData.phoneNumber}
                        onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value})}
                    />
                    <InputField 
                        label={formData.username || "Username"}
                        margin="normal"
                        value={formData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value})}
                    />
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Update profile
                        </Button>
                    </Box>
                </form>
                </Box>
            </Box>
        </>
    )
}

export default EditProfilePage;