import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useUserStore } from "@/stores/useUserStore";

import { LuMoreHorizontal, LuPencilLine, LuTrash2 } from "react-icons/lu";

import { UserListItem } from "@/types/types";
import { Row } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ActionsMenuProps {
  row: Row<UserListItem>;
}
function ActionsMenu({ row }: ActionsMenuProps) {
  const setCurrentSelectedUser = useUserStore(
    (state) => state.setCurrentSelectedUser
  );
  const setSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.setSingleRowActionDialogOpen
  );
  const navigate = useNavigate();

  // const handleViewUser = () => {
  //   setCurrentSelectedUser(row.original);
  //   navigate(`/users/${row.original.id}`);
  // };

  const handleEditUser = () => {
    setCurrentSelectedUser(row.original);
    navigate(`/users/edit/${row.original.id}`);
  };

  const handleDeleteDialogVisibility = () => {
    setCurrentSelectedUser(row.original);
    setSingleRowActionDialogOpen(true);
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
        {/* <DropdownMenuItem onClick={handleViewUser}>
          <LuEye className="w-4 h-4 mr-2" />
          View Analyst
        </DropdownMenuItem> */}
        <DropdownMenuItem onClick={handleEditUser}>
          <LuPencilLine className="w-4 h-4 mr-2" />
          Edit Analyst
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={handleDeleteDialogVisibility}
        >
          <LuTrash2 className="w-4 h-4 mr-2" />
          Delete Analyst
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsMenu;
