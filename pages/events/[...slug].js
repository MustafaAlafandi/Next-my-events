import EventsList from "@/components/events/EventsList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";

export default function FilteredEventsPage(props) {
  let { filteredEvents, date } = props;
  if (props.error) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  date = new Date(date.year, date.month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  const filteredYear = filterData?.[0];
  const filteredMonth = filterData?.[1];
  let monthIsExist = true;
  if (filteredMonth === "-") monthIsExist = false;
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    (isNaN(numMonth) && monthIsExist) ||
    numYear > 2030 ||
    numYear < 2021 ||
    (numMonth < 1 && monthIsExist) ||
    (numMonth > 12 && monthIsExist)
  )
    return {
      props: {
        error: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: monthIsExist ? numMonth : undefined,
  });

  const date = {
    year: numYear,
    month: numMonth,
  };
  return {
    props: {
      filteredEvents,
      date,
    },
  };
}
