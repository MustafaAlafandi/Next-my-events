import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import EventsList from "@/components/events/EventsList";
import EventsSearch from "../../components/events/events-search";
export default function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;
  function findEventsHandler(year, month) {
    let fullPath = `events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventsList items={events} />
    </>
  );
}
export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
  };
}
