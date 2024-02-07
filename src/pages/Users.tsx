import * as React from "react";
import {
  LuArrowUpDown,
  LuMoreHorizontal,
  LuChevronDown,
  LuPlus,
} from "react-icons/lu";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Search from "@/components/Search/Search";

const data: UserInfo[] = [
  {
    id: "m5gr84i9",
    username:"Kennyboi",
    employeeType: "Software Engineer",
    risk: 0.73,
    lastAccessDate: "21 Jan 2023",
    lastAccessLocation: "Australia",
    email: "ken99@yahoo.com",
    website: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "3u1reuv4",
    username:"Abebe",
    employeeType: "Human Resource",
    risk: 0.45,
    lastAccessDate: "28 Feb 2022",
    lastAccessLocation: "Singapore",
    email: "Abe45@gmail.com",
    website: "https://www.youtube.com/watch?v=lDK9QqIzhwk",
  },
  {
    id: "derv1ws0",
    username:"Monserati",
    employeeType: "Software Engineer",
    risk: 0.29,
    lastAccessDate: "1 Sep 2022",
    lastAccessLocation: "India",
    email: "Monserrat44@gmail.com",
    website: "https://twitter.com/MIT_CSAIL/status/1363172815315214336?lang=en",
  },
  {
    id: "5kma53ae",
    username:"Silats",
    employeeType: "UI/UX Designer",
    risk: 0.89,
    lastAccessDate: "21 Oct 2022",
    lastAccessLocation: "Sweden",
    email: "Silas22@gmail.com",
    website: "https://www.facebook.com/gmail.net21/videos/never-gonna-give-you-up-rick-astley/471344660006374/",
  },
  {
    id: "bhqecj4p",
    username:"Caramel",
    employeeType: "Accountant",
    risk: 0.04,
    lastAccessDate: "21 Jan 2022",
    lastAccessLocation: "Malaysia",
    email: "carmella@hotmail.com",
    website: "https://www.youtube.com/watch?v=xc_0wfIuuzw",
  },
];

type UserInfo = {
  id: string;
  username: string,
  employeeType: string;
  risk: number, 
  lastAccessDate: string,
  lastAccessLocation: string,
  email: string,
  website: String;
};

const columns: ColumnDef<UserInfo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <LuArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("username")}
      </div>
    ),
  },   
  {
    accessorKey: "employeeType",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          EmployeeType
          <LuArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("employeeType")}
      </div>
    ),
  },   
  {
    accessorKey: "risk",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Risk
          <LuArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const risk = parseFloat(row.getValue("risk"));
  
      // Convert decimal to percentage
      const riskPercentage = (risk * 100).toFixed(0);
  
      return (
        <div className="text-center font-medium">
          {riskPercentage}%
        </div>
      );
    },
  }, 
  {
    accessorKey: "lastAccessDate",
    header: "Last Access Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastAccessDate")}</div>
    ),
  },
  {
    accessorKey: "lastAccessLocation",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Access Location
          <LuArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("lastAccessLocation")}
      </div>
    ),
  },   
  {
    accessorKey: "website",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Website
        <LuArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
    cell: ({ row }) => {
      const website = row.getValue("website");
      const truncatedWebsite = typeof website === 'string' && website.length > 30
        ? `${website.slice(0, 30)}...`
        : website as string;
    
      return <div className="lowercase">{truncatedWebsite}</div>;
    },
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function Users() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <Search placeholderText="Search for a user" drawerTitle="Filter Users">
          asd
        </Search>
        <Button>
          <LuPlus className="w-5 h-5 mr-2 text-white" />
          Create Case
        </Button>
      </div>
      <div className=" py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Actions
              <LuChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="block">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  );
}
export default Users;
