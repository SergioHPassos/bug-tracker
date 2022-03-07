// takes the bulma css color for the bug icon and converts it into the proper data for POSTing to server
export const priorityConversion = (priority) => {
  switch (priority) {
    case " has-text-info":
      return "low";
    case " has-text-warning":
      return "med";
    case " has-text-danger":
      return "high";
    default:
      return "none";
  }
};
