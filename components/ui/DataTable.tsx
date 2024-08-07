"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  filterInput?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterInput,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <>
      <div className="flex lg:flex-row flex-col justify-between text-md text-slate-600  lg:items-center py-4">
        {filterInput && (
          <Input
            placeholder={`Search by ${filterInput}`}
            value={
              (table.getColumn(filterInput)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(filterInput)?.setFilterValue(event.target.value)
            }
            className="max-w-sm placeholder:capitalize focus-visible:ring-sky-400"
          />
        )}
        <Select onValueChange={(v) => table.setPageSize(Number(v))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              className="placeholder-gray-100 text-gray-100"
              placeholder={`${table.getState().pagination.pageSize} entries`}
            />
          </SelectTrigger>
          <SelectContent>
            {[3, 5, 10, 20].map((pageSize) => (
              <SelectItem value={pageSize.toString()} key={pageSize}>
                {`${pageSize} entries `}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border border-sky-200 shadow-sm">
        <Table className="overflow-auto ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-700 animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-2 h-2 rounded-full bg-neutral-100 animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce [animation-delay:.7s]"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 px-2 py-4">
          <span className="text-slate-500 ">
            Page{" "}
            <span className="text-black font-semibold dark:text-sky-100">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of{" "}
            <span className="text-black font-semibold dark:text-sky-100">
              {table.getPageCount()}
            </span>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
