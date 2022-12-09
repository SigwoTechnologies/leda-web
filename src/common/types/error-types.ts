/**
 * Defines the basic exception structure
 */
export interface ExceptionResponseBase {
  /**
   * The name that identifies the type of exception that has occured.
   */
  name: string;
  /**
   * The message that determines in a more verbose way what happened.
   */
  message: string;
  /**
   * Error being thrown
   */
  error?: any;
}

/**
 * Defines the base response structure for all exceptions.
 */
export interface ExceptionResponse extends ExceptionResponseBase {
  /**
   * The resource path that was requested.
   */
  path?: string;
  /**
   * The timemstamp when the exception happened.
   */
  timestamp?: string;
  /**
   * The correlationId that was sent from the client.
   */
  correlationId?: string;

  /**
   * An internal code that allows to track the exception by identified codes within the organization
   */
  code: number;
}

/**
 * Defines the response structure for validation exceptions.
 */
export interface ValidationResponse extends ExceptionResponse {
  /**
   * Determines the validation errors in an array.
   * @example
   *
   */
  details?: ValidationError[];
}

/**
 * Validation error description.
 * @see https://github.com/typestack/class-validator
 *
 * class-validator@0.13.0
 *
 * @publicApi
 */
export interface ValidationError {
  /**
   * Object that was validated.
   *
   * OPTIONAL - configurable via the ValidatorOptions.validationError.target option
   */
  target?: Record<string, any>;
  /**
   * Object's property that hasn't passed validation.
   */
  property: string;
  /**
   * Value that haven't pass a validation.
   *
   * OPTIONAL - configurable via the ValidatorOptions.validationError.value option
   */
  value?: any;
  /**
   * Constraints that failed validation with error messages.
   */
  constraints?: {
    [type: string]: string;
  };
  /**
   * Contains all nested validation errors of the property.
   */
  children?: ValidationError[];
  /**
   * A transient set of data passed through to the validation result for response mapping
   */
  contexts?: {
    [type: string]: any;
  };
}

export interface ErrorType {
  code: string;
  message: string;
}

export interface CustomErrorType {
  [key: string]: ErrorType;
}
