import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import EventsList from "@/components/events/EventsList";
import EventsSearch from "../../components/events/events-search";
export default function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();
  function findEventsHandler(year, month) {
    let fullPath = "/events/" + year;
    if (month) fullPath += "/" + month;
    router.push(fullPath);
  }
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList items={events} />
    </>
  );
}
