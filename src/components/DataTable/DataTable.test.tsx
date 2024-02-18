import { DataTable } from "@/components/DataTable/DataTable";
import { render, screen } from "@/utils/test-utils";
import { ColumnDef } from "@tanstack/react-table";

interface RowType {
  id: string;
  title: string;
  riskStatus: string;
}

describe("DataTable component", async () => {
  const columns: ColumnDef<RowType>[] = [
    {
      header: "id",
      accessorKey: "id",
      // cell: (row: Row<RowType>) => row.original?.id,
    },
    {
      header: "title",
      accessorKey: "title",
      // cell: (row: Row<RowType>) => row.original?.title,
    },
    {
      header: "riskStatus",
      accessorKey: "riskStatus",
      // cell: (row: Row<RowType>) => row.original?.riskStatus,
    },
  ];

  const dataRows: RowType[] = [
    {
      id: "abcde",
      title: "title 1",
      riskStatus: "low",
    },
  ];

  it("renders no results message if data is empty", () => {
    const table = <DataTable columns={columns} data={[]} />;
    render(table);

    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("DataTable component renders table with data", () => {
    render(<DataTable columns={columns} data={dataRows} />);

    expect(screen.getByText(/abcde/i)).toBeInTheDocument();
    expect(screen.getByText(/title 1/i)).toBeInTheDocument();
    expect(screen.getByText(/low/i)).toBeInTheDocument();
  });
});