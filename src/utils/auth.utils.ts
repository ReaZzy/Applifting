export const setAccessTokenToLocalStorage = (accessToken: string | null) => {
  if (accessToken) return localStorage.setItem('accessToken', accessToken);
  localStorage.removeItem('accessToken');
};

export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('accessToken');
};
