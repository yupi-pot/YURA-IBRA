import axios from "axios";

export const $api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

let accessToken = "";

export const setAccessToken = (newToken) => {
  accessToken = newToken;
};

$api.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = "Bearer" + accessToken;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => {
    setAccessToken(response.data.accessToken);
    return response;
  },
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await axios("http://localhost:4000/api/tokens/refresh", {
        withCredentials: true,
      });
      accessToken = response.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = "Bearer" + accessToken;
      return $api(prevRequest);
    }
    return Promise.reject(error);
  }
);
