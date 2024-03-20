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
import { LuLoader2, LuVenetianMask } from "react-icons/lu";
import { toast } from "sonner";

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

  const { isFetching: isFetchingNewThreat, refetch: fetchThreatGeneratedData } =
    useQuery({
      queryKey: ["generate_threat"],
      queryFn: async () => {
        const data = await getNewThreat();
        console.log("new threat ", data);

        const newEmployees = [...employees, data];

        setEmployees(newEmployees as EmployeeListItem[]);
        toast.success("New threat has been generated");

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

      <div className="mt-20">
        <div className="flex items-center gap-3">
          <Button
            disabled={isFetchingNewThreat}
            variant="destructive"
            onClick={handleGenerateThreat}
          >
            {isFetchingNewThreat ? (
              <LuLoader2 className="h-6 w-6 mr-3 animate-spin" />
            ) : (
              <LuVenetianMask className="h-6 w-6 mr-3" />
            )}
            Generate Threat
          </Button>
          {isFetchingNewThreat && (
            <span className="text-sm text-muted-foreground">
              This process may take a while
            </span>
          )}
        </div>
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
