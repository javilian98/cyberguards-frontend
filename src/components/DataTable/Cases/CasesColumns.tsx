import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useCaseStore } from "@/stores/useCaseStore";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { Case } from "@/types/types";

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
    accessorKey: "id",
    header: "Case ID",
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
