import { ErrorCode } from '@ethersproject/logger';
import { JsonRpcErrorCode } from '../../../common/exceptions/json-rpc-error';

export interface ProviderRpcError extends Error {
  message: string;
  code: ErrorCode | JsonRpcErrorCode;
  data?: unknown;
}
