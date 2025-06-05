import { getFeaturedEvents } from "../dummy-data";
import EventsList from "../components/events/EventsList";
export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventsList items={featuredEvents} />
    </div>
  );
}
