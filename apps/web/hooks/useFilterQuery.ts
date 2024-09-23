/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  useRouter as useNavigationRouter,
  useParams,
  useSearchParams,
} from "next/navigation";
import { useCallback, useMemo } from "react";
// @ts-ignore
import urlcat from "urlcat";
import { qs } from "./qs";

type UseFilterHookResponse<T extends { [key: string]: any }> = Readonly<
  [
    T,
    (filter: T, overwrite?: boolean) => void,
    () => void,
    {
      searchTarget: string;
      force?: boolean;
    },
  ]
>;
export type UseFilterHook<T extends { [key: string]: any }> = (
  initialData: T
) => UseFilterHookResponse<T>;

// const excludeDefaultAndEmpty = <T extends { [key: string]: any }>(
//   data: T,
//   initial: Partial<T>
// ) => {
//   Object.keys(data).forEach((key) => {
//     const value = data[key];
//     if (!value || String(value) === String(initial[key])) {
//       delete data[key];
//     }
//   });
//   return data;
// };

const removeEmptyKey = <T extends { [key: string]: any }>(data: T) => {
  Object.keys(data).forEach((key) => {
    if (!data[key]) delete data[key];
  });
  return data;
};

export const useFilterQuery = <T extends { [key: string]: any }>(
  searchTarget: string,
  initialData: Partial<T>
) => {
  const defaultFilter = initialData || {};
  const params = useParams();
  const router = useNavigationRouter();
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());

  const filter = useMemo(() => {
    const data = qs.parse<T>(params.toString());
    return {
      ...defaultFilter,
      ...data,
      ...query,
      limit: query.limit ? parseInt(query.limit) : defaultFilter.limit,
    };
  }, [params.toString(), query]);

  const setFilter = useCallback(
    (data: Partial<T>) => {
      router.replace(urlcat("/", searchTarget, removeEmptyKey(data || {})), {
        scroll: false,
      });
    },
    [params, defaultFilter, searchTarget]
  );

  const clearFilter = useCallback(() => {
    setFilter(initialData);
  }, [initialData]);

  return {
    filter,
    setFilter,
    clearFilter,
    searchTarget,
  };
};
