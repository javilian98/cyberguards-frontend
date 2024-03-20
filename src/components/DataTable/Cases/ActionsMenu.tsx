import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useCaseStore } from "@/stores/useCaseStore";

import { LuMoreHorizontal, LuPencilLine, LuTrash2 } from "react-icons/lu";

import { Case, ROLE_ID } from "@/types/types";
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
import { useUserAuthStore } from "@/stores/useUserAuthStore";

interface ActionsMenuProps {
  row: Row<Case>;
}
function ActionsMenu({ row }: ActionsMenuProps) {
  const setCurrentSelectedCase = useCaseStore(
    (state) => state.setCurrentSelectedCase
  );
  const setSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.setSingleRowActionDialogOpen
  );
  const userAuth = useUserAuthStore((state) => state.userAuth);

  const navigate = useNavigate();

  const handleEditCase = () => {
    setCurrentSelectedCase(row.original);
    navigate(`/cases/${row.original.id}`);
  };

  const handleDeleteDialogVisibility = () => {
    setCurrentSelectedCase(row.original);
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
        {/* <DropdownMenuItem>
          <LuEye className="w-4 h-4 mr-2" />
          View Case
        </DropdownMenuItem> */}
        <DropdownMenuItem onClick={handleEditCase}>
          <LuPencilLine className="w-4 h-4 mr-2" />
          Edit Case
        </DropdownMenuItem>
        {userAuth.role === ROLE_ID.admin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={handleDeleteDialogVisibility}
            >
              <LuTrash2 className="w-4 h-4 mr-2" />
              Delete Case
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsMenu;
