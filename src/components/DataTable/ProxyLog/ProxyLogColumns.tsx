import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { ProxyLogAPIResponse, ProxyLogs } from "@/types/types";

// const renderSortButton = (column: Column<ProxyLogs>, columnName: string) => {
const renderSortButton = (
  column: Column<ProxyLogAPIResponse>,
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

// export const proxyLogColumns: ColumnDef<ProxyLogs>[] = [
export const proxyLogColumns: ColumnDef<ProxyLogAPIResponse>[] = [
  {
    accessorKey: "access_date_time",
    header: ({ column }) => renderSortButton(column, "Access Date Time"),
  },
  {
    accessorKey: "machine_name",
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
    accessorKey: "bytes_in",
    header: ({ column }) => renderSortButton(column, "Bytes In"),
  },
  {
    accessorKey: "bytes_out",
    header: ({ column }) => renderSortButton(column, "Bytes Out"),
  },
  // {
  //   accessorKey: "suspect_type",
  //   header: ({ column }) => renderSortButton(column, "Suspect"),
  // },
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
