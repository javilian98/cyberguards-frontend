import { useAlertDialogStore } from "@/stores/useAlertDialogStore";

import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";

import Search from "@/components/Search/Search";
import { deleteUser, getUserList } from "@/api/usersApi";
import { useUserStore } from "@/stores/useUserStore";
import {
  useMutation,
  useQuery,
  useQueryClient,
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
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useUserAuthStore } from "@/stores/useUserAuthStore";
import { ROLE_ID } from "@/types/types";

function Users() {
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const selectedUsers = useUserStore((state) => state.selectedUsers);
  const setSelectedUsers = useUserStore((state) => state.setSelectedUsers);
  const currentSelectedUser = useUserStore(
    (state) => state.currentSelectedUser
  );
  const isSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.isSingleRowActionDialogOpen
  );
  const setSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.setSingleRowActionDialogOpen
  );

  const userAuth = useUserAuthStore((state) => state.userAuth);

  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await getUserList();
      console.log("users ", data);

      setUsers(data);
      return data;
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteUser(id);
    },
    onSuccess: () => {
      const newUsers = users.filter(
        (item) => item.id !== currentSelectedUser.id
      );
      setUsers(newUsers);
      toast.success("Analyst deleted successfully");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });

  const deleteMultipleUsersMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      console.log("ids ", ids);

      await Promise.all(ids.map((id) => deleteUser(id)));
    },
    onSuccess: () => {
      const newUsers = users.filter(
        (item) =>
          !selectedUsers.some((selectedUser) => selectedUser.id === item.id)
      );

      console.log("newUsers ", newUsers);

      setUsers(newUsers);
      setSelectedUsers([]);
      toast.success("Users deleted successfully");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });

  const handleDelete = () => {
    deleteUserMutation.mutate(currentSelectedUser.id);
  };

  const handleDeleteAllSelected = () => {
    const selectedUserIds = selectedUsers.map((userItem) => userItem.id);
    console.log("selectedUserIds ", selectedUserIds);

    deleteMultipleUsersMutation.mutate(selectedUserIds);
  };

  return (
    <>
      <FixedHeader>
        <Search placeholderText="Search analyst" drawerTitle="Filter Analysts">
          asd
        </Search>
        {userAuth.role === ROLE_ID.admin && (
          <Link to="/users/create">
            <Button>
              <LuPlus className="w-5 h-5 mr-2 text-white" />
              Create Analyst
            </Button>
          </Link>
        )}
      </FixedHeader>

      <div className="mt-16">
        <DataTable
          columns={usersColumns}
          data={usersQuery.isLoading ? [] : users}
          actionDelete={handleDeleteAllSelected}
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
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
export default Users;
