import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import TokenService from '../../features/auth/services/token.service';
import appConfig from '../configuration/app.config';
import { ErrorType } from '../enums/error-type.enum';
import { ValidationError, ValidationResponse } from '../types/error-types';
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
    const responseError = error.response?.data as ValidationResponse;

    if (error.response?.status === 400) {
      const msg = this.handleBusinessError(responseError);

      if (responseError.name === ErrorType.SCHEMA_VALIDATION) toast.warn(msg);
      else toast.error(msg);

      throw error;
    }

    toast.error(responseError.message);
    throw error;
  };

  private handleBusinessError(data: ValidationResponse) {
    let msg = `${data.message} `;

    data.details?.forEach((detail: ValidationError) => {
      let constaintsSrg = '';

      if (!detail.constraints) return;

      Object.keys(detail.constraints).forEach((key) => {
        constaintsSrg = `${constaintsSrg} 
        - ${detail.constraints?.[key]} `;
      });
      msg = `${msg} ${constaintsSrg} `;
    });

    return msg;
  }

  protected setToken = (token: string) => {
    this.token = token;
    this.initializeRequestInterceptor();
  };
}
