import "dotenv/config";
import EventsList from "../components/events/EventsList";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import { useState,useEffect } from "react";
export default function HomePage(props) {
  const [featuredEvents, setFeaturedEvents] = useState(props.featuredEvents);
  useEffect(() => {
    async function getFeaturedEvents() {
      const res = await fetch("/api/events?featured=true");
      const data = await res.json();
      setFeaturedEvents(data.events);
    }
    getFeaturedEvents();
  }, []);
  return (
    <div>
      <Head>
        <title>Feactured Events</title>
        <meta
          name="description"
          content="A home page that have your featured events."
        />
      </Head>
      <NewsletterRegistration />
      {<EventsList items={featuredEvents} />}
    </div>
  );
}
export async function getStaticProps() {
  const res = await fetch(process.env.DOMAIN + "api/events?featured=true");
  const data = await res.json();
  const featuredEvents = data.events;
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
