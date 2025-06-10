import { useEffect, useState } from "react";
import { getFeaturedEvents } from "../dummy-data";
import EventsList from "../components/events/EventsList";
export default function HomePage(props) {
  return <div>{<EventsList items={props.featuredEvents} />}</div>;
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents,
    },
  };
}
