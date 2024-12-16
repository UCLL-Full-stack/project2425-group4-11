import Head from "next/head";
import styles from "@styles/Home.module.css";
import MyEventFrame from "@/components/events/myEventFrameCH";
import FilterButton from "@/components/filterButton";
import ShowTimeService from "@/services/ShowTimeService";
import { useState, useEffect } from "react";
import ButtonAddEvent from "@/components/events/buttonAddEvent";
import Navbar from "@/components/navbar";
//import EventOverviewTable from "@/components/events/EventOverviewTable";

const OverviewMyEvent: React.FC = () => {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getEvents = async () => {
    try {
      const response = await ShowTimeService.getAllEvents();
      if (!response.ok) {
        console.error(
          `Failed to fetch events: ${response.status} ${response.statusText}`
        );
        setEvents([]);
        return;
      }
      const events = await response.json();
      if (Array.isArray(events)) {
        setEvents(events);
      } else {
        setEvents([]);
        console.error("Expected an array of events but got:", events);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

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
        <h2>My Events</h2>
        <section className={styles.events}>
          {events.map((event, index) => {
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
              month: "short",
              day: "2-digit",
            }).format(new Date(event.date));

            return (
              <MyEventFrame
                key={index}
                title={event.title}
                date={formattedDate} // Pass formatted date
                time={event.time}
                id={event.id}
                genre={event.genre}
              />
            );
          })}
        </section>
      </main>
    </>
  );
};

export default OverviewMyEvent;
