import classes from "./comment-list.module.css";

function CommentList(props) {
  const { comments } = props;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments &&
        comments.map((c) => (
          <li key={c.id}>
            <p>{c.text}</p>
            <div>
              By <address>{c.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
