import React from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowTimeService from "@/services/ShowTimeService";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type EventProps = {
  id?: number;
  title: string;
  genre: string;
  date: string;
  time: string;
  concertHallName: string;
  imageUrl?: string;
};

const MyEventFrame: React.FC<EventProps> = ({
  id,
  title,
  genre,
  date,
  time,
  concertHallName,
  imageUrl,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const ticketResponse = await ShowTimeService.deleteTicket(Number(id));
      if (!ticketResponse.ok) {
        console.error(t("eventFrameCH.error.deleteTickete"));
        return;
      }

      const eventResponse = await ShowTimeService.deleteEvent(Number(id));
      if (!eventResponse.ok) {
        console.error(t("eventFrameCH.error.deleteEvent"));
        return;
      }
    } catch (error) {
      console.error(t("eventFrameCH.error.deleteProcess"), error);
    }
    router.reload();
  };

  return (
    <Paper
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "50vw", // Use viewport width for responsiveness
        maxWidth: 500, // Maximum width of the frame
        position: "relative",
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: "2rem", // Add margin for spacing
        transition: "all 0.3s ease", // Smooth transition for resizing
      }}
    >
      {/* Trash can button */}
      <IconButton
        onClick={handleDelete}
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          color: "red",
          fontSize: "2rem", // Use rem for scaling
        }}
      >
        <DeleteIcon />
      </IconButton>

      {/* Event content */}
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.25rem", // Use rem for text sizing
          fontWeight: "bold",
          marginBottom: "0.5rem",
          textAlign: "center", // Center the text
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontSize: "1.125rem", // Use rem for responsive font size
          marginBottom: "0.5rem",
          textAlign: "center", // Center the text
        }}
      >
        {genre}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: "1rem", // Use rem for font size
          marginBottom: "0.5rem",
          textAlign: "center", // Center the text
        }}
      >
        {date}, {time}
      </Typography>

      <Typography variant="body2">
        Concert Hall: {concertHallName}
      </Typography>
    </Paper>
  );
};

export default MyEventFrame;
