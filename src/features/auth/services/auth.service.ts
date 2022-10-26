import { AxiosError } from 'axios';
import { localStorageService } from '../../../common/services/local-storage.service';
import { tokenService } from './token.service';
import constants from '../../../common/configuration/constants';
import HttpService from '../../../common/services/http.service';
import IAuthService from '../interfaces/auth-service.interface';

export default class AuthService extends HttpService implements IAuthService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'auth';
  }

  async getNonce(address: string): Promise<string> {
    const response = await this.instance.post(`${this.endpoint}/nonce`, { address });
    return response.data;
  }

  async signin(signature: string, nonce: string): Promise<string> {
    const response = await this.instance.post(`${this.endpoint}/signin`, { signature, nonce });
    return response.data.access_token;
  }

  async authenticateLocalToken(address: string): Promise<string | null> {
    const token = tokenService.getToken();

    if (token) {
      try {
        this.setToken(token);
        await this.instance.post(`${this.endpoint}/authenticate`, { address });
        return token;
      } catch (err: unknown) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          localStorageService.removeItem(constants.tokenKey);
        }
      }
    }

    return null;
  }
}

export const authService = new AuthService();
