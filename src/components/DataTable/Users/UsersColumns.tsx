import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useUserStore } from "@/stores/useUserStore";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { UserListItem } from "@/types/types";
import ActionsMenu from "@/components/DataTable/Users/ActionsMenu";

const renderSortButton = (column: Column<UserListItem>, columnName: string) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {columnName}
      <LuArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const usersColumns: ColumnDef<UserListItem>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const { users, setSelectedUsers } = useUserStore.getState();

      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);

            if (table.getIsAllPageRowsSelected()) {
              setSelectedUsers([]);
            } else {
              setSelectedUsers(users);
            }
          }}
          aria-label="Select all"
        />
      );
    },
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
    accessorKey: "firstName",
    header: ({ column }) => renderSortButton(column, "Username"),
  },
  {
    accessorKey: "employeeType",
    header: ({ column }) => renderSortButton(column, "Employee Type"),
  },
  {
    accessorKey: "riskScore",
    header: ({ column }) => renderSortButton(column, "Employee Type"),
  },
  {
    accessorKey: "lastAccessAt",
    header: ({ column }) => renderSortButton(column, "Last Access Date"),
  },
  {
    accessorKey: "suspectType",
    header: ({ column }) => renderSortButton(column, "Current Suspect Type"),
  },

  {
    id: "actions",
    cell: ({ row }) => <ActionsMenu row={row} />,
  },
];
