import { AssertionError } from "assert";

type Assert = <E extends Error = AssertionError>(
  condition: unknown,
  message?: string | E
) => asserts condition;

type AssertValue = <T, E extends Error = AssertionError>(
  condition: unknown,
  value: T,
  message?: string | E
) => asserts condition is T;

type AssertInstance = <T, E extends Error = AssertionError>(
  condition: unknown,
  type: { new (...args: unknown[]): T },
  message?: string | E
) => asserts condition is T;

type AssertPromise = <T, E extends Error = Error>(
  value: Promise<T>,
  message?: string | E
) => Promise<NonNullable<T>>;

const createError = <E extends Error>(error: string | E) => {
  if (typeof error === "string") {
    return new AssertionError({ message: error });
  }
  error.message = error.message;
  return error;
};

export const ensureNot: Assert = (
  condition: unknown,
  message = "Condition is not falsy"
): asserts condition => {
  if (condition !== null && condition !== undefined) {
    throw createError(message);
  }
};

export const ensureIs: AssertInstance = <T, E extends Error = AssertionError>(
  condition: unknown,
  type: { new (...args: unknown[]): T },
  message: E | string = "Condition is not instance of {type}"
): asserts condition is T => {
  if (!(condition instanceof type)) {
    throw createError(message);
  }
};

export const ensureValue: AssertValue = <T, E extends Error = AssertionError>(
  condition: unknown,
  value: T,
  message: E | string = "Condition is not equal to {value}"
): asserts condition is T => {
  if (condition !== value) {
    throw createError(message);
  }
};

export const ensureNotValue: AssertValue = <
  T,
  E extends Error = AssertionError,
>(
  condition: unknown,
  value: T,
  message: E | string = "Condition is equal to {value}"
): asserts condition is T => {
  if (condition === value) {
    throw createError(message);
  }
};

export const ensureTruthy: Assert = (
  condition: unknown,
  message = "Condition is not truthy"
): asserts condition => {
  return ensureValue(condition, true, message);
};

export const ensureFalsy: Assert = (
  condition: unknown,
  message = "Condition is not falsy"
): asserts condition => {
  return ensureValue(condition, false, message);
};

const getError = <E extends Error = Error>(
  error?: string | ((msg: string) => E)
) => {
  if (typeof error === "string") {
    return new Error(error);
  } else {
    const handler = error || ((msg: string) => new Error(msg));
    return handler("Value is null or undefined");
  }
};

export const ensureComparision = <T, E extends Error = Error>(
  value: T,
  compare: (value: T) => boolean,
  error?: string | ((msg: string) => E)
): T => {
  if (!compare(value)) {
    throw getError(error);
  }
  return value;
};

export const ensure = <T, E extends Error = Error>(
  value: T,
  error?: string | ((msg: string) => E)
): NonNullable<T> => {
  return ensureComparision(
    value,
    (value) => value !== null && value !== undefined,
    error
  )!;
};

export const ensurePromise = async <T, E extends Error = Error>(
  value: T | Promise<T>,
  error?: string | ((msg: string) => E)
): Promise<NonNullable<T>> => {
  return ensure(await value, error)!;
};
