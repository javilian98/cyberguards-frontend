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

  const getCardTitle = () => {
    if (pathname.includes("/buildingaccess")) {
      return "Building Access Details";
    }

    if (pathname.includes("/pcaccess")) {
      return "PC Access Details";
    }

    if (pathname.includes("/proxy")) {
      return "Proxy Log Details";
    }
  };

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

  const renderLogDetails = (
    log: BuildingAccessLogs | PCAccessLogs | ProxyLogs
  ) => {
    if (isBuildingAccessLogs(log)) {
      return (
        <div className="relative">
          <div className="details">
            <h2 style={{ fontWeight: "bold" }}>Access Date</h2>
            <p>{formatDateTime(log?.details.accessIn.accessDateTime)}</p>

            <div className="grid grid-cols-2 mt-8">
              <div>
                <h2 style={{ fontWeight: "bold" }}>Access Time In</h2>
                <p>{formatTime(log?.details.accessIn.accessDateTime)}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Last Access Date</h2>
                <p>{log?.details.accessIn.officeLocation}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Access Status</h2>
                <p>{log?.details.accessIn.status}</p>
              </div>

              <div>
                <h2 style={{ fontWeight: "bold" }}>Access Time Out</h2>
                <p>{formatTime(log?.details.accessOut.accessDateTime)}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Last Access Date</h2>
                <p>{log?.details.accessOut.officeLocation}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Access Status</h2>
                <p>{log?.details.accessOut.status}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isPCAccessLogs(log)) {
      return (
        <div className="relative">
          <div className="details">
            <h2 style={{ fontWeight: "bold" }}>Access Date</h2>
            <p>{formatDateTime(log?.accessDateTime)}</p>

            <br />

            <h2 style={{ fontWeight: "bold" }}>Machine Name</h2>
            <p>{log?.details.logOn.machineName}</p>

            <div className="grid grid-cols-2 mt-8">
              <div>
                <h2 style={{ fontWeight: "bold" }}>Log On Time</h2>
                <p>{formatTime(log?.details.logOn.accessDateTime)}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Machine Location</h2>
                <p>{log?.details.logOn.machineLocation}</p>
              </div>

              <div>
                <h2 style={{ fontWeight: "bold" }}>Log Off Time</h2>
                <p>{formatTime(log?.details.logOff.accessDateTime)}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Machine Location</h2>
                <p>{log?.details.logOff.machineLocation}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (isProxyLogs(log)) {
      return (
        <div className="relative">
          <div className="details">
            <h2 style={{ fontWeight: "bold" }}>Access Date</h2>
            <p>{formatDateTime(log?.details.accessDateTime)}</p>

            <br />

            <h2 style={{ fontWeight: "bold" }}>Machine Name</h2>
            <p>{log?.details.machineName}</p>

            <div className="grid grid-cols-2 mt-8">
              <div>
                <h2 style={{ fontWeight: "bold" }}>Bytes In</h2>
                <p>{log?.details.bytesIn}</p>
              </div>

              <div>
                <h2 style={{ fontWeight: "bold" }}>Bytes Out</h2>
                <p>{log?.details.bytesOut}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 style={{ fontWeight: "bold" }}>Category</h2>
              <p>{log?.details.category}</p>
            </div>
            <br />
            <div>
              <h2 style={{ fontWeight: "bold" }}>URL</h2>
              <p>{log?.details.url}</p>
            </div>
          </div>
        </div>
      );
    }

    return null;
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
      </div>
      <div className="grid grid-cols-2 gap-4">
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

        <Card className="w-full">
          <CardHeader className="flex">
            <CardTitle className="mb-4">{getCardTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentSelectedLog ? (
              <div>
                {renderLogDetails(currentSelectedLog)}
                <Separator className="my-4" />
                {caseDetailData?.logId === logid ? (
                  <>
                    <h3 className="font-bold mb-2">Assigned Case To</h3>

                    <div className="mb-4 flex items-center gap-8">
                      <div className="flex items-center">
                        {caseDetailData?.assignee?.fullName ? (
                          <>
                            <Avatar className="w-10 h-10 mr-3">
                              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                              <AvatarFallback className="text-md font-bold bg-slate-800 text-white">
                                {renderNameInitials(
                                  `${
                                    caseDetailData?.assignee?.fullName?.split(
                                      " "
                                    )[0]
                                  } ${
                                    caseDetailData?.assignee?.fullName?.split(
                                      " "
                                    )[1]
                                  }`
                                )}
                              </AvatarFallback>
                            </Avatar>
                            <p>{caseDetailData?.assignee.fullName}</p>
                          </>
                        ) : (
                          <>
                            <Avatar className="w-10 h-10 mr-3">
                              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                              <AvatarFallback className="text-md font-bold bg-slate-500 text-white">
                                <LuClipboardX className="h-5 w-5" />
                              </AvatarFallback>
                            </Avatar>
                            <p>Not assigned yet</p>
                          </>
                        )}
                      </div>

                      <Button className="w-fit" variant="secondary" asChild>
                        <Link to={`/cases/${caseDetailData?.id}`}>
                          Go To Case
                          <LuExternalLink className="h-5 w-5 ml-3" />
                        </Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button className="w-fit" asChild>
                    <Link to={"/cases/create"}>
                      <LuPlus className="h-5 w-5 mr-3" />
                      Create Case
                    </Link>
                  </Button>
                )}
              </div>
            ) : (
              <div>Select a row to view employee's log detail.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThreatDetail;
