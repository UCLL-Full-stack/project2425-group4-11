import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";


interface PurchaseButtonProps {
  eventId: string;
  onClick?: () => void;
  label?: string;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  eventId,
  onClick,
  label,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push(`/purchase/${eventId}`);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1565c0",
        },
      }}
    >
      {label}
    </Button>
  );
};

export default PurchaseButton;
