import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Dialog,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowTimeService from "@/services/ShowTimeService";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

type EventProps = {
  id: number;
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
  date: initialDate,
  time: initialTime,
  concertHallName,
  imageUrl,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newDate, setNewDate] = useState(initialDate);
  const [newTime, setNewTime] = useState(initialTime);

  const handleDelete = async () => {
    try {
      const eventResponse = await ShowTimeService.deleteEvent(Number(id));
      if (!eventResponse.ok) {
        console.error(t("eventFrameArtist.error.deleteEvent"));
        return;
      }
      router.reload();
    } catch (error) {
      console.error(t("eventFrameArtist.error.deleteProcess"), error);
    }
  };

  const handleEditOpen = () => setEditDialogOpen(true);
  const handleEditClose = () => setEditDialogOpen(false);

  const handleEditSubmit = async () => {
    try {
      const rescheduleResponse = await ShowTimeService.rescheduleEvent({
        eventId: id.toString(),
        date: newDate,
        time: newTime,
      });

      if (!rescheduleResponse.ok) {
        console.error(t("eventFrameArtist.error.rescheduleEvent"));
        alert(t("eventFrameArtist.error.rescheduleEvent"));
        return;
      }

      // Update the displayed date and time only after a successful API call
      setDate(newDate);
      setTime(newTime);

      handleEditClose();
      alert(t("eventFrameArtist.success"));
    } catch (error) {
      console.error(t("eventFrameArtist.error.rescheduleProcess"), error);
      alert(t("eventFrameArtist.error.rescheduleProcess"));
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
        marginBottom: 2,
      }}
    >
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

      <IconButton
        onClick={handleEditOpen}
        sx={{
          position: "absolute",
          top: 12,
          left: 12,
          color: "blue",
        }}
      >
        <EditIcon />
      </IconButton>

      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        {genre}
      </Typography>
      <Typography variant="body2">
        {date}, {time}
      </Typography>
      <Typography variant="body2">
        Concert Hall: {concertHallName}
      </Typography>

      {/* Dialog for editing */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <Box p={3}>
          <Typography variant="h6">{t("eventFrameArtist.title")}</Typography>
          <TextField
            label={t("eventFrameArtist.date")}
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label={t("eventFrameArtist.time")}
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            fullWidth
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleEditClose} sx={{ marginRight: 1 }}>
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleEditSubmit}
              variant="contained"
              color="primary"
            >
              {t("Save")}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Paper>
  );
};

export default MyEventFrame;
