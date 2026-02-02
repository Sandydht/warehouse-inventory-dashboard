/* eslint-disable @typescript-eslint/no-unused-vars */

import { METHOD_ASSERTION_ERRORS } from "./constants";

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
class MethodAssertion {
  public assertImplemented<T extends object, K extends keyof T>(
    _target: T,
    _methodName: K,
    _errorCode: string,
  ): asserts _target is T & Record<K, Function> {
    throw new Error(METHOD_ASSERTION_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default MethodAssertion;
