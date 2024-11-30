import Head from "next/head";
import styles from "@styles/Home.module.css";
import NavBar from "../components/navbar";
import EventFrame from "@/components/event";
import FilterButton from "@/components/filterButton";
import ShowTimeService from "@/services/ShowTimeService";
import { useState, useEffect } from "react";

const Start: React.FC = () => {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getEvents = async () => {
    const response = await ShowTimeService.getAllEvents();
    const events = await response.json();
    setEvents(events);
  };

  useEffect(()=>{
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
      <NavBar />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h1>Unlock the stage to unforgettable sounds.</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for event"
              className={styles.searchBar}
            />
            <button className={styles.searchButton}>
              <span>🔍</span>
            </button>
          </div>
          <p>
            Get tickets to gigs, parties, and festivals for the best price in
            the market.
          </p>
        </section>

        <h2>Upcoming Events</h2>
        <section className={styles.filterButton}>
          <FilterButton
            onClick={() => {
            }}
          />
        </section>
        <section className={styles.events}>

          {events.map((event, index) => (
            <EventFrame
              key={index}
              title={event.title}
              time={event.time}
            />
          ))}
        </section>
      </main>

      <footer>
        <p>Emma Liefsoens & Samip Shrestha: 2024-2025</p>
      </footer>
    </>
  );
};

export default Start;
