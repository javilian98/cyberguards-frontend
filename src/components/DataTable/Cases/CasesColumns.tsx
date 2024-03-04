import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useCaseStore } from "@/stores/useCaseStore";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { CASE_STATUS, Case } from "@/types/types";

import ActionsMenu from "@/components/DataTable/Cases/ActionsMenu";

const renderSortButton = (column: Column<Case>, columnName: string) => {
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

// Function to convert enum value to string
export const computeStatusString = (status: CASE_STATUS): string => {
  switch (status.toString()) {
    case CASE_STATUS.open.toString():
      return "Open";
    case CASE_STATUS.assigned.toString():
      return "Assigned";
    case CASE_STATUS.inProgress.toString():
      return "In-Progress";
    case CASE_STATUS.closed.toString():
      return "Closed";
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

export const renderStatusColor = (status: CASE_STATUS) => {
  const baseStyles = "font-medium ";
  switch (status.toString()) {
    case CASE_STATUS.open.toString():
      return baseStyles + "text-green-500 border-green-500";
    case CASE_STATUS.assigned.toString():
      return baseStyles + "text-orange-500 border-orange-500";
    case CASE_STATUS.inProgress.toString():
      return baseStyles + "text-blue-500 font-medium border-blue-500";
    case CASE_STATUS.closed.toString():
      return baseStyles + "text-gray-500 border-gray-500";
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

export const casesColumns: ColumnDef<Case>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const { cases, setSelectedCases } = useCaseStore.getState();

      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);

            if (table.getIsAllPageRowsSelected()) {
              setSelectedCases([]);
            } else {
              setSelectedCases(cases);
            }
          }}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => {
      const { selectedCases, setSelectedCases } = useCaseStore.getState();

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);

            if (row.getIsSelected()) {
              const newSelectedCases = selectedCases.filter(
                (item) => item.id !== row.original.id
              );
              setSelectedCases(newSelectedCases);
            } else {
              setSelectedCases([...selectedCases, row.original]);
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
    accessorKey: "caseStatus",
    header: ({ column }) => renderSortButton(column, "Case Status"),
    cell: ({ row }) => {
      const status = row.getValue("caseStatus") as CASE_STATUS;
      return (
        <span
          className={`border rounded-sm py-1 px-2 ${renderStatusColor(status)}`}
        >
          {computeStatusString(status)}
        </span>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => renderSortButton(column, "Case Title"),
  },
  {
    accessorKey: "riskStatus",
    header: ({ column }) => renderSortButton(column, "Risk Status"),
  },
  {
    accessorKey: "riskScore",
    header: ({ column }) => renderSortButton(column, "Risk Score"),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => renderSortButton(column, "Case Date Time"),
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => renderSortButton(column, "Assignee"),
  },
  // {
  //   accessorKey: "assignedDateTime",
  //   header: ({ column }) => renderSortButton(column, "Assigned Date Time"),
  // },
  {
    id: "actions",
    cell: ({ row }) => <ActionsMenu row={row} />,
  },
];
