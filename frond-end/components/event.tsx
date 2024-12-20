import { Box, Paper, Typography } from "@mui/material";
import PurchaseButton from "./Tickets/purchaseButton";
import { useTranslation } from "next-i18next";
import ShowTimeService from "@/services/ShowTimeService";
import { useEffect, useState } from "react";
import { Ticket } from "@/types";

type EventProps = {
  id?: string;
  title: string;
  genre: string;
  date: string;
  time: string;
  concertHallName: string;
  imageUrl?: string;
};

const EventFrame: React.FC<EventProps> = ({ id, title, genre, date, time, concertHallName, imageUrl }) => {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const getTicketsByEventId = async () => {
    if (id) {
      const ticketsResponse = await ShowTimeService.getTicketsByEventId(id);
      const ticketsData = await ticketsResponse.json();
      if (Array.isArray(ticketsData)) {
        setTickets(ticketsData);
      } else {
        console.error('Expected an array of tickets, but received:', ticketsData);
      }
    }
  };

  useEffect(() => {
    getTicketsByEventId();
  }, [id]);

  const allTicketsSoldOut = tickets.length > 0 && tickets.every(ticket => ticket.status === 'Sold');
  const fewTicketsLeft = tickets.filter(ticket => ticket.status === 'Available').length <= 5;

  return (
    <Paper
      sx={{
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 300,
        position: "relative",
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 2, // Add some margin to space the event frames
      }}
    >
      {/* Event Details */}
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
          marginBottom: 3,
        }}
      >
        {date}, {time}
      </Typography>
      <Typography 
        variant="body2"
        sx={{
          fontSize: "0.95rem",
          marginBottom: 1,
        }}
      >
        Concert Hall: {concertHallName}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      {/* Ticket Availability */}
      {tickets.length > 0 && !allTicketsSoldOut ? (
        <>
          {fewTicketsLeft && (
            <Typography
              variant="body2"
              color="warning"
              sx={{
                marginBottom: 1,
                fontWeight: "bold",
              }}
            >
              {t('fewTicketsLeft')}
            </Typography>
          )}
          <PurchaseButton label={t('purchaseButton')} eventId={id}/>
        </>
      ) : (
        <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
          {t('noTicketsAvailable')}
        </Typography>
      )}
    </Paper>
  );
};

export default EventFrame;
