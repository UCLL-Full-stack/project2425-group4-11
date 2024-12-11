import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ShowTimeService from "@/services/ShowTimeService";
import EventFrame from "@/components/event";

const PurchasePage: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const checkLoginStatus = () => {
      // Replace this with your actual login check logic
      const loggedIn = Boolean(localStorage.getItem("userToken"));
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();

    if (eventId) {
      const fetchEvent = async () => {
        const response = await ShowTimeService.getEventById(eventId as string);
        const eventData = await response.json();
        setEvent(eventData);
      };
      fetchEvent();
    }
  }, [eventId]);

  const handlePurchase = () => {
    // Handle the purchase logic here
    console.log("Purchasing ticket for:", event);
    console.log("Name:", name);
    console.log("Email:", email);
    // Redirect to a confirmation page or show a success message
  };

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

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
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", padding: 3 }}>
      <EventFrame
        id={event.id}
        title={event.title}
        time={event.time}
        imageUrl={event.imageUrl}
      />
      <Paper sx={{ padding: 3, maxWidth: 600, margin: "auto", marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          Purchase Ticket
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" onClick={handlePurchase}>
            Purchase
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PurchasePage;
