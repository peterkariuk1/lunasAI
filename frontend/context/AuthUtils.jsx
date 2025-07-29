export const checkIfLoggedIn = () => {
  localStorage.getItem("is_logged_in") === "true";
};
