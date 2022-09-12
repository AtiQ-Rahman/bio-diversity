import axios from "axios";
const axiosConfig = {
  baseURL: "http://localhost:8443/api/v1",
};
const apiClient = axios.create(axiosConfig);
apiClient.interceptors.request.use(function (config) {
  config.headers = { "content-type": "text/plain" };
  return config;
});

const callApi = async (endPonint, data) => {
    const requestData = {
      ...data,
      __meta: {
        clientIdentifier: "bio-diversity",
        clientName: "htech",
        clientVersion: "1.0.0",
        clientPlatform: "web",
      },
    };
    let response = await apiClient.post(endPonint, requestData)
    return response.data
  };


export default callApi;
