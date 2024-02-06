import { DataTable } from "@/components/DataTable/DataTable";
import Search from "@/components/Search/Search";

import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Column, ColumnDef } from "@tanstack/react-table";

import { LuArrowUpDown, LuMoreHorizontal, LuPlus } from "react-icons/lu";
import FixedHeader from "@/components/Layouts/Header/FixedHeader";
import { Link } from "react-router-dom";

interface Case {
  id: string;
  title: string;
  riskStatus: "low" | "medium" | "high";
  riskScore: number;
  caseDateTime: string;
  assignee: string;
  assignedDateTime: string;
}

const allCases: Case[] = [
  {
    id: "728ed52f",
    title: "Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 72,
    caseDateTime: "21 Jan 2024, 2:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "21 Jan 2024, 3:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 69,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 8,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 62,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 32,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 29,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 3,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 14,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 85,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 33,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 42,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 23,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
];

const myCases: Case[] = [
  {
    id: "728ed52f",
    title: "Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 72,
    caseDateTime: "21 Jan 2024, 2:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "21 Jan 2024, 3:00pm",
  },
  {
    id: "728ed52g",
    title: "The Potential Threat From Frequent “After Hour Login",
    riskStatus: "high",
    riskScore: 69,
    caseDateTime: "23 Jan 2024, 8:30pm",
    assignee: "Chris Tan",
    assignedDateTime: "25 Jan 2024, 5:00pm",
  },
];

const columns: ColumnDef<Case>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
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
    accessorKey: "caseDateTime",
    header: ({ column }) => renderSortButton(column, "Case Date Time"),
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => renderSortButton(column, "Assignee"),
  },
  {
    accessorKey: "assignedDateTime",
    header: ({ column }) => renderSortButton(column, "Assigned Date Time"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

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

function Cases() {
  return (
    <>
      <FixedHeader>
        <Search placeholderText="Search for a case" drawerTitle="Filter Cases">
          asd
        </Search>
        <Link to="/cases/create">
          <Button>
            <LuPlus className="w-5 h-5 mr-2 text-white" />
            Create Case
          </Button>
        </Link>
      </FixedHeader>
      <Tabs defaultValue="all cases" className="mt-20">
        <TabsList>
          <TabsTrigger value="all cases" className="w-[200px]">
            All Cases
          </TabsTrigger>
          <TabsTrigger value="my cases" className="w-[200px]">
            My Cases
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all cases" className="mt-4">
          <DataTable columns={columns} data={allCases} />
        </TabsContent>
        <TabsContent value="my cases">
          <DataTable columns={columns} data={myCases} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Cases;
