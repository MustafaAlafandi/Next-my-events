import { useEffect, useState } from "react";
import { getFeaturedEvents } from "../dummy-data";
import EventsList from "../components/events/EventsList";
export default function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState();
  useEffect(() => {
    async function GFE() {
      const FE = await getFeaturedEvents();
      setFeaturedEvents(FE);
    }
    GFE();
  }, []);
  if (!featuredEvents || featuredEvents?.length === 0) return <p>Loading...</p>;
  return <div>{<EventsList items={featuredEvents} />}</div>;
}
