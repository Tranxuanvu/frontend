export const setUserToLocalStorage = (user) =>
  localStorage.setItem('user', JSON.stringify(user));

export const removeUserFromLocalStorage = () =>
  localStorage.removeItem('user');

export const getUserFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('user')) || null;

export const getAuthTokenFromLocalStorage = () => {
  const user = getUserFromLocalStorage();

  return user?.token;
};
