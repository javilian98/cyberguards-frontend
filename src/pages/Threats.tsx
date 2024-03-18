// import { useAlertDialogStore } from "@/stores/useAlertDialogStore";

// import { LuPlus } from "react-icons/lu";
// import { Button } from "@/components/ui/button";

import Search from "@/components/Search/Search";
// import { deleteUser, getUserList } from "@/api/usersApi";
// import { useUserStore } from "@/stores/useUserStore";
import {
  //   useMutation,
  useQuery,
  //   useQueryClient,
  //   // useQueryClient
} from "@tanstack/react-query";

import { DataTable } from "@/components/DataTable/DataTable";
import FixedHeader from "@/components/Layouts/Header/FixedHeader";
import { threatsColumns } from "@/components/DataTable/Threats/ThreatsColumns";
import { useThreatStore } from "@/stores/useThreatStore";
import { getThreatList } from "@/api/threatsApi";
import { EmployeeListItem } from "@/types/types";

function Threats() {
  const employees = useThreatStore((state) => state.employees);
  const setEmployees = useThreatStore((state) => state.setEmployees);

  const threatQuery = useQuery({
    queryKey: ["threats"],
    queryFn: async () => {
      const data = await getThreatList();
      console.log("threats ", data);

      setEmployees(data as EmployeeListItem[]);
      return data as EmployeeListItem[];
    },
  });

  console.log("threatQuery employees", employees);

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
          data={threatQuery.isLoading ? [] : employees}
          // actionDelete={handleDeleteAllSelected}
        />
      </div>
    </>
  );
}
export default Threats;
