import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "@/store/notification-context";
function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();
  const [loadComments, setLoadComments] = useState(true);
  const NotificationCtx = useContext(NotificationContext);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }
  console.log("laodComments", loadComments);
  function addCommentHandler(commentData) {
    NotificationCtx.showNotification({
      title: "Uploading...",
      message: "Comment Uploading...",
      status: "pending",
    });
    fetch("/api/events/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify({ ...commentData, eventId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        res.json().then((data) => {
          NotificationCtx.showNotification({
            title: "Error",
            message: data.error,
            status: "error",
          });
        });
      })
      .then(() => {
        NotificationCtx.showNotification({
          title: "Success",
          message: "Comment Upload successfully",
          status: "success",
        });
        setLoadComments(true);
      });
  }
  useEffect(() => {
    fetch("/api/events/comments/" + eventId)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setLoadComments(false);
      });
  }, [loadComments]);
  let CL;
  if (showComments) {
    if (loadComments) CL = <p>Loading...</p>;
    else CL = <CommentList comments={comments} />;
  }
  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {CL}
    </section>
  );
}

export default Comments;
