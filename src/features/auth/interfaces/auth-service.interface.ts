export default interface IAuthService {
  getNonce(address: string): Promise<string>;
  signin(signature: string, nonce: string): Promise<string>;
}
