import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { ProxyLogs } from "@/types/types";

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
    accessorKey: "accessDateTime",
    header: ({ column }) => renderSortButton(column, "Access Date Time"),
  },
  {
    accessorKey: "machineName",
    header: ({ column }) => renderSortButton(column, "Machine Name"),
  },
  {
    accessorKey: "url",
    header: ({ column }) => renderSortButton(column, "URL"),
  },
  {
    accessorKey: "category",
    header: ({ column }) => renderSortButton(column, "Category"),
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
    accessorKey: "suspectType",
    header: ({ column }) => renderSortButton(column, "Suspect"),
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { setCurrentSelectedLog, currentSelectedEmployee } = useThreatStore.getState();

  //     return (
  //       <div>
  //         <Button asChild variant="outline">
  //           <Link
  //             to={`/threats/employee/${currentSelectedEmployee?.id}/proxy/${row.original.logId}`}
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
