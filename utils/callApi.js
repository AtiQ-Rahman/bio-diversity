import axios from "axios";
const axiosConfig = {
  baseURL: "http://localhost:8443/api/v1",
};
const apiClient = axios.create(axiosConfig);

const callApi = async (endPonint, data , config = {}) => {
  let meta = {
    clientIdentifier: "bio-diversity",
    clientName: "htech",
    clientVersion: "1.0.0",
    clientPlatform: "web",
  }
  data.meta = meta

  let response = await apiClient.post(endPonint, data, config)
  return response.data
};


export default callApi;
