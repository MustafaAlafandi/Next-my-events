import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "@/dummy-data";
import Head from "next/head";
export default function EventDetailPage(props) {
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
        <meta
          name="description"
          content="Show your event details"
        />
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
    </>
  );
}
export async function getStaticProps(context) {
  const { params } = context;
  const event = await getEventById(params.eventId);
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
  const paths = (await getFeaturedEvents()).map((e) => ({
    params: { eventId: e.id },
  }));
  return {
    paths,
    fallback: true,
  };
}
