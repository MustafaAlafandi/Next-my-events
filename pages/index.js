import { getFeaturedEvents } from "../dummy-data";
import EventsList from "../components/events/EventsList";
import Head from "next/head";
export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Feactured Events</title>
        <meta
          name="description"
          content="A home page that have your featured events."
        />
      </Head>
      {<EventsList items={props.featuredEvents} />}
    </div>
  );
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
