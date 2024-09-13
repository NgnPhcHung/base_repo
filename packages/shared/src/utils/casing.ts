/* eslint-disable @typescript-eslint/ban-ts-comment */
export type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
        ? "_"
        : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S;

// object keys to snake case, recursively, convert null to undefined
export type SnakeCaseKeys<T> = {
  [K in keyof T as CamelToSnakeCase<K & string>]: T[K] extends object
    ? SnakeCaseKeys<T[K]>
    : T[K];
};

export const camelToSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

// export function convertToSnakeCase<T extends object>(
//   obj: T
// ): SnakeCaseKeys<T> | undefined;
// export function convertToSnakeCase<T extends object>(
//   obj: T[]
// ): SnakeCaseKeys<T>[];
// export function convertToSnakeCase<T extends object>(
//   obj: T | T[]
// ): SnakeCaseKeys<T> | SnakeCaseKeys<T>[] | undefined {
//   if (Array.isArray(obj)) {
//     return obj.filter(Boolean).map((o) => convertToSnakeCase(o)!);
//   }
//   if (typeof obj !== "object" || obj === null) {
//     return obj === null ? undefined : obj;
//   }
//   const snakeCaseObj = {} as SnakeCaseKeys<T>;
//   for (const [key, value] of Object.entries(obj)) {
//     if (typeof value === "object") {
//       snakeCaseObj[key.toSnakeCase()] = convertToSnakeCase(value);
//     } else {
//       snakeCaseObj[key.toSnakeCase()] = value;
//     }
//   }
//   return snakeCaseObj;
// }

export type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S;

// object keys to camel case, recursively, allow for _id and value undefined
export type CamelCaseKeys<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K] extends object
    ? CamelCaseKeys<T[K]>
    : T[K];
};

export const snakeToCamelCase = (str: string): string => {
  return str.replace(/(_\w)/g, (letter) => (letter[1] || "").toUpperCase());
};

// export const convertToCamelCase = <T extends object>(
//   obj: T
// ): CamelCaseKeys<T> => {
//   const camelCaseObj = {} as CamelCaseKeys<T>;
//   for (const [key, value] of Object.entries(obj)) {
//     if (typeof value === "object" && value !== null) {
//       camelCaseObj[key.toCamelCase()] = convertToCamelCase(value);
//     } else {
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//       camelCaseObj[key.toCamelCase()] = value;
//     }
//   }
//   return camelCaseObj;
// };

export const camelToPascalCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export type Casing = "camel" | "snake" | "pascal" | "kebab";

declare global {
  interface String {
    toSnakeCase(): string;
    toCamelCase(): string;
    toPascalCase(): string;
  }
}

String.prototype.toSnakeCase = function () {
  return camelToSnakeCase(this.valueOf());
};

String.prototype.toCamelCase = function () {
  return snakeToCamelCase(this.valueOf());
};

String.prototype.toPascalCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
