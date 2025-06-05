import { getFeaturedEvents } from "../dummy-data";
import EventsList from "../components/events/EventsList";
export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  console.log(featuredEvents);
  return (
    <div>
      <EventsList items={featuredEvents} />
    </div>
  );
}
