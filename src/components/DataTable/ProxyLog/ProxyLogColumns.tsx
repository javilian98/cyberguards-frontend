import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useCaseStore } from "@/stores/useCaseStore";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { ProxyLogs } from "@/types/types";
import { Link } from "react-router-dom";
import { useThreatStore } from "@/stores/useThreatStore";

const renderSortButton = (column: Column<ProxyLogs>, columnName: string) => {
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

export const proxyLogColumns: ColumnDef<ProxyLogs>[] = [
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
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "accessDateTime",
    header: ({ column }) => renderSortButton(column, "Access Date Time"),
  },
  {
    accessorKey: "bytesIn",
    header: ({ column }) => renderSortButton(column, "Bytes In"),
  },
  {
    accessorKey: "bytesOut",
    header: ({ column }) => renderSortButton(column, "Bytes Out"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { setCurrentSelectedLog, currentSelectedEmployee } = useThreatStore.getState();

      return (
        <div>
          <Button asChild variant="outline">
            <Link
              to={`/threats/employee/${currentSelectedEmployee?.id}/proxy/${row.original.logId}`}
              onClick={() => setCurrentSelectedLog(row.original)}
            >
              View
            </Link>
          </Button>
        </div>
      );
    },
  },
];
