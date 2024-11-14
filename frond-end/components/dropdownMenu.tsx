import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

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

  return (
    <>
      <IconButton edge="end" color="inherit" onClick={handleClick}>
        <AccountCircle fontSize="large" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {loggedInUser ? (
          <>
            <MenuItem onClick={handleClose}>View My Events</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </>
        ) : (
          <MenuItem component="a" href="/login" onClick={handleClose}>
            Login
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default DropdownMenu;
