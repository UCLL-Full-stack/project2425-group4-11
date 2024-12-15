import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ShowTimeService from "@/services/ShowTimeService";
import EventFrame from "@/components/event";

const PurchasePage: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState<any>(null);
  const [countdown, setCountdown] = useState<number>(600); // 10 min countdown
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1); // Default to 1 ticket
  const ticketPrice = 279.61; // Price for one ticket

  useEffect(() => {
    // Check login status
    const loggedIn = Boolean(localStorage.getItem("loggedInUser"));
    setIsLoggedIn(loggedIn);

    // Fetch event details
    if (eventId) {
      const fetchEvent = async () => {
        const response = await ShowTimeService.getEventById(eventId as string);
        const eventData = await response.json();
        setEvent(eventData);
        console.log(event);
      };
      fetchEvent();
    }

    // Countdown timer logic
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [eventId]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handlePurchase = () => {
    alert(`Successfully purchased ${ticketQuantity} tickets!`);
    router.push("/index");
  };

  const totalPrice = (ticketQuantity * ticketPrice).toFixed(2);

  if (!event) return <Typography>Loading...</Typography>;

  if (!isLoggedIn) {
    return (
      <Box sx={{ textAlign: "center", padding: 3 }}>
        <Typography variant="h5">Please log in to purchase tickets</Typography>
        <Button variant="contained" onClick={() => router.push("/login")}>
          Log In
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: 3 }}>
      {/* Event Details */}
      <Box sx={{ maxWidth: 800, margin: "auto", textAlign: "center" }}>
        <Typography variant="h3">{event.title}</Typography>
        <Typography variant="h5" color="textSecondary">
          {event.date} • {event.time}
        </Typography>
        <Typography variant="subtitle1">Sportpaleis Antwerpen</Typography>
      </Box>

      {/* Reserved Ticket Section */}
      <Paper sx={{ maxWidth: 800, margin: "20px auto", padding: 3 }}>
        <Typography variant="h6" color="success">
          ✅ Je tickets zijn gereserveerd!
        </Typography>
        <Typography>
          Het duurt nu nog slechts een paar clicks om je bestelling te
          voltooien.
        </Typography>

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

          {/* Ticket Quantity Dropdown */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="ticket-quantity-label">Quantity</InputLabel>
            <Select
              labelId="ticket-quantity-label"
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(e.target.value as number)}
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
            €{totalPrice}
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
