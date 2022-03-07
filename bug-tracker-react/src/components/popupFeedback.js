import { toast } from "bulma-toast";

export const PopupFeedback = (title, color) => {
  toast({
    message: title,
    type: color,
    position: "top-left",
    closeOnClick: true,
    pauseOnHover: true,
  });
};
