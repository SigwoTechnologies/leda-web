// Reference: https://www.jsonrpc.org/specification#error_object

export enum JsonRpcErrorCode {
  PARSE_ERROR = 32700,
  INVALID_REQUEST = -32600,
  METHOD_NOT_FOUND = -32601,
  INVALID_PARAMS = -32602,
  INTERNAL_ERROR = -32603,
  SERVER_ERROR_INIT = -32000,
  SERVER_ERROR_END = -32099,
}
