// import { useAlertDialogStore } from "@/stores/useAlertDialogStore";

// import { LuPlus } from "react-icons/lu";
// import { Button } from "@/components/ui/button";

import Search from "@/components/Search/Search";
// import { deleteUser, getUserList } from "@/api/usersApi";
// import { useUserStore } from "@/stores/useUserStore";
// import {
//   useMutation,
//   useQuery,
//   useQueryClient,
//   // useQueryClient
// } from "@tanstack/react-query";

import { DataTable } from "@/components/DataTable/DataTable";
import FixedHeader from "@/components/Layouts/Header/FixedHeader";
import { threatsColumns } from "@/components/DataTable/Threats/ThreatsColumns";
import { useThreatStore } from "@/stores/useThreatStore";

function Threats() {
  const employees = useThreatStore((state) => state.employees);
  // const setEmployees = useThreatStore((state) => state.setEmployees);

  // const currentSelectedEmployee = useThreatStore(
  //   (state) => state.currentSelectedEmployee
  // );
  // const isSingleRowActionDialogOpen = useAlertDialogStore(
  //   (state) => state.isSingleRowActionDialogOpen
  // );
  // const setSingleRowActionDialogOpen = useAlertDialogStore(
  //   (state) => state.setSingleRowActionDialogOpen
  // );

  // const queryClient = useQueryClient();

  // const usersQuery = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const data = await getUserList();
  //     console.log("users ", data);

  //     setUsers(data);
  //     return data;
  //   },
  // });

  // const deleteUserMutation = useMutation({
  //   mutationFn: async (id: string) => {
  //     await deleteUser(id);
  //   },
  //   onSuccess: () => {
  //     const newUsers = users.filter(
  //       (item) => item.id !== currentSelectedUser.id
  //     );
  //     setUsers(newUsers);
  //     toast.success("User deleted successfully");
  //   },
  //   onSettled: async (_, error) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       await queryClient.invalidateQueries({ queryKey: ["users"] });
  //     }
  //   },
  // });

  // const deleteMultipleUsersMutation = useMutation({
  //   mutationFn: async (ids: string[]) => {
  //     console.log("ids ", ids);

  //     await Promise.all(ids.map((id) => deleteUser(id)));
  //   },
  //   onSuccess: () => {
  //     const newUsers = users.filter(
  //       (item) =>
  //         !selectedUsers.some((selectedUser) => selectedUser.id === item.id)
  //     );

  //     console.log("newUsers ", newUsers);

  //     setUsers(newUsers);
  //     setSelectedUsers([]);
  //     toast.success("Users deleted successfully");
  //   },
  //   onSettled: async (_, error) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       await queryClient.invalidateQueries({ queryKey: ["users"] });
  //     }
  //   },
  // });

  // const handleDelete = () => {
  //   deleteUserMutation.mutate(currentSelectedUser.id);
  // };

  // const handleDeleteAllSelected = () => {
  //   const selectedUserIds = selectedUsers.map((userItem) => userItem.id);
  //   console.log("selectedUserIds ", selectedUserIds);

  //   deleteMultipleUsersMutation.mutate(selectedUserIds);
  // };

  return (
    <>
      <FixedHeader>
        <Search placeholderText="Search threats" drawerTitle="Filter Threats">
          asd
        </Search>
        {/* <Link to="/users/create">
          <Button>
            <LuPlus className="w-5 h-5 mr-2 text-white" />
            Create User
          </Button>
        </Link> */}
      </FixedHeader>

      <div className="mt-16">
        <DataTable
          columns={threatsColumns}
          data={employees}
          // actionDelete={handleDeleteAllSelected}
        />
      </div>
    </>
  );
}
export default Threats;
