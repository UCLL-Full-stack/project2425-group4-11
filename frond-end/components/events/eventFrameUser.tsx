import React, { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import ShowTimeService from "@/services/ShowTimeService";
import { useTranslation } from "next-i18next";
import { Ticket } from "@/types";

type EventProps = {
  id?: number;
  title: string;
  genre: string;
  date: string;
  time: string;
  imageUrl?: string;
};

const UserEventFrame: React.FC<EventProps> = ({
  id,
  title,
  genre,
  date,
  time,
  imageUrl,
}) => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 350,
        position: "relative",
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 2,
      }}
    >
      {imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{ width: "100%", borderRadius: 2, marginBottom: 2 }}
        />
      )}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        {genre}
      </Typography>
      <Typography variant="body2">
        {date}, {time}
      </Typography>
    </Paper>
  );
};

export default UserEventFrame;
