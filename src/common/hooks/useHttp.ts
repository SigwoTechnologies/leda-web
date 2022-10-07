import { useCallback } from 'react';
import { AxiosInstance } from 'axios';
import httpService from '../services/http.service';

const useHttp = () => {
  const getHttpService = useCallback(() => httpService, []);

  const requestInterceptor = (httpInstance: AxiosInstance, token: string | undefined) =>
    httpInstance.interceptors.request.use(async (config) => ({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    }));

  const responseInterceptor = useCallback(
    (httpInstance: AxiosInstance) =>
      httpInstance.interceptors.response.use(
        async (response) => response,
        (error) =>
          // TODO: Implement exception handling
          Promise.reject(error)
      ),
    []
  );

  return { getHttpService, requestInterceptor, responseInterceptor };
};

export default useHttp;
