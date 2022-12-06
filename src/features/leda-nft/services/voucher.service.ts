import HttpService from '../../../common/services/http.service';
import IVoucherService from '../interfaces/voucher-service.interface';

export default class VoucherService extends HttpService implements IVoucherService {
  private readonly endpoint: string;

  constructor() {
    super();
    this.endpoint = 'vouchers';
  }

  async delete(voucherId: string): Promise<void> {
    const { data } = await this.instance.delete(`${this.endpoint}/${voucherId}`);
    return data;
  }
}

export const voucherService = new VoucherService();
