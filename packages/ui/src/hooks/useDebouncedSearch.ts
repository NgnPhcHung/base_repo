import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

export interface DebouncedParams<T> {
  fetcher: (term: string) => Promise<T[]>;
  debounceTime?: number;
  initialData?: T[];
}

export function useDebouncedSearch<T>(
  fetcher: DebouncedParams<T>["fetcher"],
  debounceTime: NonNullable<DebouncedParams<T>["debounceTime"]>,
  initialValue?: DebouncedParams<T>["initialData"]
): [T[] | undefined, (query: string) => void] {
  const [value, setValue] = useState<string>();
  const [debouncedValue] = useDebouncedValue(value, debounceTime);
  const [data, setData] = useState<T[] | undefined>(initialValue);

  useEffect(() => {
    if (initialValue) {
      setData(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    debouncedSearch();
  }, [debouncedValue]);

  const search = async (query: string) => {
    setValue(query);
  };

  const debouncedSearch = async () => {
    if (debouncedValue !== undefined) {
      const items = await fetcher(debouncedValue);
      setData(items);
    }
  };

  return [data, search];
}
