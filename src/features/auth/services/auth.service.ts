import constants from '../../../common/configuration/constants';
import Credential from '../types/credential';
import httpService from '../../../common/services/http.service';
import IAuthService from '../interfaces/auth-service.interface';
import ILocalStorageService from '../../../common/interfaces/local-storage-service.interface';
import { localStorageService } from '../../../common/services/local-storage.service';

export default class AuthService implements IAuthService {
  private readonly endpoint: string;

  private readonly localStorageService: ILocalStorageService;

  constructor(_localStorageService: ILocalStorageService) {
    this.endpoint = 'auth';
    this.localStorageService = _localStorageService;
  }

  getLoggedInUserCredentials(): Credential | undefined {
    const credentials = this.localStorageService.getItem<Credential>(constants.tokenKey);

    if (!credentials) return undefined;

    return credentials;
  }

  getToken(): string | undefined {
    const credentials = this.getLoggedInUserCredentials();

    if (!credentials) return undefined;
    return credentials.access_token;
  }

  async getNonce(address: string): Promise<string> {
    const response = await httpService.post(`${this.endpoint}/nonce`, { address });
    return response.data;
  }

  async signin(signature: string, nonce: string): Promise<string> {
    const response = await httpService.post(`${this.endpoint}/signin`, { signature, nonce });
    return response.data.access_token;
  }
}

export const authService = new AuthService(localStorageService);
