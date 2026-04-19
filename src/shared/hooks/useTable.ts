import { useState, useCallback } from 'react';
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

interface TableParams {
  pagination: TablePaginationConfig;
  filters?: Record<string, FilterValue | null>;
  sorter?: SorterResult<unknown> | SorterResult<unknown>[];
}

export const useTable = (onFetch: (params: TableParams) => void) => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<unknown> | SorterResult<unknown>[],
    ) => {
      const newParams = { pagination, filters, sorter };
      setTableParams(newParams);
      onFetch(newParams);
    },
    [onFetch],
  );

  return {
    tableParams,
    setTableParams,
    handleTableChange,
  };
};
