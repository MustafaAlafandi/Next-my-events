import { useState, useEffect } from "react";
import EventsList from "@/components/events/EventsList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function FilteredEventsPage(/* props */) {
  const [loaddedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error, isLoading } = useSWR(
    "https://nextjs-course-database-90f35-default-rtdb.firebaseio.com/events.json",
    fetcher
  );
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          ...data[key],
          id: key,
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);
  if (isLoading)
    return (
      <p>
        <Head>
          <title>Loading...</title>
        </Head>
        Loading...
      </p>
    );
  // let { filteredEvents, date } = props;
  const filteredYear = filterData[0];
  const filteredMonth = filterData?.[1];
  let monthIsExist = true;
  if (filteredMonth === "-") monthIsExist = false;
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    /* props.error */
    isNaN(numYear) ||
    (isNaN(numMonth) && monthIsExist) ||
    numYear > 2030 ||
    numYear < 2021 ||
    (numMonth < 1 && monthIsExist) ||
    (numMonth > 12 && monthIsExist) ||
    error
  ) {
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
  const date = new Date(numYear, numMonth - 1);
  let filteredEvents = loaddedEvents?.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      numYear === eventDate.getFullYear() &&
      (numMonth - 1 === eventDate.getMonth() || !monthIsExist)
    );
  });
  if (!filteredEvents || filteredEvents.length === 0) {
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
  return (
    <>
      <Head>
        <title>
          Events in {(monthIsExist ? filteredMonth + "/" : "") + filteredYear}
        </title>
        <meta
          name="description"
          content={
            "All Events for" +
            (monthIsExist ? filteredMonth + "/" : "") +
            filteredYear
          }
        />
      </Head>
      <ResultsTitle
        date={date}
        monthIsExist={monthIsExist}
        year={filteredYear}
      />
      <EventsList items={filteredEvents} />
    </>
  );
}
// export async function getServerSideProps(context) {
//   const { params } = context;
// const filterData = params.slug;

// const filteredYear = filterData?.[0];
// const filteredMonth = filterData?.[1];
// let monthIsExist = true;
// if (filteredMonth === "-") monthIsExist = false;
// const numYear = +filteredYear;
// const numMonth = +filteredMonth;

// if (
//   isNaN(numYear) ||
//   (isNaN(numMonth) && monthIsExist) ||
//   numYear > 2030 ||
//   numYear < 2021 ||
//   (numMonth < 1 && monthIsExist) ||
//   (numMonth > 12 && monthIsExist)
// )
//   return {
//     props: {
//       error: true,
//     },
// notFound: true,
// redirect: {
//   destination: "/error",
// },
// };
// const filteredEvents = await getFilteredEvents({
//   year: numYear,
//   month: monthIsExist ? numMonth : undefined,
// });

// const date = {
//   year: numYear,
//   month: numMonth,
// };
// return {
//   props: {
//     filteredEvents,
//     date,
//   },
// };
// }
