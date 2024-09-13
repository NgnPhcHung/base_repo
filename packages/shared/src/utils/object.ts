import { Path, PathValue, Primitive } from "./objectInternal";

export const hasOwn = (object: object, key: string) => {
  return object != null && Object.hasOwnProperty.call(object, key);
};

export function getVal<T extends object, P extends Path<T>>(
  obj: T,
  key: P
): PathValue<T, P> | undefined;

export function getVal<
  T extends object,
  P extends Path<T>,
  D = PathValue<T, P>,
>(obj: T, key: P, defaultValue: D): PathValue<T, P> | D;

export function getVal<
  T extends object,
  P extends Path<T>,
  D = PathValue<T, P> | undefined,
>(
  obj: T,
  key: P,
  defaultValue?: D | undefined
): PathValue<T, P> | D | undefined {
  const keys = key.split(".");
  const val = keys.reduce<PathValue<T, P>>(
    (acc, key) => (acc as never)?.[key as keyof object],
    obj as never
  );
  return val === undefined ? defaultValue : val;
}

export const setVal = <
  T extends object,
  P extends Path<T>,
  V extends PathValue<T, P>,
>(
  obj: T,
  key: P,
  value: V
): T => {
  const keys = key.split(".");
  const lastKey = keys.pop() as string;
  const target = keys.reduce<object>(
    (acc, key) => (acc as never)?.[key as keyof object],
    obj as never
  );
  target[lastKey as keyof object] = value;
  return obj;
};

export const isObject = (value: unknown): value is object => {
  return Object(value) !== value;
};

export const flatten = <T>(obj: unknown): T => {
  const result: any = {};
  const recurse = (cur: unknown, prop: string) => {
    if (!isObject(cur) || Array.isArray(cur) || cur instanceof Blob) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      result[prop] = cur;
    } else {
      let isEmpty = true;
      for (const p in cur) {
        isEmpty = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty && prop) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        result[prop] = {};
      }
    }
  };
  recurse(obj, "");
  return result as T;
};

export type AnyClass<T = unknown> = new (...args: any[]) => T;

// check if value is a class
export const isClass = (value: any): value is AnyClass => {
  return typeof value === "function" && /^\s*class\s+/.test(String(value));
};

export const isPlainObject = (value: unknown): value is object => {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype
  );
};

export const isInstance = (value: any): value is InstanceType<any> => {
  return typeof value === "object" && !isPlainObject(value) && !isClass(value);
};

export const isPrimitiveType = (value: unknown): value is Primitive => {
  return (
    typeof value === "function" &&
    ["String", "Number", "Boolean", "Symbol", "Array"].includes(value.name)
  );
};

export const arrayToRecord = <T extends AnyClass>(arr: T[]) => {
  return arr.reduce(
    (acc, curr) => {
      const prop = curr.name;
      acc[String(prop)] = curr;
      return acc;
    },
    {} as Record<string, AnyClass>
  );
};

export const toPlainObject = <T extends object>(obj: T): object => {
  return Object.assign({}, obj);
};

export const removeUndefined = <
  T extends Record<string, any> = Record<string, any>,
>(
  obj: T
): T => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeUndefined(obj[key]);
    }
  });

  return obj;
};
