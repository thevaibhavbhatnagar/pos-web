"use client";

import React from "react";
import { EmptyState, Pagination, Table } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Inbox } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  renderCell?: (item: T, rowIndex?: number) => React.ReactNode;
}

export interface Props<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  topContent?: React.ReactNode;
  pagination?: {
    page: number;
    totalPages: number;
    rowsPerPage?: number;
    totalItems?: number;
  };
  emptyContent?: React.ReactNode;
  wrapperClassName?: string;
  bottomContent?: React.ReactNode;
}

export const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  topContent,
  pagination,
  emptyContent = "No data found",
  wrapperClassName = "max-h-[520px]",
  bottomContent,
}: Props<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const start =
    pagination &&
    (pagination.page - 1) * (pagination.rowsPerPage || 10) + 1;

  const end =
    pagination &&
    Math.min(
      pagination.page * (pagination.rowsPerPage || 10),
      pagination.totalItems || 0,
    );

  return (
    <div className="w-full space-y-4">
      {topContent}
      <div className={`h-[520px] flex flex-col ${wrapperClassName}`}>
        <Table variant="secondary" className="min-w-full h-full flex flex-col">
          <Table.ScrollContainer className="flex-1 overflow-y-auto">
            <Table.Content aria-label="Data table" >
              <Table.Header className="sticky top-0 z-20">
                {columns.map((column, index) => (
                  <Table.Column
                    key={String(column.key)}
                    id={String(column.key)}
                    isRowHeader={index === 0}
                    className="font-semibold  uppercase !rounded-none first:!rounded-none last:!rounded-none bg-primary/10 text-field-foreground"
                  >
                    {column.label}
                  </Table.Column>
                ))}
              </Table.Header>

              <Table.Body
                items={data}
                renderEmptyState={() => (
                  <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                    <Inbox className="size-6 text-muted" />
                    <span className="text-sm text-muted">No results found</span>
                  </EmptyState>
                )}
              >
                {(item) => {
                  const rowIndex = data.findIndex((row) => row.id === item.id);

                  return (
                    <Table.Row
                      id={item.id}
                    >
                      {columns.map((column) => (
                        <Table.Cell key={String(column.key)} >
                          {column.key === "srNo"
                            ? ((pagination?.page || 1) - 1) *
                            (pagination?.rowsPerPage || 10) +
                            (rowIndex + 1)
                            : column.renderCell
                              ? column.renderCell(item, rowIndex)
                              : (item as any)[column.key]}
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  );
                }}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          {pagination && (
            <Table.Footer className="sticky bottom-0 z-20 border-t">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-default-500">
                  {start} to {end} of {pagination.totalItems || 0} results
                </div>

                <div className="flex items-center justify-end">
                  <div className="flex items-center justify-end">
                    <Pagination size="sm">
                      <Pagination.Content>
                        {/* Previous */}
                        <Pagination.Item>
                          <Pagination.Previous
                            isDisabled={pagination.page === 1}
                            onPress={() => changePage(pagination.page - 1)}
                          >
                            <span className="px-2 py-1">Prev</span>
                          </Pagination.Previous>
                        </Pagination.Item>

                        {/* Page Numbers */}
                        {Array.from(
                          { length: pagination.totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <Pagination.Item key={page}>
                            <Pagination.Link
                              isActive={page === pagination.page}
                              onPress={() => changePage(page)}
                            >
                              <span className="px-2 py-1">{page}</span>
                            </Pagination.Link>
                          </Pagination.Item>
                        ))}

                        {/* Next */}
                        <Pagination.Item>
                          <Pagination.Next
                            isDisabled={pagination.page === pagination.totalPages}
                            onPress={() => changePage(pagination.page + 1)}
                          >
                            <span className="px-2 py-1">Next</span>
                          </Pagination.Next>
                        </Pagination.Item>
                      </Pagination.Content>
                    </Pagination>
                  </div>
                </div>
              </div>

              {bottomContent}
            </Table.Footer>
          )}
        </Table>
      </div>
    </div>
  );
};