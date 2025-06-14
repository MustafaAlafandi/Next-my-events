import { getAllEvents } from "@/helper/api-util";
import { useRouter } from "next/router";
import EventsList from "@/components/events/EventsList";
import EventsSearch from "../../components/events/events-search";
import Head from "next/head";
export default function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;
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
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
  };
}
