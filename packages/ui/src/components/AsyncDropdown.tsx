import { Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

export interface DataItem {
  value: string;
  label: string;
}

export interface ApiResponse {
  data: DataItem[];
  hasMore: boolean;
}

export const InfiniteDropdown = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Function to fetch data
  const fetchData = async (page: number, searchTerm: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://yourapi.com/data?page=${page}&search=${searchTerm}`
      );
      const newData: ApiResponse = await response.json();
      setData((prev) => [...prev, ...newData.data]);
      setHasMore(newData.hasMore);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect for handling initial load and search
  useEffect(() => {
    setData([]); // Clear existing data
    setPage(1);
    fetchData(1, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Load more data when the user scrolls
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasMore && !loading) {
      setPage((prev) => prev + 1);
      fetchData(page + 1, debouncedSearchTerm);
    }
  };

  return (
    <Select
      label="Search and select"
      placeholder="Start typing"
      searchable
      onSearchChange={setSearchTerm}
      data={data}
      onScroll={handleScroll}
    />
  );
};
