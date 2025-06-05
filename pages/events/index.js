import EventsList from "@/components/events/EventsList";
import { getAllEvents } from "@/dummy-data";
export default function AllEventsPage() {
  const events = getAllEvents();
  return (
    <div>
      <EventsList items={events} />
    </div>
  );
}
