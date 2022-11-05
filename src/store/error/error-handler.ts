import { Logger } from '@ethersproject/logger';
import { toast } from 'react-toastify';
import { utils } from 'ethers';
import { ProviderRpcError } from '../../features/auth/types/metamask-types';
import { JsonRpcErrorCode } from '../../common/exceptions/json-rpc-error';

// Ref: https://www.4byte.directory/signatures/?bytes4_signature=0x08c379a0
const ERROR_BYTES_SIGNATURE = '0x08c379a0';

// Ref: https://www.4byte.directory/signatures/?bytes4_signature=0x4e487b71
const PANING_BYTES_SIGNATURE = '0x4e487b71';

const parseError = (data: any) => {
  if (data.startsWith(ERROR_BYTES_SIGNATURE)) {
    const content = `0x${data.substring(10)}`;
    const reason = utils.defaultAbiCoder.decode(['string'], content);
    return reason[0];
  }

  if (data.startsWith(PANING_BYTES_SIGNATURE)) {
    const content = `0x${data.substring(10)}`;
    const code = utils.defaultAbiCoder.decode(['uint'], content);
    return code[0];
  }
  return null;
};

/**
 * Metamask exception handler that displays a toast error with a user friendly message
 * @param err Error catch from exception trace
 * @param callback Callback function when the error is not produced by metamask
 * @returns Executes a callback if it is defined. Otherwise throws the error
 */
export const rejectWithMetamask = (err: unknown, callback?: () => any) => {
  const error = err as ProviderRpcError;

  if (error && error.code === Logger.errors.ACTION_REJECTED) {
    toast.error('You must approve the transaction in order to continue.');
    throw err;
  }

  if (error && error.code === Logger.errors.INSUFFICIENT_FUNDS) {
    toast.error('The transaction cannot be completed because you have insufficient funds.');
    throw err;
  }

  if (error && error.code === Logger.errors.SERVER_ERROR) {
    toast.error('An error has occurred while processing your transaction.');
    throw err;
  }

  if (error && error.code === Logger.errors.TIMEOUT) {
    toast.error(
      'Looks like the server is taking to long to respond. This can be caused by either poor connectivity or an error with our servers. Please try again in a while.'
    );
    throw err;
  }

  if (error && error.code === Logger.errors.INVALID_ARGUMENT) {
    toast.error(
      'The transaction cannot be completed because some of the arguments are invalid. Please verify your transaction request and try again.'
    );
    throw err;
  }

  // Note: Solidity handles custom error as unpredictable gas limit exception, under the code number -32603.
  // This code needs more attention when it comes to new releases of solidity, since it is very brittle.
  if (error && error.code === Logger.errors.UNPREDICTABLE_GAS_LIMIT) {
    // The only way to retrieve custom errors from etherjs is extracting the error object from the message string.
    const txJson = `${error?.message?.split('error=')?.pop()?.split('}')[0]}}}}`;

    try {
      const tx = JSON.parse(txJson);
      const errorMessage = parseError(tx.data?.data?.data);

      if (errorMessage) {
        toast.error(errorMessage);
      }
    } catch {
      throw err;
    }

    throw err;
  }

  if (error && error.code === JsonRpcErrorCode.INTERNAL_ERROR) {
    toast.error(
      'An unexpected error has occurred while processing your request. You might try resetting your metamask account or signing in again.'
    );
    throw err;
  }

  if (callback) return callback();
  throw err;
};
