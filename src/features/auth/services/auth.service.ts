import IAuthService from '../interfaces/auth-service.interface';
import HttpService from '../../../common/services/http.service';

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
}

export const authService = new AuthService();
