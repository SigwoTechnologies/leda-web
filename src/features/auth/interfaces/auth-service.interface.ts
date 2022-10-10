import Credential from '../types/credential';

export default interface IAuthService {
  getLoggedInUserCredentials(): Credential | undefined;
  getToken(): string | undefined;
}
