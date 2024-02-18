import { useAlertDialogStore } from "@/stores/useAlertDialogStore";

import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";

import Search from "@/components/Search/Search";
import { getUserList } from "@/api/usersApi";
import { useUserStore } from "@/stores/useUserStore";
import {
  useQuery,
  // useQueryClient
} from "@tanstack/react-query";
import { usersColumns } from "@/components/DataTable/Users/UsersColumns";
import { DataTable } from "@/components/DataTable/DataTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import FixedHeader from "@/components/Layouts/Header/FixedHeader";

function Users() {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  // const selectedUsers = useUserStore((state) => state.selectedUsers);
  // const setSelectedUsers = useUserStore((state) => state.setSelectedUsers);
  // const currentSelectedUser = useUserStore(
  //   (state) => state.currentSelectedUser
  // );
  const isSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.isSingleRowActionDialogOpen
  );
  const setSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.setSingleRowActionDialogOpen
  );

  // const table = useReactTable({
  //   data: users,
  //   columns,
  //   onSortingChange: setSorting,
  //   onColumnFiltersChange: setColumnFilters,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnVisibilityChange: setColumnVisibility,
  //   onRowSelectionChange: setRowSelection,
  //   state: {
  //     sorting,
  //     columnFilters,
  //     columnVisibility,
  //     rowSelection,
  //   },
  // });

  // const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getUserList();
      setUsers(data);
      return data;
    },
  });

  return (
    <>
      <FixedHeader>
        <Search placeholderText="Search username" drawerTitle="Filter Users">
          asd
        </Search>
        {/* <Link to="/cases/create"> */}
        <Button>
          <LuPlus className="w-5 h-5 mr-2 text-white" />
          Create User
        </Button>
        {/* </Link> */}
      </FixedHeader>

      <div className="mt-16">
        <DataTable
          columns={usersColumns}
          data={usersQuery.isLoading ? [] : users}
          // actionDelete={handleDeleteAllSelected}
        />
      </div>

      <AlertDialog
        open={isSingleRowActionDialogOpen}
        onOpenChange={() => setSingleRowActionDialogOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setSingleRowActionDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
export default Users;
