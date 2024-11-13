import Head from "next/head";
import styles from "@styles/Home.module.css";
import NavBar from "../components/navbar";
import EventFrame from "@/components/event";
import FilterButton from "@/components/filterButton";

const Start: React.FC = () => {
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
              /* implement filter logic */
            }}
          />
        </section>
        <section className={styles.events}>
          {[...Array(8)].map((_, index) => (
            <EventFrame
              key={index}
              title={"Tour is overrated"}
              time={"20:00"}
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
