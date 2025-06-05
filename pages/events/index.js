import { getAllEvents } from "@/dummy-data";
import EventsList from "@/components/events/EventsList";
import EventsSearch from "../../components/events/events-search";
export default function AllEventsPage() {
  const events = getAllEvents();
  return (
    <>
      <EventsSearch />
      <EventsList items={events} />
    </>
  );
}
