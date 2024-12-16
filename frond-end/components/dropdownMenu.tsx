import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useTranslation } from "next-i18next";
import Language from "./language/Language";


interface DropdownMenuProps {
  loggedInUser: string | null;
  handleLogout: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  loggedInUser,
  handleLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const {t} = useTranslation();

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleClick}>
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {loggedInUser ? (
          <>
            <MenuItem component="a" href="/events/overviewEvents" onClick={handleClose}>
              {t('dropdownMenu.menuItem.events')}
            </MenuItem>
            <MenuItem component="a" href="/user/editProfile" onClick={handleClose}>
              {t('dropdownMenu.menuItem.editProfile')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
              style={{ color: "red" }}
            >
              {t('dropdownMenu.menuItem.logout')}
            </MenuItem>
          </>
        ) : (
          <MenuItem component="a" href="/login" onClick={handleClose}>
            {t('dropdownMenu.menuItem.login')}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default DropdownMenu;
