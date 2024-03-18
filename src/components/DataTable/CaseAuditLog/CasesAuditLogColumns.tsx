import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown, LuExternalLink } from "react-icons/lu";
import { CaseAuditLog } from "@/types/types";
import { Link } from "react-router-dom";

const renderSortButton = (
  column: Column<CaseAuditLog>,
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

export const caseAuditLogColumns: ColumnDef<CaseAuditLog>[] = [
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
    accessorKey: "action",
    header: ({ column }) => renderSortButton(column, "Case Action"),
  },
  {
    accessorKey: "edits",
    header: ({ column }) => renderSortButton(column, "Case Edits"),
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
    cell: ({ row }) => {
      return (
        // <span
        //   className={`border rounded-sm py-1 px-2 ${renderStatusColor(status)}`}
        // >
        //   {computeStatusString(status)}
        // </span>
        <Button type="button" variant="link" asChild>
          <Link to={`/cases/${row.getValue("caseId")}`}>
            <LuExternalLink className="mr-2" />
            {row.getValue("caseId")}
          </Link>
        </Button>
      );
    },
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
