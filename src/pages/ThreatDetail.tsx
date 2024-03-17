import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  // AvatarImage
} from "@/components/ui/avatar";
import { renderNameInitials } from "@/utils/utils";
import { buildingAccessColumns } from "@/components/DataTable/BuildingAccess/BuildingAccessColumns";
import { DataTable } from "@/components/DataTable/DataTable";
import { pcAccessColumns } from "@/components/DataTable/PCAccess/PCAccessColumns";
import { proxyLogColumns } from "@/components/DataTable/ProxyLog/ProxyLogColumns";
import {
  BuildingAccessLogs,
  EmployeeListItem,
  PCAccessLogs,
  ProxyLogs,
} from "@/types/types";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useThreatStore } from "@/stores/useThreatStore";
import { Separator } from "@/components/ui/separator";
import {
  LuExternalLink,
  // LuPlus
} from "react-icons/lu";
import { getCaseByEmployeeId } from "@/api/casesApi";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ThreatDetail = () => {
  const { employeeid } = useParams();

  const employees = useThreatStore((state) => state.employees);
  const currentSelectedEmployee = useThreatStore(
    (state) => state.currentSelectedEmployee
  );
  const setCurrentSelectedEmployee = useThreatStore(
    (state) => state.setCurrentSelectedEmployee
  );

  const logs = useThreatStore((state) => state.logs);

  const {
    data: caseDetailData,
    // error: caseDetailError,
    // isLoading: isCaseDetailLoading,
  } = useQuery({
    queryKey: ["cases", employeeid],
    queryFn: async () => {
      const data = await getCaseByEmployeeId(employeeid as string);
      return data;
    },
    enabled: !!employeeid, // query is only triggered if id is not undefined
  });

  // Cpde for getting employee details
  useEffect(() => {
    const foundEmployee = employees.find((item) => item.id === employeeid);

    setCurrentSelectedEmployee(foundEmployee as EmployeeListItem);
  }, [employees, employeeid, setCurrentSelectedEmployee]);

  const countTotalOffences = logs.filter(
    (item) => item.employeeId === employeeid
  ).length;

  const isBuildingAccessLogs = (
    log: BuildingAccessLogs | PCAccessLogs | ProxyLogs
  ): log is BuildingAccessLogs => {
    return (log as BuildingAccessLogs).officeLocation !== undefined;
  };

  const isPCAccessLogs = (
    log: BuildingAccessLogs | PCAccessLogs | ProxyLogs
  ): log is PCAccessLogs => {
    return (log as PCAccessLogs).machineLocation !== undefined;
  };

  const isProxyLogs = (
    log: BuildingAccessLogs | PCAccessLogs | ProxyLogs
  ): log is ProxyLogs => {
    return (log as ProxyLogs).bytesIn !== undefined;
  };

  return (
    <div className="UserDetail">
      <div className="flex gap-6 py-2  mb-4">
        <div className="flex items-center">
          <Avatar className="w-24 h-24">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="text-xl font-bold">
              {renderNameInitials(
                `${currentSelectedEmployee?.firstName} ${currentSelectedEmployee?.lastName}`
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-4">
            <h2 className="text-lg font-semibold tracking-tight">
              {currentSelectedEmployee?.firstName}{" "}
              {currentSelectedEmployee?.lastName}
            </h2>
            <span className="text-sm text-gray-600">
              {currentSelectedEmployee?.businessUnit}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center ml-5">
          <span className="text-2xl font-bold">
            {currentSelectedEmployee?.riskScore}%
          </span>
          <span className="text-sm">Overall Risk</span>
        </div>
        <div className="flex flex-col justify-center ml-5">
          <span className="text-2xl font-bold">{countTotalOffences}</span>
          <span className="text-sm">Total Offences</span>
        </div>
        <div className="flex items-center ml-2 gap-3">
          {caseDetailData?.assignee?.fullName && (
            <>
              <Separator orientation="vertical" className="mr-2" />
              <div className="flex items-center gap-3">
                <span className="text-sm">Analyst Reviewing: </span>

                <Avatar>
                  <AvatarFallback className="bg-black text-white">
                    {renderNameInitials(caseDetailData?.assignee?.fullName)}
                  </AvatarFallback>
                </Avatar>

                <span>{caseDetailData?.assignee?.fullName}</span>
              </div>
              <Separator orientation="vertical" className="ml-2 mr-2" />

              <Button asChild>
                <Link to={`/cases/${caseDetailData?.id}`}>
                  Go To Case <LuExternalLink className="h-4 w-4 ml-3" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="">
        <Tabs defaultValue="building_access">
          <TabsList>
            <TabsTrigger value="building_access" className="w-[200px]">
              Building Access
            </TabsTrigger>
            <TabsTrigger value="pc_access" className="w-[200px]">
              PC Access
            </TabsTrigger>
            <TabsTrigger value="proxy" className="w-[200px]">
              Proxy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="building_access" className="mt-4">
            <DataTable
              columns={buildingAccessColumns}
              data={(logs as BuildingAccessLogs[]).filter(
                (item) =>
                  item.employeeId === employeeid && isBuildingAccessLogs(item)
              )}
            />
          </TabsContent>

          <TabsContent value="pc_access" className="mt-4">
            <DataTable
              columns={pcAccessColumns}
              data={(logs as PCAccessLogs[]).filter(
                (item) => item.employeeId === employeeid && isPCAccessLogs(item)
              )}
            />
          </TabsContent>

          <TabsContent value="proxy" className="mt-4">
            <DataTable
              columns={proxyLogColumns}
              data={(logs as ProxyLogs[]).filter(
                (item) => item.employeeId === employeeid && isProxyLogs(item)
              )}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ThreatDetail;
