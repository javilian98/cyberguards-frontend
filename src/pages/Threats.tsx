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
import { getNewThreat, getThreatList } from "@/api/threatsApi";
import { EmployeeListItem } from "@/types/types";
import { Button } from "@/components/ui/button";
import { LuVenetianMask } from "react-icons/lu";

function Threats() {
  const employees = useThreatStore((state) => state.employees);
  const setEmployees = useThreatStore((state) => state.setEmployees);

  const threatListQuery = useQuery({
    queryKey: ["threats"],
    queryFn: async () => {
      const data = await getThreatList();
      console.log("threats ", data);

      setEmployees(data as EmployeeListItem[]);
      return data as EmployeeListItem[];
    },
  });

  const { refetch: fetchThreatGeneratedData } = useQuery({
    queryKey: ["generate_threat"],
    queryFn: async () => {
      const data = await getNewThreat();
      console.log("new threat ", data);

      return data;
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleGenerateThreat = () => {
    fetchThreatGeneratedData();
  };

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
        <Button
          variant="destructive"
          className="mt-2"
          onClick={handleGenerateThreat}
        >
          <LuVenetianMask className="h-6 w-6 mr-3" />
          Generate Threat
        </Button>
        <DataTable
          columns={threatsColumns}
          data={threatListQuery.isLoading ? [] : employees}
          // actionDelete={handleDeleteAllSelected}
        />
      </div>
    </>
  );
}
export default Threats;
