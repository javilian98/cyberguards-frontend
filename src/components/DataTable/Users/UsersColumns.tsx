import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useUserStore } from "@/stores/useUserStore";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { ROLE_ID, UserListItem } from "@/types/types";
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

export const renderRoleTagStyles = (roleId: ROLE_ID) => {
  const baseStyles = "font-medium ";
  switch (roleId.toString()) {
    case ROLE_ID.normal.toString():
      return baseStyles + "text-green-500 border-green-500";
    case ROLE_ID.analyst.toString():
      return baseStyles + "text-orange-500 border-orange-500";
    case ROLE_ID.admin.toString():
      return baseStyles + "text-blue-500 font-medium border-blue-500";
    default:
      throw new Error(`Unknown status: ${roleId}`);
  }
};

export const renderRoleTag = (roleId: ROLE_ID) => {
  switch (roleId.toString()) {
    case ROLE_ID.normal.toString():
      return <span className={renderRoleTagStyles(roleId)}>Normal</span>;
    case ROLE_ID.analyst.toString():
      return <span className={renderRoleTagStyles(roleId)}>Analyst</span>;
    case ROLE_ID.admin.toString():
      return <span className={renderRoleTagStyles(roleId)}>Admin</span>;
    default:
      throw new Error(`Unknown status: ${roleId}`);
  }
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
    cell: ({ row }) => {
      const { selectedUsers, setSelectedUsers } = useUserStore.getState();

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);

            if (row.getIsSelected()) {
              const newSelectedUsers = selectedUsers.filter(
                (item) => item.id !== row.original.id
              );
              setSelectedUsers(newSelectedUsers);
            } else {
              setSelectedUsers([...selectedUsers, row.original]);
            }
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => renderSortButton(column, "First Name"),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => renderSortButton(column, "Last Name"),
  },
  // {
  //   accessorKey: "profession",
  //   header: ({ column }) => renderSortButton(column, "Profession"),
  // },
  // {
  //   accessorKey: "riskScore",
  //   header: ({ column }) => renderSortButton(column, "Risk Score"),
  //   cell: ({ row }) => (
  //     <div className="text-left">{row.getValue("riskScore")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "roleId",
  //   header: ({ column }) => renderSortButton(column, "Role"),
  //   cell: ({ row }) => (
  //     <div className="text-left">{renderRoleTag(row.getValue("roleId"))}</div>
  //   ),
  // },
  // {
  //   accessorKey: "suspectCaseId",
  //   header: ({ column }) => renderSortButton(column, "Total Cases Handed"),
  //   cell: ({ row }) => (
  //     <div className="text-center">{row.getValue("suspectCaseId")}</div>
  //   ),
  // },

  {
    id: "actions",
    cell: ({ row }) => <ActionsMenu row={row} />,
  },
];
