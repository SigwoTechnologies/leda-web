import constants from '../../../common/configuration/constants';
import ILocalStorageService from '../../../common/interfaces/local-storage-service.interface';
import IAuthService from '../interfaces/auth-service.interface';
import Credential from '../types/credential';

export default class AuthService implements IAuthService {
  private readonly localStorageService: ILocalStorageService;

  constructor(_localStorageService: ILocalStorageService) {
    this.localStorageService = _localStorageService;
  }

  getLoggedInUserCredentials(): Credential | undefined {
    const storedCredentials =
      sessionStorage.getItem(constants.token) || this.localStorageService.getItem(constants.token);

    if (!storedCredentials) return undefined;

    const credentials = JSON.parse(storedCredentials) as Credential;
    return credentials;
  }

  getToken(): string | undefined {
    const credentials = this.getLoggedInUserCredentials();

    if (!credentials) return undefined;
    return credentials.access_token;
  }
}
