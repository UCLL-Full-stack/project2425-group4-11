import React from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowTimeService from "@/services/ShowTimeService";

type EventProps = {
  id: string;
  title: string;
  genre: string;
  date: string;
  time: string;
  imageUrl?: string;
  onDelete: (id: string) => void;
};

const MyEventFrame: React.FC<EventProps> = ({
  id,
  title,
  genre,
  date,
  time,
  imageUrl,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      const response = await ShowTimeService.deleteEvent(parseInt(id));
      if (response.ok) {
        onDelete(id);
      } else {
        console.error("Failed to delete the event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
        marginBottom: 2, // Add some margin to space the event frames
      }}
    >
      {/* Trash can button */}
      <IconButton
        onClick={handleDelete}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          color: "red",
          fontSize: "1.5rem",
        }}
      >
        <DeleteIcon />
      </IconButton>

      {/* Event content */}
      <Typography
        variant="h6"
        sx={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginBottom: 1,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontSize: "1.125rem",
          marginBottom: 1,
        }}
      >
        {genre}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: "1rem",
          marginBottom: 1,
        }}
      >
        {date}, {time}
      </Typography>
    </Paper>
  );
};

export default MyEventFrame;
