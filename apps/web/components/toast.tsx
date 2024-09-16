import { notifications } from "@mantine/notifications";
import { ReactNode } from "react";

export const toast = {
  error: (message: ReactNode, title?: ReactNode) => {
    console.log(message);
    notifications.show({
      message,
      color:"red",
      title,
    });
  },
  loading: (message: ReactNode, title?: ReactNode) => {
    notifications.show({
      message,
      withCloseButton: false,
      title,
    });
  },
  success: (message: ReactNode, title?: ReactNode) => {
    notifications.show({
      message,
      color: "green",
      title,
    });
  },
  info: (message: ReactNode, title?: ReactNode) => {
    notifications.show({
      message,
      color: "blue",
      title,
    });
  },
};

