import { Table, Card, Grid, Typography, Space, Skeleton, Empty, Pagination } from 'antd';
import type { TableProps, ColumnsType } from 'antd/es/table';
import React, { useMemo } from 'react';

const { useBreakpoint } = Grid;
const { Text } = Typography;

type Key = string | number;

export interface ExtendedColumn<T> {
  hideOnMobile?: boolean;
  dataIndex?: keyof T;
  key?: Key;
  title?: React.ReactNode;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
}

export interface ResponsiveTableProps<T extends Record<string, unknown>> extends Omit<
  TableProps<T>,
  'columns'
> {
  columns: (ColumnsType<T>[number] & ExtendedColumn<T>)[];
  dataSource: T[];
  rowKey: string | ((record: T) => string);
  mobileRender?: (record: T, index: number) => React.ReactNode;
  loadingRows?: number;
  mobilePageSize?: number;
}

export function ResponsiveTable<T extends Record<string, unknown>>(props: ResponsiveTableProps<T>) {
  const {
    columns,
    dataSource,
    rowKey,
    loading,
    mobileRender,
    loadingRows,
    mobilePageSize,
    pagination,
    ...rest
  } = props;

  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // ================= MOBILE VIEW =================
  if (isMobile) {
    return <MobileCard {...props} />;
  }

  // ================= DESKTOP VIEW =================
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      loading={loading}
      pagination={pagination}
      locale={{
        emptyText: <Empty />,
      }}
      {...rest}
    />
  );
}

function MobileCard<T extends Record<string, unknown>>(props: ResponsiveTableProps<T>) {
  const {
    columns,
    dataSource,
    rowKey,
    loading,
    mobileRender,
    loadingRows = 5,
    mobilePageSize = 5,
    pagination,
  } = props;

  const current = typeof pagination === 'object' && pagination.current ? pagination.current : 1;

  const pageSize =
    typeof pagination === 'object' && pagination.pageSize ? pagination.pageSize : mobilePageSize;

  const total =
    typeof pagination === 'object' && pagination.total ? pagination.total : dataSource.length;

  // filter columns for mobile
  const mobileColumns = useMemo(() => columns.filter((col) => !col.hideOnMobile), [columns]);

  // pagination for mobile
  const mobileData = useMemo(() => {
    const start = (current - 1) * pageSize;
    return dataSource.slice(start, start + pageSize);
  }, [dataSource, current, pageSize]);

  if (loading) {
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        {Array.from({ length: loadingRows }).map((_, i) => (
          <Card key={i}>
            <Skeleton active paragraph={{ rows: 3 }} />
          </Card>
        ))}
      </Space>
    );
  }

  if (!dataSource.length) {
    return <Empty />;
  }

  return (
    <>
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        {mobileData.map((record, index) => {
          const key = typeof rowKey === 'function' ? rowKey(record) : String(record[rowKey]);

          if (mobileRender) {
            return (
              <Card key={key} size="small">
                {mobileRender(record, index)}
              </Card>
            );
          }

          return (
            <Card key={key} size="small">
              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                {mobileColumns.map((col) => {
                  const value = col.dataIndex !== undefined ? record[col.dataIndex] : undefined;

                  return (
                    <div key={String(col.key || col.dataIndex)}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {col.title}
                      </Text>
                      <div>{renderCell(col, value, record, index)}</div>
                    </div>
                  );
                })}
              </Space>
            </Card>
          );
        })}
      </Space>
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          size="small"
          onChange={(page, size) => {
            if (typeof pagination === 'object' && pagination.onChange) {
              pagination.onChange(page, size || pageSize);
            }
          }}
        />
      </div>
    </>
  );
}

function renderCell<T>(
  col: ExtendedColumn<T>,
  value: unknown,
  record: T,
  index: number,
): React.ReactNode {
  if (!col.render) return String(value ?? '-');

  const result = col.render(value, record, index);

  // handle RenderedCell
  if (typeof result === 'object' && result !== null && 'children' in result) {
    return result.children;
  }

  return result;
}
