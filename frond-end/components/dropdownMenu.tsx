import React, { useState, useEffect } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface DropdownMenuProps {
  loggedInUser: string | null;
  handleLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  loggedInUser,
  handleLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { t } = useTranslation();

  // Load user role on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("loggedInUser");
      const parsedUser = user ? JSON.parse(user) : null;
      setUserRole(parsedUser?.role || null);
    }
  }, []);

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleClick}>
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {loggedInUser ? (
          <>
            <MenuItem component="a" href="/events/overviewEvents" onClick={handleClose}>
              {t("dropdownMenu.menuItem.events")}
            </MenuItem>
            <MenuItem component="a" href="/user/editProfile" onClick={handleClose}>
              {t("dropdownMenu.menuItem.editProfile")}
            </MenuItem>
            {userRole === "admin" && (
              <MenuItem component="a" href="/adminApproval/adminApproval" onClick={handleClose}>
                {t("dropdownMenu.menuItem.adminDashboard")}
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
                router.push("/")
              }}
              style={{ color: "red" }}
            >
              {t("dropdownMenu.menuItem.logout")}
            </MenuItem>
          </>
        ) : (
          <MenuItem component="a" href="/user/login" onClick={handleClose}>
            {t("dropdownMenu.menuItem.login")}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default DropdownMenu;
