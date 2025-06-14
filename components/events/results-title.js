import Button from "../ui/Button";
import classes from "./results-title.module.css";

function ResultsTitle(props) {
  const { date, monthIsExist, year } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      {monthIsExist ? (
        <h1>Events in {humanReadableDate}</h1>
      ) : (
        <h1>Events in {year}</h1>
      )}

      <Button className={classes.button} link="/events">
        Show all events
      </Button>
    </section>
  );
}

export default ResultsTitle;
