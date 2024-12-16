import ShowTimeService from "@/services/ShowTimeService";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Event, Ticket } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Paper, Typography, Button, IconButton, Divider, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import EventDetails from "@/components/events/eventDetails";
import TicketService from "@/services/TicketService";

const PurchasePage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [ticketCategory, setTicketCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countdown, setCountdown] = useState<number>(600);
  const [ticketPrice, setTicketPrice] = useState<number>(0);

  const [event, setEvent] = useState<Event>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const router = useRouter();
  const { eventId } = router.query; // Dynamic route parameter

  const getEventById = async () => {
    const eventResponse = await ShowTimeService.getEventById(
      eventId as string
    );
    const eventData = await eventResponse.json();
    setEvent(eventData);
  };

  const getAllTickets = async () => {
    try {
      const ticketResponse = await TicketService.getAllTickets();
      if (ticketResponse.status === 200) {
        const ticketsFound = await ticketResponse.json();
        setTickets(ticketsFound);
      } else {
        const error = await ticketResponse.json();
        console.error("Error fetching: ", error);
      }
    } catch (error) {
      console.error("Error fetching: ", error);
    }
  }

  useEffect(() => {
    getAllTickets();
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = Boolean(localStorage.getItem("loggedInUser"));
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  })

  const handlePurchase = () => {
    console.log("Purchasing ticket for:", event);
    console.log("Name:", name, "Email:", email, "Quantity:", ticketQuantity);
    alert("Succesfully purchased ticket.");
  };

  const handleCancelPurchase = () => {
    alert("Ticket purchase has been canceled.");
    router.push("/");
  };

  useEffect(() => {
    if (eventId) {
        getEventById();
    }
  }, [eventId]);

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

  console.log(event);

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      padding: 3,
    }}
  >
    {/* Event Details */}
    <EventDetails
      title={event ? event.title : "Loading..."}
      genre={event ? event.genre : "Loading..."}
      time={event ? event.time : "Loading..."}
      date={new Date()}
    />
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
          <Typography variant="h6">Resterende tijd:</Typography>
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

          {/* Ticket Category Dropdown */}

          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="ticket-category-label">Category</InputLabel>
            <Select
              labelId="ticket-category-label"
              value={ticketCategory}
              onChange={(e) =>
                setTicketCategory(( e.target.value ))
              }
              label="Category"
            >
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </FormControl>

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
          {tickets ? (
          <Typography variant="h5" color="primary">
            €{(tickets?.find((ticket) => ticket.eventId.toString() === eventId?.toString())?.price || 0) * ticketQuantity}
          </Typography>
       
        ) : (
          <Typography>Loading price...</Typography>
        )}

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
}

export default PurchasePage;