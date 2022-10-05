export const setAccessToken = (accessToken: string | null) => {
  if (accessToken) return localStorage.setItem('accessToken', accessToken);
  localStorage.removeItem('accessToken');
};

export const getToken = () => {
  return window.localStorage.getItem('accessToken');
};
