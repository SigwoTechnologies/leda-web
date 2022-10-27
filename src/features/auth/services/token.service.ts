import { localStorageService } from '../../../common/services/local-storage.service';
import constants from '../../../common/configuration/constants';
import Credential from '../types/credential';
import ILocalStorageService from '../../../common/interfaces/local-storage-service.interface';
import ITokenService from '../interfaces/token-service.interface';

export default class TokenService implements ITokenService {
  private readonly localStorageService: ILocalStorageService;

  constructor(_localStorageService: ILocalStorageService) {
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
}

export const tokenService = new TokenService(localStorageService);
