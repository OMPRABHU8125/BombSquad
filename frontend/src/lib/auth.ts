export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("token");
  return Boolean(token);
};
