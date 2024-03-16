import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { PCAccessLogs } from "@/types/types";
import { useThreatStore } from "@/stores/useThreatStore";
import { Link } from "react-router-dom";

const renderSortButton = (column: Column<PCAccessLogs>, columnName: string) => {
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

export const pcAccessColumns: ColumnDef<PCAccessLogs>[] = [
  {
    accessorKey: "accessDateTime",
    header: ({ column }) => renderSortButton(column, "Access Date Time"),
  },
  {
    accessorKey: "logOnOff",
    header: ({ column }) => renderSortButton(column, "Log On/Off"),
  },
  {
    accessorKey: "machineName",
    header: ({ column }) => renderSortButton(column, "Machine Name"),
  },
  {
    accessorKey: "machineLocation",
    header: ({ column }) => renderSortButton(column, "Machine Location"),
  },
  {
    accessorKey: "suspectType",
    header: ({ column }) => renderSortButton(column, "Suspect"),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { setCurrentSelectedLog, currentSelectedEmployee } =
  //       useThreatStore.getState();

  //     return (
  //       <div>
  //         <Button asChild variant="outline">
  //           <Link
  //             to={`/threats/employee/${currentSelectedEmployee?.id}/pcaccess/${row.original.logId}`}
  //             onClick={() => setCurrentSelectedLog(row.original)}
  //           >
  //             View
  //           </Link>
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
