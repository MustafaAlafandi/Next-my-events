import { useState } from "react";
import classes from "./newsletter-registration.module.css";
function NewsletterRegistration() {
  const [email, setEmail] = useState();
  function registrationHandler(event) {
    event.preventDefault();
    if (email || email.trim() !== "" || email.includes("@")) {
      const reqBody = { email };
      fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
