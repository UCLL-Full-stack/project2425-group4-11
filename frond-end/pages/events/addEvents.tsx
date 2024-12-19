import React, { useEffect, useState } from "react";
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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/navbar";
import { User } from "@/types";

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
  artistId?: string;
  artistName: string;
  concertHallId: string;
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
    artistName: "",
    concertHallId: ""
  });

  const [ticketCategories, setTicketCategories] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({ type: "", price: 0, amount: 0 });
  const [loading, setLoading] = useState(false);
  const [statusMessages, setStatusMessages] = useState<{ message: string; type: "error" | "success" }[]>([]);

  const [userRole, setUserRole] = useState<string | null>(null);
  const [parsedUser, setParsedUser] = useState<User>();
  const [user, setUser] = useState<any>();
  
  // Error state management
  const [eventErrors, setEventErrors] = useState({
    title: "",
    genre: "",
    time: "",
    date: "",
    duration: "",
    description: "",
    status: "",
    artistName: ""
  });
  const [ticketErrors, setTicketErrors] = useState({ type: "", price: "", amount: "" });

  const { t } = useTranslation();

  const clearErrors = () => {
    setEventErrors({
      title: "",
      genre: "",
      time: "",
      date: "",
      duration: "",
      description: "",
      status: "",
      artistName: ""
    });
    setTicketErrors({ type: "", price: "", amount: "" });
    setStatusMessages([]);
  };

  const validateEvent = () => {
    let valid = true;
    const errors = { ...eventErrors };

    if (!eventData.title) {
      errors.title = t('addEvents.error.titleRequired');
      valid = false;
    }
    if (!eventData.genre) {
      errors.genre = t('addEvents.error.genreRequired');
      valid = false;
    }
    if (!eventData.time) {
      errors.time = t('addEvents.error.timeRequired');
      valid = false;
    }
    if (!eventData.date) {
      errors.date = t('addEvents.error.dateRequired');
      valid = false;
    }
    if (eventData.duration <= 0) {
      errors.duration = t('addEvents.error.durationGreater');
      valid = false;
    }
    if (!eventData.description) {
      errors.description = t('addEvents.error.descriptionRequired');
      valid = false;
    }
    if (!eventData.status) {
      errors.status = t('addEvents.error.statusRequired');
      valid = false;
    }
    if (!eventData.artistName) {
      errors.artistName = t('addEvents.error.artistNameRequired');
      valid = false;
    }

    setEventErrors(errors);
    return valid;
  };

  const validateTicket = () => {
    let valid = true;
    const errors = { ...ticketErrors };

    if (!newTicket.type) {
      errors.type = t('addEvents.error.categoryRequired');
      valid = false;
    }
    if (newTicket.price <= 0) {
      errors.price = t('addEvents.error.priceGreater');
      valid = false;
    }
    if (newTicket.amount <= 0) {
      errors.amount = t('addEvents.error.amountGreater');
      valid = false;
    }

    setTicketErrors(errors);
    return valid;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("loggedInUser");
      const parsedUser = user ? JSON.parse(user) : null;
      setParsedUser(parsedUser);
      setUserRole(parsedUser?.role || null);
    }
  }, []);

  const handleSubmit = async () => {
    clearErrors();
  
    if (!validateEvent()) return;
  
    try {
      setLoading(true);
  
      const userResponse = parsedUser
        ? await ShowTimeService.getConcertHallByUsername(parsedUser.username || "")
        : null;
  
      if (userResponse?.ok) {
        const userData = await userResponse.json();
        setUser(userData);
  
        const artistResponse = await ShowTimeService.getArtistByArtistName(eventData.artistName);
        if (artistResponse.ok) {
          const artistData = await artistResponse.json();
          const finalEvent: Event = {
            ...eventData,
            date: eventData.date instanceof Date ? eventData.date : new Date(eventData.date),
            concertHallId: userData.id,
            artistId: artistData.id,
          };
  
          const eventResponse = await ShowTimeService.createEvent(finalEvent);
  
          if (!eventResponse.ok) {
            const errorText = await eventResponse.text();
            setStatusMessages([{ message: `${t('addEvents.error.creatingEvent')} ${errorText}`, type: "error" }]);
            return;
          }
  
          const createdEvent = await eventResponse.json();
  
          for (const ticketCategory of ticketCategories) {
            for (let i = 0; i < ticketCategory.amount; i++) {
              const ticketPayload = { ...ticketCategory, eventId: createdEvent.id };
              const ticketResponse = await ShowTimeService.createTicket(ticketPayload);
  
              if (!ticketResponse.ok) {
                setStatusMessages([{ message: t('addEvents.error.createFail'), type: "error" }]);
                return;
              }
            }
          }
  
          setStatusMessages([{ message: t('addEvents.success.create'), type: "success" }]);
          router.push("/");
        }
      }
    } catch (error) {
      setStatusMessages([{ message: t('addEvents.error.general'), type: "error" }]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleTicketAdd = () => {
    if (validateTicket()) {
      // Check for duplicates
      if (ticketCategories.some(ticket => ticket.type === newTicket.type)) {
        setTicketErrors({ ...ticketErrors, type: t('addEvents.error.duplicateCategory') });
        return;
      }

      setTicketCategories([...ticketCategories, newTicket]);
      setNewTicket({ type: "", price: 0, amount: 0 });
    }
  };

  return (
    <>
    <Navbar/>
    <Box sx={{ padding: 3, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Paper sx={{ maxWidth: 700, margin: "auto", padding: 3, position: "relative" }}>
        <IconButton onClick={() => router.push("/")} sx={{ position: "absolute", top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          {t('addEvents.title')}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Event Fields */}
        <InputField
          label={t('addEvents.label.title')}
          value={eventData.title}
          margin="normal"
          error={!!eventErrors.title}
          helperText={eventErrors.title}
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        />
        <InputField
          label={t('addEvents.label.genre')}
          value={eventData.genre}
          margin="normal"
          error={!!eventErrors.genre}
          helperText={eventErrors.genre}
          onChange={(e) => setEventData({ ...eventData, genre: e.target.value })}
        />
        <InputField
          label={t('addEvents.label.time')}
          value={eventData.time}
          margin="normal"
          error={!!eventErrors.time}
          helperText={eventErrors.time}
          onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
        />
        <InputField
          label={t('addEvents.label.date')}
          value={eventData.date.toISOString().split("T")[0]}
          margin="normal"
          type="date"
          error={!!eventErrors.date}
          helperText={eventErrors.date}
          onChange={(e) => {
            const parsedDate = new Date(e.target.value);
            if (isNaN(parsedDate.getTime())) {
              setEventErrors({ ...eventErrors, date: t('addEvents.error.invalidDateFormat') });
            } else {
              setEventData({ ...eventData, date: parsedDate });
            }
          }}
          
        />
        <InputField
          label={t('addEvents.label.duration')}
          value={eventData.duration}
          margin="normal"
          type="number"
          error={!!eventErrors.duration}
          helperText={eventErrors.duration}
          onChange={(e) => setEventData({ ...eventData, duration: parseInt(e.target.value) })}
        />
        <InputField
          label={t('addEvents.label.description')}
          value={eventData.description}
          margin="normal"
          error={!!eventErrors.description}
          helperText={eventErrors.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>{t('addEvents.label.status')}</InputLabel>
          <Select
            value={eventData.status}
            onChange={(e) => setEventData({ ...eventData, status: e.target.value })}
            error={!!eventErrors.status}
          >
            <MenuItem value="Upcoming">{t('addEvents.label.upcoming')}</MenuItem>
            <MenuItem value="Ongoing">{t('addEvents.label.ongoing')}</MenuItem>
            <MenuItem value="Past">{t('addEvents.label.past')}</MenuItem>
          </Select>
        </FormControl>

        <InputField
          label={t('addEvents.label.artistName')} 
          value={eventData.artistName}
          margin="normal"
          error={!!eventErrors.artistName}
          helperText={eventErrors.artistName} 
          onChange={(e) => setEventData({ ...eventData, artistName: e.target.value })}
        />

        {/* Add Ticket */}
        <Divider sx={{ marginY: 2 }} />
        <Typography variant="h6">{t('addEvents.label.ticketCategories')}</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>{t('addEvents.label.category')}</InputLabel>
            <Select
              value={newTicket.type}
              onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value })}
              error={!!ticketErrors.type}
            >
              <MenuItem value="Regular">{t('addEvents.label.regular')}</MenuItem>
              <MenuItem value="VIP">{t('addEvents.label.vip')}</MenuItem>
              <MenuItem value="Student">{t('addEvents.label.student')}</MenuItem>
            </Select>
          </FormControl>
          <InputField
            label={t('addEvents.label.price')}
            value={newTicket.price}
            type="number"
            error={!!ticketErrors.price}
            helperText={ticketErrors.price}
            onChange={(e) => setNewTicket({ ...newTicket, price: parseFloat(e.target.value) })}
          />
          <InputField
            label={t('addEvents.label.amount')}
            value={newTicket.amount}
            type="number"
            error={!!ticketErrors.amount}
            helperText={ticketErrors.amount}
            onChange={(e) => setNewTicket({ ...newTicket, amount: parseInt(e.target.value) })}
          />
          <Button variant="contained" onClick={handleTicketAdd}>
            {t('addEvents.button.addTicket')}
          </Button>
        </Box>

        {/* Display Tickets */}
        {ticketCategories.length > 0 && (
          <Box sx={{ marginY: 2 }}>
            <Typography variant="subtitle1">{t('addEvents.displayTickets.added')}</Typography>
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
          {loading ? t('addEvents.button.loading') : t('addEvents.button.create')}
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
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};

export default AddEventPage;
