import { AxiosError } from 'axios';
import { localStorageService } from '../../../common/services/local-storage.service';
import { tokenService } from './token.service';
import constants from '../../../common/configuration/constants';
import HttpService from '../../../common/services/http.service';
import IAuthService from '../interfaces/auth-service.interface';
import { Account } from '../../../types/account';

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
    const { data } = await this.instance.post(`${this.endpoint}/signin`, { signature, nonce });
    const token = data.access_token;
    this.setToken(token);
    return token;
  }

  async authenticateLocalToken(
    address: string
  ): Promise<{ token: string; account: Account } | null> {
    const token = tokenService.getToken();

    if (token) {
      try {
        this.setToken(token);
        const { data } = await this.instance.post(`${this.endpoint}/authenticate`, { address });
        return { token, account: data };
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
