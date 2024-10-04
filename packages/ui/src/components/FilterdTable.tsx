import { Pageable, PaginationResult } from "@packages/models";
import { DataTable, DataTableProps } from "mantine-datatable";
import { useMemo } from "react";
export interface FilteredTableProps<T extends Record<string, any>>
  extends Omit<
    DataTableProps<T>,
    | "records"
    | "page"
    | "groups"
    | "onPageChange"
    | "onRecordsPerPageChange"
    | "recordsPerPageOptions"
    | "customLoader"
    | "noRecordsIcon"
    | "loaderBackgroundBlur"
    | "loaderSize"
    | "loaderVariant"
    | "loaderColor"
  > {
  filteredData: PaginationResult<T>;
  onFilterChange: <P extends Pageable>(filter: P) => void;
  defaultSortKey?: string;
  loader?: React.ReactNode;
}
export const FilteredTable = <T extends Record<string, any>>({
  filteredData,
  onFilterChange,
  idAccessor = "id",
  withRowBorders = false,
  withTableBorder = false,
  columns = [],
  ...props
}: FilteredTableProps<T>) => {
  const {
    cursor = 0,
    limit = 25,
    sortBy = "id",
    sortDirection = "ASC",
    data,
    total,
  } = filteredData;

  return (
    <DataTable<T>
      records={data}
      columns={columns}
      idAccessor={idAccessor}
      withRowBorders={withRowBorders}
      withTableBorder={withTableBorder}
      onPageChange={(page) => {
        onFilterChange({ cursor: page });
      }}
      totalRecords={total}
      recordsPerPage={limit}
      onRecordsPerPageChange={(recordsPerPage) => {
        onFilterChange({ limit: recordsPerPage });
      }}
      recordsPerPageOptions={[limit]}
      sortStatus={{
        columnAccessor: sortBy,
        direction: sortCasing(sortDirection),
      }}
      page={Number(cursor + 1)}
      id="mantine-datatable"
      {...props}
    />
  );
};
function sortCasing(sort: string | undefined): "asc" | "desc" {
  return sort?.toUpperCase() === "ASC" ? "asc" : "desc";
}
