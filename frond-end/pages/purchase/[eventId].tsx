import ShowTimeService from "@/services/ShowTimeService";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Event, Ticket } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Paper, Typography, Button, IconButton, Divider, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material";
import EventDetails from "@/components/events/eventDetails";
import TicketService from "@/services/TicketService";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const PurchasePage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [ticketCategory, setTicketCategory] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countdown, setCountdown] = useState<number>(600);
  const [ticketPrice, setTicketPrice] = useState<number>(0);

  const { t } = useTranslation();

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
    console.log(t('handlePurchase.handle.console.purchasingMessage'), event);
    console.log(t('eventPurchase.handlePurchase.console.name'), name, t('eventPurchase.handlePurchase.console.email'), email, t('eventPurchase.handlePurchase.console.quantity'), ticketQuantity);
    alert(t('eventPurchase.handlePurchase.alert.succesfullPurchase'));
  };

  const handleCancelPurchase = () => {
    alert(t('eventPurchase.handlePurchase.alert.cancelPurchase'));
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
            {t('eventPurchase.handlePurchase.noUser.message')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/login")}
          >
            {t('eventPurchase.handlePurchase.noUser.label.login')}
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
      title={event ? event.title : t('eventPurchase.handlePurchase.loadingMessage')}
      genre={event ? event.genre : t('eventPurchase.handlePurchase.loadingMessage')}
      time={event ? event.time : t('eventPurchase.handlePurchase.loadingMessage')}
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
          ✅ {t('eventPurchase.handlePurchase.reserveMessage')}
        </Typography>
        <Typography>
          {t('eventPurchase.handlePurchase.fewClicksMessage')}
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
          <Typography variant="h6">{t('eventPurchase.handlePurchase.countdown.remainingTime')}</Typography>
          <Typography variant="h3" color="error">
            {formatTime(countdown)}
          </Typography>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        {/* Ticket Summary */}
        <Box>
          <Typography variant="h6">{t('eventPurchase.handlePurchase.ticketSummary.title')}</Typography>
          <Typography>{t('eventPurchase.handlePurchase.ticketSummary.ticketGenAdmission')}</Typography>
          <Typography>{t('eventPurchase.handlePurchase.ticketSummary.concertHall')}</Typography>

          {/* Ticket Category Dropdown */}

          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="ticket-category-label">{t('eventPurchase.handlePurchase.label.category')}</InputLabel>
            <Select
              labelId="ticket-category-label"
              value={ticketCategory}
              onChange={(e) =>
                setTicketCategory(( e.target.value ))
              }
              label="Category"
            >
              <MenuItem value="Regular">{t('eventPurchase.handlePurchase.label.regular')}</MenuItem>
              <MenuItem value="VIP">{t('eventPurchase.handlePurchase.label.vip')}</MenuItem>
              <MenuItem value="Student">{t('eventPurchase.handlePurchase.label.student')}</MenuItem>
            </Select>
          </FormControl>

          {/* Ticket Quantity Dropdown */}

          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="ticket-quantity-label">{t('eventPurchase.handlePurchase.label.quantity')}</InputLabel>
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
          <Typography variant="h6">{t('eventPurchase.handlePurchase.label.totalPrice')}</Typography>
          {tickets ? (
          <Typography variant="h5" color="primary">
            €{(tickets?.find((ticket) => ticket.eventId.toString() === eventId?.toString())?.price || 0) * ticketQuantity}
          </Typography>
       
        ) : (
          <Typography>{t('eventPurchase.handlePurchase.loadingMessage')}</Typography>
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
          {t('eventPurchase.handlePurchase.button.label.proceed')}
        </Button>
      </Paper>
    </Box>
  );
}

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default PurchasePage;