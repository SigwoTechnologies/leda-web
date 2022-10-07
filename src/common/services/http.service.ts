import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import appConfig from '../configuration/app.config';

const config: AxiosRequestConfig = {
  baseURL: appConfig.api.url,
};

const httpService: AxiosInstance = axios.create(config);
export default httpService;
