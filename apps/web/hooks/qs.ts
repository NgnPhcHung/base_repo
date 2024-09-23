import { parse, stringify } from "qs";

export const qs = {
  stringify<T extends Record<string, unknown>>(data: T) {
    return stringify(data, {
      allowDots: true,
      arrayFormat: "brackets",
      addQueryPrefix: false,
    });
  },
  parse<T extends Record<string, unknown>>(query: string) {
    return parse(query, {
      allowDots: true,
    }) as T;
  },
};
