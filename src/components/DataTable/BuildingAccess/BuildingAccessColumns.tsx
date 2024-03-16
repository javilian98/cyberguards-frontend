import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { BuildingAccessLogs } from "@/types/types";

import { Link } from "react-router-dom";
import { useThreatStore } from "@/stores/useThreatStore";

const renderSortButton = (
  column: Column<BuildingAccessLogs>,
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

export const buildingAccessColumns: ColumnDef<BuildingAccessLogs>[] = [
  {
    accessorKey: "accessDateTime",
    header: ({ column }) => renderSortButton(column, "Access Date Time"),
  },
  {
    accessorKey: "direction",
    header: ({ column }) => renderSortButton(column, "Direction"),
  },
  {
    accessorKey: "status",
    header: ({ column }) => renderSortButton(column, "Status"),
  },
  {
    accessorKey: "officeLocation",
    header: ({ column }) => renderSortButton(column, "Office Location"),
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
  //             to={`/threats/employee/${currentSelectedEmployee?.id}/buildingaccess/${row.original.logId}`}
  //             onClick={() => {
  //               setCurrentSelectedLog(row.original);
  //             }}
  //           >
  //             View
  //           </Link>
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
