/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import MethodAssertion from "../../application/utils/MethodAssertion";

class MethodAssertionImpl extends MethodAssertion {
  public assertImplemented<T extends object, K extends keyof T>(
    target: T,
    methodName: K,
    errorCode: string,
  ): asserts target is T & Record<K, Function> {
    if (typeof target[methodName] !== "function") {
      throw new Error(errorCode);
    }
  }
}

export default MethodAssertionImpl;
