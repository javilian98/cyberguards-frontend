import { Button } from "@/components/ui/button";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  // AvatarImage
} from "@/components/ui/avatar";
import { formatDateTime, formatTime, renderNameInitials } from "@/utils/utils";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useThreatStore } from "@/stores/useThreatStore";
import { Separator } from "@/components/ui/separator";
import { LuClipboardX, LuExternalLink, LuPlus } from "react-icons/lu";
import { getCaseListByLogIds } from "@/api/casesApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ThreatDetail = () => {
  const { pathname } = useLocation();
  const { employeeid, logtype, logid } = useParams();

  const employees = useThreatStore((state) => state.employees);
  const currentSelectedEmployee = useThreatStore(
    (state) => state.currentSelectedEmployee
  );
  const setCurrentSelectedEmployee = useThreatStore(
    (state) => state.setCurrentSelectedEmployee
  );

  const setLogType = useThreatStore((state) => state.setLogType);

  const currentSelectedLog = useThreatStore(
    (state) => state.currentSelectedLog
  );
  const setCurrentSelectedLog = useThreatStore(
    (state) => state.setCurrentSelectedLog
  );

  const logs = useThreatStore((state) => state.logs);

  const queryClient = useQueryClient();

  useEffect(() => {
    const foundEmployee = employees.find((item) => item.id === employeeid);
    const foundLog = logs.find((item) => item.logId === logid);

    setCurrentSelectedEmployee(foundEmployee as EmployeeListItem);
    setLogType(logtype as string);
    setCurrentSelectedLog(foundLog);
  }, [
    employees,
    employeeid,
    logtype,
    logid,
    logs,
    setCurrentSelectedEmployee,
    setLogType,
    setCurrentSelectedLog,
  ]);

  const countTotalOffences = logs.filter(
    (item) => item.employeeId === employeeid
  ).length;

  // const getCardTitle = () => {
  //   if (pathname.includes("/buildingaccess")) {
  //     return "Building Access Details";
  //   }

  //   if (pathname.includes("/pcaccess")) {
  //     return "PC Access Details";
  //   }

  //   if (pathname.includes("/proxy")) {
  //     return "Proxy Log Details";
  //   }
  // };

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

  const {
    data: caseDetailData,
    error: caseDetailError,
    isLoading: isCaseDetailLoading,
  } = useQuery({
    queryKey: ["cases_threatlogid", logid],
    queryFn: async () => {
      const cases = await getCaseListByLogIds(logs.map((item) => item.logId));

      const foundCase = cases.find((item) => item.logId === logid);

      console.log("cases ", cases);
      console.log("foundCase ", foundCase);

      return foundCase || null;
    },
    enabled: !!logid, // query is only triggered if id is not undefined
  });

  // Add a useEffect to invalidate the query when logid changes
  useEffect(() => {
    // Invalidate the query key when logid changes
    queryClient.invalidateQueries({ queryKey: ["cases_threatlogid", logid] });
  }, [logid, queryClient]);

  if (isCaseDetailLoading) {
    return <div>Loading...</div>;
  }

  if (caseDetailError) {
    return <div>Threat Detail cannot be found.</div>;
  }

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
          <Separator orientation="vertical" className="mr-2" />

          <div className="flex items-center gap-3">
            <span className="text-sm">Analyst Reviewing: </span>
            <Avatar>
              <AvatarFallback className="bg-black text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </div>
          <Separator orientation="vertical" className="ml-2 mr-2" />
          <Button>
            Go To Case <LuExternalLink className="h-4 w-4 ml-3" />
          </Button>
        </div>
      </div>
      <div className="">
        <div>
          <div className="w-full">
            <div className="flex gap-1 bg-gray-100 p-2 rounded-md">
              <Button
                className={
                  pathname.includes("/buildingaccess")
                    ? "w-1/3 bg-slate-800 text-white hover:bg-slate-900 hover:text-white"
                    : "w-1/3"
                }
                variant="ghost"
                asChild
              >
                <Link
                  to={`/threats/employee/${employeeid}/buildingaccess`}
                  onClick={() => setCurrentSelectedLog(undefined)}
                >
                  Building Access
                </Link>
              </Button>

              <Button
                className={
                  pathname.includes("/pcaccess")
                    ? "w-1/3 bg-slate-800 text-white hover:bg-slate-900 hover:text-white"
                    : "w-1/3"
                }
                variant="ghost"
                asChild
              >
                <Link
                  to={`/threats/employee/${employeeid}/pcaccess`}
                  onClick={() => setCurrentSelectedLog(undefined)}
                >
                  PC Access
                </Link>
              </Button>
              <Button
                className={
                  pathname.includes("/proxy")
                    ? "w-1/3 bg-slate-800 text-white hover:bg-slate-900 hover:text-white"
                    : "w-1/3"
                }
                variant="ghost"
                asChild
              >
                <Link
                  to={`/threats/employee/${employeeid}/proxy`}
                  onClick={() => setCurrentSelectedLog(undefined)}
                >
                  Proxy Logs
                </Link>
              </Button>
            </div>
          </div>

          {pathname.includes("/buildingaccess") && (
            <DataTable
              columns={buildingAccessColumns}
              data={(logs as BuildingAccessLogs[]).filter(
                (item) =>
                  item.employeeId === employeeid && isBuildingAccessLogs(item)
              )}
            />
          )}

          {pathname.includes("/pcaccess") && (
            <DataTable
              columns={pcAccessColumns}
              data={(logs as PCAccessLogs[]).filter(
                (item) => item.employeeId === employeeid && isPCAccessLogs(item)
              )}
            />
          )}

          {pathname.includes("/proxy") && (
            <DataTable
              columns={proxyLogColumns}
              data={(logs as ProxyLogs[]).filter(
                (item) => item.employeeId === employeeid && isProxyLogs(item)
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatDetail;
