import EventsList from "@/components/events/EventsList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

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
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: monthIsExist ? numMonth : undefined,
  });
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
  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} />
    </>
  );
}
