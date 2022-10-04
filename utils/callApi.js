import axios from "axios";
const mode = 'dev' // 'dev' or 'production

const config = {
  dev: "http://localhost:8443/api/v1",
  production: "https://bio-diversity-server.herokuapp.com/api/v1"
}
const axiosConfig = {
  baseURL: config[mode]
}

export const imageUrl = axiosConfig.baseURL + '/uploads';

const apiClient = axios.create(axiosConfig);

const callApi = async (endPonint, data, config = {}) => {
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
