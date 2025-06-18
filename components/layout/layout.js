import { useContext } from "react";
import MainHeader from "./main-header";
import NotificationContext from "@/store/notification-context";
import Notification from "../ui/notification";
export default function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <>
      <MainHeader />
      <main style={{ minHeight: "400px" }}>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}
