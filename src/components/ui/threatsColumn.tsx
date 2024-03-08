// threatsColumns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmployeeListItem } from "@/types/types";

export type Threat = {
  username: string;
  recent_risk: number;
  overall_risk: number;
};

export const threats: Threat[] = [
  {
    username: "Haiyang",
    recent_risk: 9,
    overall_risk: 72,
  },
  {
    username: "Javier",
    recent_risk: 0,
    overall_risk: 8,
  },
  // ...more data
];

export const threatColumns: ColumnDef<EmployeeListItem>[] = [
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
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "recent_risk",
    header: "Recent Risk",
  },
  {
    accessorKey: "overall_risk",
    header: "Overall Risk",
  },
  {
    accessorKey: "overall_risk",
    header: "Offences",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const threat = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => alert(`Username: ${threat.username}`)}
            >
              Copy username
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View threat details</DropdownMenuItem>
            // ... other items
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  // ...any additional columns
];
