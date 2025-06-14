import { getFeaturedEvents } from "../helper/api-util";
import EventsList from "../components/events/EventsList";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";
export default function HomePage(props) {
  fetch("./api/newsletter")
    .then((res) => res.json())
    .then((data) => console.log(data));
  fetch("./api/comment")
    .then((res) => res.json())
    .then((data) => console.log(data));
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
