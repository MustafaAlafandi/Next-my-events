import "dotenv/config";
import { useRouter } from "next/router";
import EventsList from "@/components/events/EventsList";
import EventsSearch from "../../components/events/events-search";
import Head from "next/head";
import { useEffect, useState } from "react";
export default function AllEventsPage(props) {
  const [events, setEvents] = useState(props.events);
  useEffect(() => {
    async function getAllEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data.events);
    }
    getAllEvents();
  }, []);
  const router = useRouter();
  function findEventsHandler(year, month) {
    let fullPath = `events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="This page you can show all your events."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList items={events} />
    </>
  );
}
export async function getStaticProps() {
  const res = await fetch(process.env.DOMAIN + "api/events");
  const data = await res.json();
  const events = data.events;
  return {
    props: {
      events,
    },
  };
}
