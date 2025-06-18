import "dotenv/config";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Comments from "@/components/input/comments";
import Head from "next/head";
import { useRouter } from "next/router";
export default function EventDetailPage(props) {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = props.event;
  if (!event) {
    return (
      <div className="center">
        <p>Loading</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={eventId} />
    </>
  );
}
export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const res = await fetch(process.env.DOMAIN + "api/events/" + eventId);
  const data = await res.json();
  const event = data.event;
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}
export async function getStaticPaths() {
  const res = await fetch(process.env.DOMAIN + "api/events");
  const data = await res.json();
  const events = data.events;
  const paths = events
    .filter((e) => e.isFeatured === true)
    .map((e) => ({
      params: { eventId: e._id },
    }));
  return {
    paths,
    fallback: true,
  };
}
