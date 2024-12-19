import Head from "next/head";
import styles from "@/styles/Overview.module.css";
import EventFrameArtist from "@/components/events/eventFrameArtist";
import EventFrameUser from "@/components/events/eventFrameUser";
import EventFrameCH from "@/components/events/eventFrameCH";
import ShowTimeService from "@/services/ShowTimeService";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Event, Ticket, User } from "@/types/index"
import ButtonAddEvent from "@/components/events/buttonAddEvent";
import UserService from "@/services/UserService";

const OverviewMyEvent: React.FC = () => {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [parsedUser, setParsedUser] = useState<User>();
  const [user, setUser] = useState<any>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const {t} = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("loggedInUser");
      const parsedUser = user ? JSON.parse(user) : null;
      setParsedUser(parsedUser);
      setUserRole(parsedUser?.role || null);
    }
  }, []);

  const fetchTicketsAndEvents = async () => {
    if (userRole === "user" && parsedUser) {
      try {
        // Fetch User Data
        const getUser = await UserService.getUserByUsername(parsedUser.username || "");
        if (getUser.ok) {
          const userData = await getUser.json();
          setUser(userData);
  
          // Fetch Tickets
          const ticketResponse = await ShowTimeService.getTicketsByUserId(userData.id.toString());
          if (ticketResponse.ok) {
            const ticketsData: Ticket[] = await ticketResponse.json();
            setTickets(ticketsData);
  
            // Fetch Events for Tickets
            const eventPromises = ticketsData.map((ticket) =>
              ShowTimeService.getEventById(ticket.eventId.toString()).then((res) =>
                res.ok ? res.json() : null
              )
            );
            const eventsData = (await Promise.all(eventPromises)).filter(Boolean) as Event[];
            setEvents(eventsData);
          }
        }
      } catch (error) {
        console.error(t('overviewEvent.error.fetchFail2'), error);
      }
    }

    if (userRole === "artist" && parsedUser) {
      try {
        const getUser = await ShowTimeService.getArtistByArtistName(parsedUser.username || "");
        if (getUser.ok) {
          const userData = await getUser.json();
          setUser(userData);

          const eventResponse = await ShowTimeService.getEventsByArtistId(userData.id.toString());
          if (eventResponse.ok) {
            const eventData = await eventResponse.json();
            setEvents(eventData);
          }
        }
      } catch (error) {
        console.error(t('overviewEvent.error.fetchFail'), error);
      }
    }

    if (userRole === "concertHall" && parsedUser) {
      try {
        const getUser = await ShowTimeService.getConcertHallByUsername(parsedUser.username || "");
        if (getUser.ok) {
          const userData = await getUser.json();
          setUser(userData);

          const eventResponse = await ShowTimeService.getEventsByConcertHallId(userData.id.toString());
          if (eventResponse.ok) {
            const eventData = await eventResponse.json();
            setEvents(eventData);
          }
        }
      } catch (error) {
        console.error(t('overviewEvent.error.fetchFail'), error);
      }
    }
  };
  
  useEffect(() => {
    fetchTicketsAndEvents();
  }, [userRole, parsedUser]);

  return (
    <>
      <Head>
        <title>ShowTime</title>
        <meta name="description" content="ShowTime app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className={styles.main}>
      <section className={styles.headingContainer}>
        <h2 className={styles.heading}>{t('overviewEvent.titel')}</h2>
        {userRole === "concertHall" && <ButtonAddEvent />}
      </section>
        <section className={styles.events2}>
          {events.map((event, index) => {
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
              month: "short",
              day: "2-digit",
            }).format(new Date(event.date));

            return (
              <>
              {userRole === "artist" && (
                <EventFrameArtist key={index} title={event.title} genre={event.genre} date={formattedDate} time={event.time}/>
              )}
              {userRole === "user" && (
                <EventFrameUser key={index} title={event.title} genre={event.genre} date={formattedDate} time={event.time}/>
              )}
              {userRole === "concertHall" && (
                <EventFrameCH key={index} title={event.title} genre={event.genre} date={formattedDate} time={event.time}/>
              )}
              </>
            );
          })}
        </section>
      </main>
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


export default OverviewMyEvent;
