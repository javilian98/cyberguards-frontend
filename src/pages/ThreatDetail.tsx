import { Button } from "@/components/ui/button";
import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { LuPencilLine } from "react-icons/lu";
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
import { Row } from "@tanstack/react-table";
import { useThreatStore } from "@/stores/useThreatStore";

const buildingAccessLogsData: BuildingAccessLogs[] = [
  {
    employeeId: "1",
    accessDateTime: "2 Mar 2024",
    officeLocation: "Singapore",
    details: {
      accessIn: {
        accessDateTime: "2024-03-02 08:13:23.000000",
        direction: "IN",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
      accessOut: {
        accessDateTime: "2024-03-02 16:30:23.000000",
        direction: "OUT",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
  {
    employeeId: "1",
    accessDateTime: "22 Feb 2024",
    officeLocation: "Singapore",
    details: {
      accessIn: {
        accessDateTime: "2024-02-22 04:37:55.000000",
        direction: "IN",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
      accessOut: {
        accessDateTime: "2024-02-22 12:30:49.000000",
        direction: "OUT",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
  {
    employeeId: "2",
    accessDateTime: "4 Feb 2024",
    officeLocation: "Singapore",
    details: {
      accessIn: {
        accessDateTime: "2024-02-04 02:37:55.000000",
        direction: "IN",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
      accessOut: {
        accessDateTime: "2024-02-04 10:30:49.000000",
        direction: "OUT",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
  {
    employeeId: "3",
    accessDateTime: "19 Feb 2024",
    officeLocation: "Singapore",
    details: {
      accessIn: {
        accessDateTime: "2024-02-19 05:37:55.000000",
        direction: "IN",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
      accessOut: {
        accessDateTime: "2024-02-19 09:30:49.000000",
        direction: "OUT",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
];

const pcAccessLogsData: PCAccessLogs[] = [
  {
    employeeId: "1",
    accessDateTime: "21 Feb 2024",
    machineLocation: "Singapore",
    machineName: "PC_1",
    details: {
      logOn: {
        accessDateTime: "2024-02-21 16:30:49.000000",
        status: "Log On",
        machineName: "PC_1",
        machineLocation: "Singapore",
        suspectType: 0,
      },
      logOff: {
        accessDateTime: "2024-02-21 19:30:49.000000",
        status: "Log Off",
        machineName: "PC_1",
        machineLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
  {
    employeeId: "1",
    accessDateTime: "17 Feb 2024",
    machineLocation: "Singapore",
    machineName: "PC_2",
    details: {
      logOn: {
        accessDateTime: "2024-02-17 16:30:49.000000",
        status: "Log On",
        machineName: "PC_2",
        machineLocation: "Singapore",
        suspectType: 0,
      },
      logOff: {
        accessDateTime: "2024-02-17 19:30:49.000000",
        status: "Log Off",
        machineName: "PC_2",
        machineLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
];

const proxyLogsData: ProxyLogs[] = [
  {
    employeeId: "1",
    accessDateTime: "17 Feb 2024",
    bytesIn: 3373816,
    bytesOut: 2406833,
    details: {
      accessDateTime: "2024-02-17 19:30:49.000000",
      machineName: "PC_1",
      url: "https://www.careers.sl",
      category: "Finance, Insurance",
      bytesIn: 3373816,
      bytesOut: 2406833,
      suspectType: "6",
    },
  },
  {
    employeeId: "3",
    accessDateTime: "5 Jan 2024",
    bytesIn: 963286,
    bytesOut: 4987004,
    details: {
      accessDateTime: "2024-01-05 12:39:24.000000",
      machineName: "PC_1",
      url: "https://www.careers.sl",
      category: "Community and Society, Philanthropy",
      bytesIn: 963286,
      bytesOut: 4987004,
      suspectType: "6",
    },
  },
];

// {
//   "access_date": "2024-03-06",
//   "office_location": "Singapore",
//   "suspect": 0,
//   "details": {
//     "access_in": {
//       "access_date_time": "2023-01-02 08:13:23.000000",
//       "direction": "IN",
//       "status": "Success",
//       "office_location": "Singapore",
//       "suspect": 0,
//     },
//     "access_out": {
//       "access_date_time": "2023-01-02 16:30:23.000000",
//       "direction": "OUT",
//       "status": "Success",
//       "office_location": "Singapore",
//       "suspectType": 0,
//     }
//   }
// }

const ThreatDetail = () => {
  const [selectedLog, setSelectedLog] = useState<
    BuildingAccessLogs | PCAccessLogs | ProxyLogs | undefined
  >(undefined);

  const { pathname } = useLocation();
  const { id } = useParams(); // Get the case ID from the URL params

  const employees = useThreatStore((state) => state.employees);
  const currentSelectedEmployee = useThreatStore(
    (state) => state.currentSelectedEmployee
  );
  const setCurrentSelectedEmployee = useThreatStore(
    (state) => state.setCurrentSelectedEmployee
  );

  useEffect(() => {
    const foundEmployee = employees.find((item) => item.id === id);

    // if (foundEmployee == undefined) {
    //   setCurrentSelectedEmployee(undefined);
    // }

    setCurrentSelectedEmployee(foundEmployee as EmployeeListItem);
  }, []);

  const countTotalOffences =
    buildingAccessLogsData.filter((item) => item.employeeId === id).length +
    pcAccessLogsData.filter((item) => item.employeeId === id).length +
    proxyLogsData.filter((item) => item.employeeId === id).length;

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
          {/* {/* <Button className="absolute top-0 right-0">Assign Case</Button> */}
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
          {/* {/* <Button className="absolute top-0 right-0">Assign Case</Button> */}
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
          {/* {/* <Button className="absolute top-0 right-0">Assign Case</Button> */}
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

            {/* <div className="grid grid-cols-2 mt-8"> */}
            <div className="mt-8">
              <h2 style={{ fontWeight: "bold" }}>Category</h2>
              <p>{log?.details.category}</p>
            </div>
            <br />
            <div>
              <h2 style={{ fontWeight: "bold" }}>URL</h2>
              <p>{log?.details.url}</p>
            </div>
            {/* </div> */}
          </div>
        </div>
      );
    }

    return null;
  };

  // const {
  //   data: userDetailData,
  //   error: userDetailError,
  //   isLoading: isUserDetailLoading,
  // } = useQuery({
  //   queryKey: ["users", id],
  //   queryFn: async () => {
  //     const data = await getUser(id as string);
  //     return data;
  //   },
  //   enabled: !!id, // query is only triggered if id is not undefined
  // });

  // if (isUserDetailLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (userDetailError) {
  //   return <div>User Detail cannot be found.</div>;
  // }

  return (
    <div className="UserDetail">
      <div className="flex gap-6 py-2  mb-4">
        <div className="flex items-center">
          {/* <div className=""> */}
          <Avatar className="w-24 h-24">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="text-xl font-bold">
              {renderNameInitials(
                `${currentSelectedEmployee?.firstName} ${currentSelectedEmployee?.lastName}`
              )}
            </AvatarFallback>
          </Avatar>
          {/* </div> */}
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
        <div className="flex items-center">
          {/* <Link to={`/users/edit/${id}`}>
            <Button>
              <LuPencilLine className="w-4 h-4 mr-3" />
              View Profile
            </Button>
          </Link> */}
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
                  to={`/threats/employee/${id}/buildingaccess`}
                  onClick={() => setSelectedLog(undefined)}
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
                  to={`/threats/employee/${id}/pcaccess`}
                  onClick={() => setSelectedLog(undefined)}
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
                  to={`/threats/employee/${id}/proxy`}
                  onClick={() => setSelectedLog(undefined)}
                >
                  Proxy Logs
                </Link>
              </Button>
            </div>
          </div>

          {pathname.includes("/buildingaccess") && (
            <DataTable
              columns={buildingAccessColumns}
              data={buildingAccessLogsData.filter(
                (item) => item.employeeId === id
              )}
              setSelectedRow={(row: Row<BuildingAccessLogs>) => {
                setSelectedLog(row.original);
                // window.location.hash = `#${row}`;
              }}
            />
          )}

          {pathname.includes("/pcaccess") && (
            <DataTable
              columns={pcAccessColumns}
              data={pcAccessLogsData.filter((item) => item.employeeId === id)}
              setSelectedRow={(row: Row<PCAccessLogs>) =>
                setSelectedLog(row.original)
              }
            />
          )}

          {pathname.includes("/proxy") && (
            <DataTable
              columns={proxyLogColumns}
              data={proxyLogsData.filter((item) => item.employeeId === id)}
              setSelectedRow={(row: Row<ProxyLogs>) =>
                setSelectedLog(row.original)
              }
            />
          )}
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{getCardTitle()}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLog ? (
              <div>{renderLogDetails(selectedLog)}</div>
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
