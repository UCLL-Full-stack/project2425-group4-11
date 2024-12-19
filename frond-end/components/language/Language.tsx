import { Select, MenuItem, Box } from "@mui/material";
import { useRouter } from "next/router";
import styles from "@/styles/Navbar.module.css";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    console.log("Switching to locale:", newLocale);
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className={styles.languageContainer}>
      <Select
        value={locale}
        onChange={handleLanguageChange}
        displayEmpty
        sx={{
          height: "32px",
          minWidth: "100px",
          fontSize: "0.875rem",
          backgroundColor: "white",
          border: "1px solid royalblue",
          borderRadius: "4px",
          padding: "0 8px",
          "& .MuiSelect-icon": { color: "royalblue", fontSize: "1rem" },
          "&:hover": { borderColor: "dodgerblue" },
        }}
      >
        <MenuItem value="en">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            EN
          </Box>
        </MenuItem>
        <MenuItem value="nl">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            NL
          </Box>
        </MenuItem>
      </Select>
    </div>

  );
};

export default Language;
