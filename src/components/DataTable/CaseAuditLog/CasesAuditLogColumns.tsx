import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { CaseAuditLogs } from "@/types/types";

const renderSortButton = (
  column: Column<CaseAuditLogs>,
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

export const caseAuditLogColumns: ColumnDef<CaseAuditLogs>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => {
  //     const { cases, setSelectedCases } = useCaseStore.getState();

  //     return (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => {
  //           table.toggleAllPageRowsSelected(!!value);

  //           if (table.getIsAllPageRowsSelected()) {
  //             setSelectedCases([]);
  //           } else {
  //             setSelectedCases(cases);
  //           }
  //         }}
  //         aria-label="Select all"
  //       />
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const { selectedCases, setSelectedCases } = useCaseStore.getState();

  //     return (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => {
  //           row.toggleSelected(!!value);

  //           if (row.getIsSelected()) {
  //             const newSelectedCases = selectedCases.filter(
  //               (item) => item.id !== row.original.id
  //             );
  //             setSelectedCases(newSelectedCases);
  //           } else {
  //             setSelectedCases([...selectedCases, row.original]);
  //           }
  //         }}
  //         aria-label="Select row"
  //       />
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "caseAction",
    header: ({ column }) => renderSortButton(column, "Case Action"),
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => renderSortButton(column, "Assignee"),
    cell: ({ row }) => {
      const cellValue: string | null | undefined =
        row.getValue("assignee") != null
          ? row.getValue("assignee")
          : "Unassigned";

      return (
        <span className={cellValue == "Unassigned" ? "text-red-500" : ""}>
          {cellValue}
        </span>
      );
    },
  },
  {
    accessorKey: "caseId",
    header: ({ column }) => renderSortButton(column, "Case ID"),
    // cell: ({ row }) => {
    //   const status = row.getValue("caseStatus") as CASE_STATUS;
    //   return (
    //     <span
    //       className={`border rounded-sm py-1 px-2 ${renderStatusColor(status)}`}
    //     >
    //       {computeStatusString(status)}
    //     </span>
    //   );
    // },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => renderSortButton(column, "Log Date Time"),
  },
  // {
  //   accessorKey: "assignedDateTime",
  //   header: ({ column }) => renderSortButton(column, "Assigned Date Time"),
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <ActionsMenu row={row} />,
  // },
];
