import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShowTimeService from "@/services/ShowTimeService";
import EventFrame from "@/components/event";

// Component
const PurchasePage: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;

  // State
  const [event, setEvent] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countdown, setCountdown] = useState<number>(600); // 10 minutes countdown

  // Check login status and fetch event data
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = Boolean(localStorage.getItem("loggedInUser"));
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();

    if (eventId) {
      const fetchEvent = async () => {
        const response = await ShowTimeService.getEventById(eventId as string);
        const eventData = await response.json();
        setEvent(eventData);
        console.log(event);
      };
      fetchEvent();
    }
  }, [eventId]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePurchase = () => {
    console.log("Purchasing ticket for:", event);
    console.log("Name:", name, "Email:", email, "Quantity:", ticketQuantity);
    alert("Succesfully purchased ticket.");
  };

  const handleCancelPurchase = () => {
    alert("Ticket purchase has been canceled.");
    router.push("/index");
  };

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

  // User needs to log in to purchase a ticket
  if (!isLoggedIn) {
    return (
      <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", padding: 3 }}>
        <Paper sx={{ padding: 3, maxWidth: 600, margin: "auto", marginTop: 5 }}>
          <Typography variant="h4" gutterBottom>
            You need to sign up or log in to purchase a ticket.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/login")}
          >
            Log In
          </Button>
        </Paper>
      </Box>
    );
  }

  const totalPrice = ticketQuantity * 279.61;

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: 3 }}>
      {/* Event Details */}
      <Box sx={{ maxWidth: 800, margin: "auto", textAlign: "center" }}>
        <EventFrame id={event.id} title={event.title} time={event.time} />
      </Box>

      {/* Reserved Ticket Section */}
      <Paper
        sx={{
          maxWidth: 800,
          margin: "20px auto",
          padding: 3,
          position: "relative",
        }}
      >
        {/* Cancel Button (Cross Icon) */}
        <IconButton
          onClick={handleCancelPurchase}
          sx={{ position: "absolute", top: 8, right: 8 }}
          aria-label="cancel purchase"
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" color="success">
          ✅ Je tickets zijn gereserveerd!
        </Typography>
        <Typography>
          Het duurt nu nog slechts een paar clicks om je bestelling te
          voltooien.
        </Typography>

        {/* Countdown */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="h6">Restende tijd:</Typography>
          <Typography variant="h3" color="error">
            {formatTime(countdown)}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Ticket Summary */}
        <Box>
          <Typography variant="h6">Tickets</Typography>
          <Typography>General Admission Ticket</Typography>
          <Typography>Concert Hall: ....</Typography>

          {/* Ticket Quantity Dropdown */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="ticket-quantity-label">Quantity</InputLabel>
            <Select
              labelId="ticket-quantity-label"
              value={ticketQuantity}
              onChange={(e: SelectChangeEvent<number>) =>
                setTicketQuantity(Number(e.target.value))
              }
              label="Quantity"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Price */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h5" color="primary">
            €{totalPrice.toFixed(2)}
          </Typography>
        </Box>

        {/* Proceed Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 3 }}
          onClick={handlePurchase}
        >
          Doorgaan
        </Button>
      </Paper>
    </Box>
  );
};

export default PurchasePage;
