import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import {
  PCAccessLogAPIResponse,
  // PCAccessLogs
} from "@/types/types";

// const renderSortButton = (column: Column<PCAccessLogs>, columnName: string) => {
const renderSortButton = (
  column: Column<PCAccessLogAPIResponse>,
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

// export const pcAccessColumns: ColumnDef<PCAccessLogs>[] = [
export const pcAccessColumns: ColumnDef<PCAccessLogAPIResponse>[] = [
  {
    accessorKey: "access_date_time",
    header: ({ column }) => renderSortButton(column, "Access Date Time"),
  },
  {
    accessorKey: "log_on_off",
    header: ({ column }) => renderSortButton(column, "Log On/Off"),
  },
  {
    accessorKey: "machine_name",
    header: ({ column }) => renderSortButton(column, "Machine Name"),
  },
  {
    accessorKey: "machine_location",
    header: ({ column }) => renderSortButton(column, "Machine Location"),
  },
  // {
  //   accessorKey: "suspect_type",
  //   header: ({ column }) => renderSortButton(column, "Suspect"),
  // },
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
