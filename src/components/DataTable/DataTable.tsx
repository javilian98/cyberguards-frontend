import { useState, useEffect } from "react";

import {
  Cell,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { DataTablePagination } from "@/components/DataTable/DataTablePagination";
import { LuChevronDown, LuTrash2 } from "react-icons/lu";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actionDelete?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  actionDelete,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const isMultipleRowsActionDialogOpen = useAlertDialogStore(
    (state) => state.isMultipleRowsActionDialogOpen
  );
  const setMultipleRowsActionDialogOpen = useAlertDialogStore(
    (state) => state.setMultipleRowsActionDialogOpen
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  useEffect(() => {
    // Reset row selection whenever data changes
    table.resetRowSelection();
  }, [data, table]);

  const isCellEmpty = (cell: Cell<TData, unknown>) => {
    return (
      !cell.id.includes("_select") &&
      !cell.id.includes("_actions") &&
      cell.getValue() == null
    );
  };

  const renderCellValue = (cell: Cell<TData, unknown>) => {
    if (isCellEmpty(cell)) {
      return "Unassigned";
    }

    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <>
      <div>
        <div className="inline-flex items-center gap-4 mt-6 mb-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
                disabled={table.getFilteredSelectedRowModel().rows.length === 0}
              >
                Action
                <LuChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setMultipleRowsActionDialogOpen(true)}
              >
                <LuTrash2 className="mr-2 h-4 w-4" />
                <span>Delete Rows</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={isCellEmpty(cell) ? "text-red-500" : ""}
                      >
                        {renderCellValue(cell)}
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <DataTablePagination table={table} />
        </div>
      </div>

      <AlertDialog
        open={isMultipleRowsActionDialogOpen}
        onOpenChange={() => setMultipleRowsActionDialogOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete these selected rows?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              case.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setMultipleRowsActionDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={actionDelete}>
              Delete Rows
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
