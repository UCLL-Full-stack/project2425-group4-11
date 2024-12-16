// import Navbar from "@/components/navbar";
// import { StatusMessage, User } from "@/types"
// import { Box, Button, Typography } from "@mui/material";
// import { useState } from "react"
// import styles from "@styles/Login.module.css";
// import classNames from "classnames";
// import InputField from "@/components/InputField";
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// type Error = {
//     email: string | null,
//     firstName: string | null,
//     lastName: string | null,
//     phoneNumber: string | null,
//     password: string | null,
//     accountStatus: string | null
// }

// const EditProfilePage: React.FC = () => {
//     const {t} = useTranslation();
//     const [userData, setUserData] = useState<User>({
//         email: "",
//         firstName: "",
//         lastName: "",
//         phoneNumber: "",
//         password: "",
//         accountStatus: true,
//     });
//     const [formData, setFormData] = useState<User>({
//         id: 0,
//         email: "",
//         firstName: "",
//         lastName: "",
//         phoneNumber: "",
//         password: "",
//         accountStatus: true,
//     });
//     const [errors, setErrors] = useState<Error>({
//         email: null,
//         firstName: null,
//         lastName: null,
//         phoneNumber: null,
//         password: null,
//         accountStatus: null
//     })

//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

//     const validate = (): boolean => {
//         let result = true;
//         if (!formData.email && !userData.email) {
//             setErrors({ ...errors, email: t('editProfile.error.emailRequired')});
//             result = false
//         } else {
//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             if (formData.email) {
//                 if (!emailRegex.test(formData.email))
//             }
//         }
//     }
    
//     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         clearErrors();
//     }

//     return (
//         <>
//             <Navbar />
//             <Box className={styles.page}>
//                 <Box className={styles.loginContainer}>
//                     <Typography variant="h4" gutterBottom align="center">
//                         {t('editProfile.label.title')}
//                     </Typography>
//                     {statusMessages && (
//                     <ul className="list-none mb-3 mx-auto">
//                     {statusMessages.map(({ message, type }, index) => (
//                         <li
//                         key={index}
//                         className={classNames({
//                             "text-red-800": type === "error",
//                             "text-green-800": type === "success",
//                         })}
//                         >
//                         {message}
//                         </li>
//                     ))}
//                     </ul>
//                 )}
//                 <form onSubmit={(event) => handleSubmit(event)}>
//                     <InputField 
//                         label={formData.email || t('editProfile.label.email')}
//                         margin="normal"
//                         value={formData.email}
//                         onChange={(e) => setUserData({ ...userData, email: e.target.value})}
//                     />
//                     <InputField 
//                         label={formData.firstName || t('editProfile.label.firstName')}
//                         margin="normal"
//                         value={formData.firstName}
//                         onChange={(e) => setUserData({ ...userData, firstName: e.target.value})}
//                     />
//                     <InputField 
//                         label={formData.lastName || t('editProfile.label.lastName')}
//                         margin="normal"
//                         value={formData.lastName}
//                         onChange={(e) => setUserData({ ...userData, lastName: e.target.value})}
//                     />
//                     <InputField 
//                         label={formData.password || t('editProfile.label.password')}
//                         margin="normal"
//                         value={formData.password}
//                         onChange={(e) => setUserData({ ...userData, password: e.target.value})}
//                         secure={true}
//                     />
//                     <InputField 
//                         label={formData.phoneNumber || t('editProfile.label.phoneNumber')}
//                         margin="normal"
//                         value={formData.phoneNumber}
//                         onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value})}
//                     />
//                     <InputField 
//                         label={formData.username || t('editProfile.label.username')}
//                         margin="normal"
//                         value={formData.username}
//                         onChange={(e) => setUserData({ ...userData, username: e.target.value})}
//                     />
//                     <Box display="flex" justifyContent="space-between" mt={2}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             type="submit"
//                         >
//                             {t('editProfile.button')}
//                         </Button>
//                     </Box>
//                 </form>
//                 </Box>
//             </Box>
//         </>
//     )
// }

// export const getServerSideProps = async (context) => {
//     const { locale } = context;
  
//     return {
//         props: {
//             ...(await serverSideTranslations(locale ?? "en", ["common"])),
//         },
//     };
//   };
  

// export default EditProfilePage;