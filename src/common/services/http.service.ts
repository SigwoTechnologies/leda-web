import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import TokenService from '../../features/auth/services/token.service';
import appConfig from '../configuration/app.config';
import LocalStorageService from './local-storage.service';

export default abstract class HttpService {
  protected instance: AxiosInstance;

  protected token?: string;

  public constructor() {
    const localStorageService = new LocalStorageService();
    const tokenService = new TokenService(localStorageService);

    this.instance = axios.create({
      baseURL: appConfig.api.url,
    });

    this.token = tokenService.getToken();

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use((response) => response, this.handleError);
  };

  private handleRequest = (config: AxiosRequestConfig) => ({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${this.token}`,
    },
  });

  private handleError = async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO: Handle Unauthorized exception
    }
  };
}
