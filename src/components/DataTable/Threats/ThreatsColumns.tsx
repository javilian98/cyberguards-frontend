import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";

// import { useUserStore } from "@/stores/useUserStore";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { EmployeeListItem, ROLE_ID } from "@/types/types";
import ActionsMenu from "@/components/DataTable/Threats/ActionsMenu";

const renderSortButton = (
  column: Column<EmployeeListItem>,
  columnName: string
) => {
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

export const threatsColumns: ColumnDef<EmployeeListItem>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => {
  //     const { users, setSelectedUsers } = useUserStore.getState();

  //     return (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => {
  //           table.toggleAllPageRowsSelected(!!value);

  //           if (table.getIsAllPageRowsSelected()) {
  //             setSelectedUsers([]);
  //           } else {
  //             setSelectedUsers(users);
  //           }
  //         }}
  //         aria-label="Select all"
  //       />
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const { selectedUsers, setSelectedUsers } = useUserStore.getState();

  //     return (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => {
  //           row.toggleSelected(!!value);
  //         }}
  //         aria-label="Select row"
  //       />
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "firstName",
    header: ({ column }) => renderSortButton(column, "First Name"),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => renderSortButton(column, "Last Name"),
  },
  {
    accessorKey: "businessUnit",
    header: ({ column }) => renderSortButton(column, "Business Unit"),
  },
  {
    accessorKey: "riskScore",
    header: ({ column }) => renderSortButton(column, "Overall Risk (%)"),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("riskScore")}</div>
    ),
  },
  {
    accessorKey: "totalOffences",
    header: ({ column }) => renderSortButton(column, "No. of Offences"),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("totalOffences")}</div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <ActionsMenu row={row} />,
  },
];
