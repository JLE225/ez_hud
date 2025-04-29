import { debugData } from "../../../utils/debugData";
import { NotifyProps } from "../types//notifyTypes";

export const notifyDebug = () => {
  debugData<NotifyProps>([
    {
      action: "notify",
      data: {
        title: "Test Title",
        message: "This is a test notification message.",
        type: "info",
      },
    },
  ]);
  debugData<NotifyProps>([
    {
      action: "notify",
      data: {
        title: "Test Title",
        message: "This is a test notification message.",
        type: "success",
      },
    },
  ]);
  debugData<NotifyProps>([
    {
      action: "notify",
      data: {
        title: "Test Title",
        message: "This is a test notification message.",
        type: "transaction",
      },
    },
  ]);
  debugData<NotifyProps>([
    {
      action: "notify",
      data: {
        message: "This is a test notification message.",
        type: "error",
      },
    },
  ]);
};
