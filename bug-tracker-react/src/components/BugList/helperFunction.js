export const priorityColor = (priority) => {
  let color = "icon is-large ";

  switch (priority) {
    case "low":
      return color + "has-text-info";
    case "med":
      return color + "has-text-warning";
    case "high":
      return color + "has-text-danger";
    default:
      return color + "has-text-dark";
  }
};
