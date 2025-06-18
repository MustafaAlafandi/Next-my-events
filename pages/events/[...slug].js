import { useState, useEffect } from "react";
import EventsList from "@/components/events/EventsList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { useRouter } from "next/router";
import Head from "next/head";
export default function FilteredEventsPage() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const filterData = router.query.slug;
  let monthIsExist;
  if (filterData) monthIsExist = filterData[1] === "-" ? false : true;

  useEffect(() => {
    async function getFilteredEvents() {
      const res = await fetch(`/api/events/${filterData[0]}/${filterData[1]}`);
      const data = await res.json();
      setData(data);
      setIsLoading(false);
    }
    if (filterData) getFilteredEvents();
  }, [filterData]);
  if (isLoading || !filterData)
    return (
      <p>
        <Head>
          <title>Loading...</title>
        </Head>
        Loading...
      </p>
    );

  if (data.message === "Invalid Input") {
    return (
      <>
        <Head>
          <title>Invalid Filter</title>
        </Head>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  if (!data.filteredEvents || data.filteredEvents.length === 0) {
    return (
      <>
        <Head>
          <title>No Event Found</title>
        </Head>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const date = {
    year: filterData[0],
    month: filterData[1],
  };
  return (
    <>
      <Head>
        <title>
          Events in {(monthIsExist ? filterData[1] + "/" : "") + filterData[0]}
        </title>
        <meta
          name="description"
          content={
            "All Events for" +
            (monthIsExist ? filterData[1] + "/" : "") +
            filterData[0]
          }
        />
      </Head>
      <ResultsTitle
        date={date}
        monthIsExist={monthIsExist}
        year={filterData[1]}
      />
      <EventsList items={data.filteredEvents} />
    </>
  );
}
