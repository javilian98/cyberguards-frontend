// import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
// import { useUserStore } from "@/stores/useUserStore";

import {
  LuEye,
  LuMoreHorizontal,
  // LuPencilLine,
  // LuTrash2,
} from "react-icons/lu";

import { EmployeeListItem } from "@/types/types";
import { Row } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// import { useThreatStore } from "@/stores/useThreatStore";

interface ActionsMenuProps {
  row: Row<EmployeeListItem>;
}
function ActionsMenu({ row }: ActionsMenuProps) {
  // const setCurrentSelectedEmployee = useThreatStore(
  //   (state) => state.setCurrentSelectedEmployee
  // );
  // const setSingleRowActionDialogOpen = useAlertDialogStore(
  //   (state) => state.setSingleRowActionDialogOpen
  // );
  const navigate = useNavigate();

  const handleViewEmployee = () => {
    // setCurrentSelectedEmployee(row.original);
    navigate(`/threats/employee/${row.original.id}`);
  };

  // const handleEditUser = () => {
  //   setCurrentSelectedUser(row.original);
  //   navigate(`/users/edit/${row.original.id}`);
  // };

  // const handleDeleteDialogVisibility = () => {
  //   setCurrentSelectedUser(row.original);
  //   setSingleRowActionDialogOpen(true);
  // };

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
        <DropdownMenuItem onClick={handleViewEmployee}>
          <LuEye className="w-4 h-4 mr-2" />
          View Employee
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={handleEditUser}>
          <LuPencilLine className="w-4 h-4 mr-2" />
          Edit Employee
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem
          className="text-red-600"
          onClick={handleDeleteDialogVisibility}
        >
          <LuTrash2 className="w-4 h-4 mr-2" />
          Delete User
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsMenu;
