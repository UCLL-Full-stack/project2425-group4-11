import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

// Ticket interface
interface Ticket {
  category: string;
  price: number;
}

// Event interface
interface Event {
  id?: number;
  title: string;
  genre: string;
  time: string;
  date: string;
  duration: number;
  description: string;
  status: string;
  tickets: Ticket[];
}

const AddEventPage: React.FC = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState<Event>({
    title: "",
    genre: "",
    time: "",
    date: "",
    duration: 0,
    description: "",
    status: "",
    tickets: [],
  });

  const [ticketCategories, setTicketCategories] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ category: "", price: 0 });

  // Handle input changes for event details
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Handle ticket category addition
  const handleAddTicket = () => {
    if (newTicket.category && newTicket.price > 0) {
      setTicketCategories([...ticketCategories, newTicket]);
      setNewTicket({ category: "", price: 0 });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const finalEvent: Event = { ...eventData, tickets: ticketCategories };
    console.log("Event to be created:", finalEvent);
    alert("Event Created Successfully!");
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Paper sx={{ maxWidth: 700, margin: "auto", padding: 3, position: "relative" }}>
        {/* X Button */}
        <IconButton
          onClick={() => router.push("/")}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" gutterBottom>
          Add New Event
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Event Title */}
        <TextField
          label="Title"
          name="title"
          value={eventData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Event Genre */}
        <TextField
          label="Genre"
          name="genre"
          value={eventData.genre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Event Date and Time */}
        <TextField
          label="Date"
          name="date"
          type="date"
          value={eventData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Time"
          name="time"
          type="time"
          value={eventData.time}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        {/* Event Duration */}
        <TextField
          label="Duration (in minutes)"
          name="duration"
          type="number"
          value={eventData.duration}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Event Description */}
        <TextField
          label="Description"
          name="description"
          value={eventData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />

        {/* Event Status */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={eventData.status}
            onChange={(e) =>
              setEventData({ ...eventData, status: e.target.value as string })
            }
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Postponed">Postponed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ marginY: 2 }} />

        {/* Add Ticket Categories */}
        <Typography variant="h6" gutterBottom>
          Ticket Categories
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Category"
            value={newTicket.category}
            onChange={(e) =>
              setNewTicket({ ...newTicket, category: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Price (€)"
            type="number"
            value={newTicket.price}
            onChange={(e) =>
              setNewTicket({ ...newTicket, price: parseFloat(e.target.value) })
            }
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddTicket}
            sx={{ alignSelf: "center" }}
          >
            Add
          </Button>
        </Box>

        {/* Display Added Tickets */}
        {ticketCategories.length > 0 && (
          <Box sx={{ marginY: 2 }}>
            <Typography variant="subtitle1">Added Tickets:</Typography>
            {ticketCategories.map((ticket, index) => (
              <Typography key={index}>
                {ticket.category} - €{ticket.price.toFixed(2)}
              </Typography>
            ))}
          </Box>
        )}

        <Divider sx={{ marginY: 2 }} />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Create Event
        </Button>
      </Paper>
    </Box>
  );
};

export default AddEventPage;
