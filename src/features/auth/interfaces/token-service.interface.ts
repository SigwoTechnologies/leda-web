import Credential from '../types/credential';

export default interface ITokenService {
  getLoggedInUserCredentials(): Credential | undefined;
  getToken(): string | undefined;
}
