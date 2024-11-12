import Head from "next/head";
import styles from '@styles/Home.module.css';
import NavBar from '../components/navbar';
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
      <NavBar/>
      <main className ={styles.main}>
        <h2>Upcoming Events</h2>
        <section className={styles.filterButton}>
          <FilterButton onClick={function (): void {
            throw new Error("Function not implemented.");
          } }/>
        </section>
        <section className={styles.events}>
          <EventFrame title={"Tour is overrated"} time={"20:00"}/>
          <EventFrame title={"Tour is overrated"} time={"20:00"}/>
          <EventFrame title={"Tour is overrated"} time={"20:00"}/>
          <EventFrame title={"Tour is overrated"} time={"20:00"}/>
          <EventFrame title={"Tour is overrated"} time={"20:00"}/>
          <EventFrame title={"Tour is overrated"} time={"20:00"}/>            
          <EventFrame title={"Tour is overrated"} time={"20:00"}/>
          <EventFrame title={"Tour is overrated"} time={"20:00"}/>
        </section>
      </main>

      <footer>
        <p>Emma Liefsoens & Samip Shrestha: 2024-2025</p>
      </footer>
    </>
  )
}

export default Start;