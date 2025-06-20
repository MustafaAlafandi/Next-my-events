export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-database-90f35-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const transformedData = [];
  for (const key in data) {
    transformedData.push({ ...data[key], id: key });
  }
  return transformedData;
}

export async function getFeaturedEvents() {
  const data = await getAllEvents();
  return data.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const events = await getAllEvents();
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year &&
      (eventDate.getMonth() === month - 1 || !month)
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const data = await getAllEvents();
  return data.find((event) => event.id === id);
}
