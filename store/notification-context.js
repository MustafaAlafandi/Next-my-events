import { createContext,useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function () {},
  hideNotification: function () {},
});
export function NotificationContextProvider(props) {

  return (
    <NotificationContext.provier>{props.children}</NotificationContext.provier>
  );
}
export default NotificationContext;
