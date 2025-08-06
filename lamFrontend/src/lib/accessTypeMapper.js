export const getAccessKey = (label) => {
  switch (label) {
    case "Software Access":
      return "Software";
    case "Cloud Access":
      return "Cloud";
    case "Internet Access":
      return "Internet";
    case "Device Request":
      return "Device";
    case "Email Attachment Increase":
      return "Email";
    case "Additional Access":
      return "Additional";
    default:
      return "";
  }
};
