import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useCaseStore } from "@/stores/useCaseStore";
import { Column, ColumnDef } from "@tanstack/react-table";
import {
  LuArrowUpDown,
  LuEye,
  LuMoreHorizontal,
  LuPencilLine,
  LuTrash2,
} from "react-icons/lu";
import { Case } from "@/types/types";

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
    cell: ({ row }) => {
      const { currentSelectedCase, setCurrentSelectedCase } =
        useCaseStore.getState();

      const { setSingleRowActionDialogOpen } = useAlertDialogStore.getState();

      const handleDeleteDialogVisibility = () => {
        setCurrentSelectedCase(row.original);
        setSingleRowActionDialogOpen(true);

        console.log(currentSelectedCase);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <LuMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <LuEye className="w-4 h-4 mr-2" />
              View Case
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LuPencilLine className="w-4 h-4 mr-2" />
              Edit Case
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={handleDeleteDialogVisibility}
            >
              <LuTrash2 className="w-4 h-4 mr-2" />
              Delete Case
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
