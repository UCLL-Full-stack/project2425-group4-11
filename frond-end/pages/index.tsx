import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavBar from "@/components/navbar";
import EventFrame from "@/components/event";
import ShowTimeService from "@/services/ShowTimeService";
import { useState, useEffect } from "react";
import { Event } from "@/types/index";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Start: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState<boolean>(false);
  const { t } = useTranslation();

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

      const eventsData = await response.json();
      if (Array.isArray(eventsData)) {
        const eventsWithConcertHalls = await Promise.all(
          eventsData.map(async (event: Event) => {
            const concertHallResponse = await ShowTimeService.getConcertHallById(event.concertHallId);
            if (concertHallResponse.ok) {
              const concertHallData = await concertHallResponse.json();
              return { ...event, concertHallName: concertHallData.name };
            }
            return { ...event, concertHallName: "Unknown" };
          })
        );
        setEvents(eventsWithConcertHalls);
      } else {
        setEvents([]);
        console.error(t("index.error.mismatch"), eventsData);
      }
    } catch (error) {
      console.error(t("index.error.fetchFail"), error);
      setEvents([]);
    }
  };

  useEffect(() => {
    setIsClient(true);
    getEvents();
  }, []);

  if (!isClient) {
    return null;
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content={t("app.title")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <h1>{t("index.main.heroSection.slogan")}</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder={t("index.main.heroSection.placeHolder.searchBar")}
              className={styles.searchBar}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <br />
          <p>{t("index.main.heroSection.text")}</p>
        </section>
        <div className={styles.mainBodyTitle}>
          <br />
          <h2>{t("index.main.body.title")}</h2>
        </div>
        <section className={styles.events}>
          {filteredEvents.map((event, index) => {
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
              month: "short",
              day: "2-digit",
            }).format(new Date(event.date));

            return (
              <EventFrame
                key={index}
                title={event.title}
                date={formattedDate}
                time={event.time}
                id={event.id}
                genre={event.genre}
                concertHallName={event.concertHallName}
              />
            );
          })}
        </section>

        <footer className={styles.footer}>
          <p>Emma Liefsoens & Samip Shrestha: 2024-2025</p>
        </footer>
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

export default Start;
