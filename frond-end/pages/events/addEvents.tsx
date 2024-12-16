import React, { useState } from "react";
import {
  Box,
  Button,
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
import ShowTimeService from "@/services/ShowTimeService";
import InputField from "@/components/InputField";

interface Ticket {
  type: string;
  price: number;
  amount: number;
}

interface Event {
  id?: number;
  title: string;
  genre: string;
  time: string;
  date: Date;
  duration: number;
  description: string;
  status: string;
}

const AddEventPage: React.FC = () => {
  const router = useRouter();
  const [eventData, setEventData] = useState<Event>({
    title: "",
    genre: "",
    time: "",
    date: new Date(),
    duration: 0,
    description: "",
    status: "",
  });

  const [ticketCategories, setTicketCategories] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ type: "", price: 0, amount: 0 });
  const [loading, setLoading] = useState(false);
  const [statusMessages, setStatusMessages] = useState<{ message: string; type: "error" | "success" }[]>([]);
  
  // Error state management
  const [eventErrors, setEventErrors] = useState({
    title: "",
    genre: "",
    time: "",
    date: "",
    duration: "",
    description: "",
    status: ""
  });
  const [ticketErrors, setTicketErrors] = useState({ type: "", price: "", amount: "" });

  const clearErrors = () => {
    setEventErrors({
      title: "",
      genre: "",
      time: "",
      date: "",
      duration: "",
      description: "",
      status: ""
    });
    setTicketErrors({ type: "", price: "", amount: "" });
    setStatusMessages([]);
  };

  const validateEvent = () => {
    let valid = true;
    const errors = { ...eventErrors };

    if (!eventData.title) {
      errors.title = "Title is required.";
      valid = false;
    }
    if (!eventData.genre) {
      errors.genre = "Genre is required.";
      valid = false;
    }
    if (!eventData.time) {
      errors.time = "Time is required.";
      valid = false;
    }
    if (!eventData.date) {
      errors.date = "Date is required.";
      valid = false;
    }
    if (eventData.duration <= 0) {
      errors.duration = "Duration must be greater than 0.";
      valid = false;
    }
    if (!eventData.description) {
      errors.description = "Description is required.";
      valid = false;
    }
    if (!eventData.status) {
      errors.status = "Status is required.";
      valid = false;
    }

    setEventErrors(errors);
    return valid;
  };

  const validateTicket = () => {
    let valid = true;
    const errors = { ...ticketErrors };

    if (!newTicket.type) {
      errors.type = "Category is required.";
      valid = false;
    }
    if (newTicket.price <= 0) {
      errors.price = "Price must be greater than 0.";
      valid = false;
    }
    if (newTicket.amount <= 0) {
      errors.amount = "Amount must be greater than 0.";
      valid = false;
    }

    setTicketErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    clearErrors();

    if (!validateEvent()) {
      return;
    }

    const finalEvent: Event = { 
      ...eventData, 
      date: eventData.date instanceof Date ? eventData.date : new Date(eventData.date)
    };
    

    try {
      setLoading(true);
      const eventResponse = await ShowTimeService.createEvent(finalEvent);

      if (!eventResponse.ok) {
        const errorText = await eventResponse.text();
        setStatusMessages([{ message: `Error creating event: ${errorText}`, type: "error" }]);
        setLoading(false);
        return;
      }

      const eventData = await eventResponse.json();

      // Handle ticket creation
      for (const ticket of ticketCategories) {
        const ticketPayload = { ...ticket, eventId: eventData.id };
        const ticketResponse = await ShowTimeService.createTicket(ticketPayload);

        if (!ticketResponse.ok) {
          setStatusMessages([{ message: "Failed to create one or more tickets", type: "error" }]);
          setLoading(false);
          return;
        }
      }

      setStatusMessages([{ message: "Event and tickets created successfully!", type: "success" }]);
      router.push("/");
    } catch (error) {
      setStatusMessages([{ message: "An error occurred. Please try again later.", type: "error" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketAdd = () => {
    if (validateTicket()) {
      // Check for duplicates
      if (ticketCategories.some(ticket => ticket.type === newTicket.type)) {
        setTicketErrors({ ...ticketErrors, type: "This category has already been added." });
        return;
      }

      setTicketCategories([...ticketCategories, newTicket]);
      setNewTicket({ type: "", price: 0, amount: 0 });
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Paper sx={{ maxWidth: 700, margin: "auto", padding: 3, position: "relative" }}>
        <IconButton onClick={() => router.push("/")} sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          Add New Event
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Event Fields */}
        <InputField
          label="Title"
          value={eventData.title}
          error={!!eventErrors.title}
          helperText={eventErrors.title}
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        />
        <InputField
          label="Genre"
          value={eventData.genre}
          error={!!eventErrors.genre}
          helperText={eventErrors.genre}
          onChange={(e) => setEventData({ ...eventData, genre: e.target.value })}
        />
        <InputField
          label="Time"
          value={eventData.time}
          error={!!eventErrors.time}
          helperText={eventErrors.time}
          onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
        />
        <InputField
          label="Date"
          value={eventData.date.toISOString().split("T")[0]}
          type="date"
          error={!!eventErrors.date}
          helperText={eventErrors.date}
          onChange={(e) => {
            const parsedDate = new Date(e.target.value);
            if (isNaN(parsedDate.getTime())) {
              setEventErrors({ ...eventErrors, date: "Invalid date format." });
            } else {
              setEventData({ ...eventData, date: parsedDate });
            }
          }}
          
        />
        <InputField
          label="Duration (minutes)"
          value={eventData.duration}
          type="number"
          error={!!eventErrors.duration}
          helperText={eventErrors.duration}
          onChange={(e) => setEventData({ ...eventData, duration: parseInt(e.target.value) })}
        />
        <InputField
          label="Description"
          value={eventData.description}
          error={!!eventErrors.description}
          helperText={eventErrors.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={eventData.status}
            onChange={(e) => setEventData({ ...eventData, status: e.target.value })}
            error={!!eventErrors.status}
          >
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Past">Past</MenuItem>
          </Select>
        </FormControl>

        {/* Add Ticket */}
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h6">Ticket Categories</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={newTicket.type}
              onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}
              error={!!ticketErrors.type}
            >
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </FormControl>
          <InputField
            label="Price (€)"
            value={newTicket.price}
            type="number"
            error={!!ticketErrors.price}
            helperText={ticketErrors.price}
            onChange={(e) => setNewTicket({ ...newTicket, price: parseFloat(e.target.value) })}
          />
          <InputField
            label="Amount"
            value={newTicket.amount}
            type="number"
            error={!!ticketErrors.amount}
            helperText={ticketErrors.amount}
            onChange={(e) => setNewTicket({ ...newTicket, amount: parseInt(e.target.value) })}
          />
          <Button variant="contained" onClick={handleTicketAdd}>
            Add Ticket
          </Button>
        </Box>

        {/* Display Tickets */}
        {ticketCategories.length > 0 && (
          <Box sx={{ marginY: 2 }}>
            <Typography variant="subtitle1">Added Tickets:</Typography>
            {ticketCategories.map((ticket, index) => (
              <Typography key={index}>
                {ticket.type} - €{ticket.price.toFixed(2)} ({ticket.amount} tickets)
              </Typography>
            ))}
          </Box>
        )}

        {/* Submit Button */}
        <Divider sx={{ marginY: 2 }} />
        <Button variant="contained" fullWidth onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </Button>

        {/* Status Messages */}
        {statusMessages.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            {statusMessages.map((msg, index) => (
              <Typography key={index} color={msg.type === "error" ? "error" : "primary"}>
                {msg.message}
              </Typography>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AddEventPage;
