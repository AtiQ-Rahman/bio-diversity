import axios from "axios";
const mode = 'production' // 'dev' or 'production

const config = {
  dev: "http://localhost:3000/api/v1",
  production: "https://bio-diversity-nine.vercel.app:3000/api/v1"
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
