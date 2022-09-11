import axios from "axios";
const axiosConfig = {
  baseURL: "http://localhost:8443/api/1",
};
const apiClient = axios.create(axiosConfig);
apiClient.interceptors.request.use(function (config) {
  config.headers = { "content-type": "text/plain" };
  return config;
});

const callApi = (endPonint, data) => {
    const requestData = {
      ...data,
      __meta: {
        clientIdentifier: "bio-diversity",
        clientName: "htech",
        clientVersion: "1.0.0",
        clientPlatform: "web",
      },
    };
    return apiClient.post(endPonint, requestData);
  };


export default callApi;
