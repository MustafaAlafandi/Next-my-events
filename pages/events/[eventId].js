import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getAllEvents, getEventById } from "@/dummy-data";
import { useRouter } from "next/router";
export default function EventDetailPage(props) {
  const event = props.event;
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }

  return (
    <>
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
  return {
    props: {
      event,
    },
    revalidate: 10,
  };
}
export async function getStaticPaths() {
  const paths = (await getAllEvents()).map((e) => ({
    params: { eventId: e.id },
  }));
  return {
    paths,
    fallback: false,
  };
}
