import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  //   TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VictoryPie, VictoryLabel } from "victory";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/usersApi";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { LuPencilLine } from "react-icons/lu";

const userLogs = [
  {
    dateTime: "24 Jan 2024, 4:00pm",
    riskStatus: "High",
    riskPercentage: 80,
    suspectType: "Access from Restricted Location",
    detailInfo: {
      reason: "Logged in at 9:43pm on a Wednesday.",
      lastAccessDate: "24 Jan 2024, 4:00pm",
      lastAccessLocation: "Singapore",
      lastWebsiteVisit: "https://stackoverflow.com/questions/6784567/qa",
    },
  },
  {
    dateTime: "23 Jan 2024, 3:40pm",
    riskStatus: "Low",
    riskPercentage: 20,
    suspectType: "Multiple Failed Logins",
    detailInfo: {
      reason: "Logged in at 3:40pm on a Tuesday.",
      lastAccessDate: "23 Jan 2024, 3:40pm",
      lastAccessLocation: "Singapore",
      lastWebsiteVisit: "https://stackoverflow.com/questions/6784567/qa",
    },
  },
  {
    dateTime: "22 Jan 2024, 1:15am",
    riskStatus: "Medium",
    riskPercentage: 50,
    suspectType: "Unusual IP Address",
    detailInfo: {
      reason: "Logged in at 1:15am on a Monday.",
      lastAccessDate: "22 Jan 2024, 1:15am",
      lastAccessLocation: "Singapore",
      lastWebsiteVisit: "https://stackoverflow.com/questions/6784567/qa",
    },
  },
  {
    dateTime: "21 Jan 2024, 2:30pm",
    riskStatus: "High",
    riskPercentage: 70,
    suspectType: "After Hour Login",
    detailInfo: {
      reason: "Logged in at 9:43pm on a Sunday.",
      lastAccessDate: "21 Jan 2024, 2:30pm",
      lastAccessLocation: "Singapore",
      lastWebsiteVisit: "https://stackoverflow.com/questions/6784567/qa",
    },
  },
];

type Log = {
  dateTime: string;
  riskStatus: string;
  riskPercentage: number;
  suspectType: string;
  detailInfo: {
    reason: string;
    lastAccessDate: string;
    lastAccessLocation: string;
    lastWebsiteVisit: string;
  };
};

const UserDetail = () => {
  const [selectedLog, setSelectedLog] = useState<Log | undefined>();

  const { id } = useParams(); // Get the case ID from the URL params

  const computeRiskPercentage = (riskPercentage: number) => {
    return [
      { x: 1, y: riskPercentage },
      { x: 2, y: 100 - riskPercentage },
    ];
  };

  const renderColor = (): string => {
    switch (selectedLog?.riskPercentage) {
      case 0:
      case 10:
      case 20:
      case 30:
        return "green";
      case 40:
      case 50:
      case 60:
        return "orange";
      case 70:
      case 80:
      case 90:
      case 100:
        return "red";
      default:
        return "green";
    }
  };

  const {
    data: userDetailData,
    error: userDetailError,
    isLoading: isUserDetailLoading,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const data = await getUser(id as string);
      return data;
    },
    enabled: !!id, // query is only triggered if id is not undefined
  });

  if (isUserDetailLoading) {
    return <div>Loading...</div>;
  }

  if (userDetailError) {
    return <div>User Detail cannot be found.</div>;
  }

  return (
    <div className="UserDetail">
      <div className="flex gap-6 px-7 py-2  mb-6">
        <div className="flex items-center">
          <div className="w-24 h-24 bg-gray-600"></div>
          <div className="flex flex-col ml-4">
            <h2 className="text-lg font-semibold tracking-tight">
              {userDetailData?.firstName} {userDetailData?.lastName}
            </h2>
            <span className="text-sm text-gray-600">
              {userDetailData?.profession}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <Link to={`/users/edit/${id}`}>
            <Button>
              <LuPencilLine className="w-4 h-4 mr-3" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Employee’s History</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Table for log data */}
            <Table>
              <TableCaption>
                Employee's log history with risk assessments.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date Time</TableHead>
                  <TableHead>Risk Status</TableHead>
                  <TableHead>Risk (%)</TableHead>
                  <TableHead>Suspect Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userLogs.map((log, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="cursor-pointer"
                      onClick={() => {
                        console.log("log ", log);

                        setSelectedLog(log);
                      }}
                    >
                      <TableCell>{log.dateTime}</TableCell>
                      <TableCell>{log.riskStatus}</TableCell>
                      <TableCell>{log.riskPercentage}</TableCell>
                      <TableCell>{log.suspectType}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>History Detail</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedLog ? (
              <div className="relative">
                <div className="flex items-center">
                  <svg viewBox="0 0 400 400" width="200px" height="200px">
                    <VictoryPie
                      standalone={false}
                      animate={{ duration: 1000 }}
                      width={400}
                      height={400}
                      data={computeRiskPercentage(selectedLog.riskPercentage)}
                      innerRadius={120}
                      cornerRadius={25}
                      labels={() => null}
                      style={{
                        data: {
                          fill: ({ datum }) => {
                            return datum.x === 1
                              ? renderColor()
                              : "transparent";
                          },
                        },
                      }}
                    />
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={200}
                      y={200}
                      text={`${Math.round(selectedLog.riskPercentage)}%`}
                      style={{ fontSize: 45 }}
                    />
                  </svg>
                  <h2 className="text-center font-semibold text-2xl flex flex-col gap-1">
                    {selectedLog.suspectType}
                    <span className="text-sm text-left">Suspect Type</span>
                  </h2>
                </div>
                <Button className="absolute top-0 right-0">Assign Case</Button>
                <div className="details">
                  <p>{selectedLog?.detailInfo?.reason}</p>
                  <br />
                  <h2 style={{ fontWeight: "bold" }}>Last Access Date</h2>
                  <p>{selectedLog?.detailInfo.lastAccessDate}</p>
                  <br />
                  <h2 style={{ fontWeight: "bold" }}>Last Access Location</h2>
                  <p>{selectedLog?.detailInfo?.lastAccessLocation}</p>
                  <br />
                  <h2 style={{ fontWeight: "bold" }}>Last Website Visit</h2>
                  <p>
                    <a href={selectedLog?.detailInfo?.lastWebsiteVisit}>
                      {selectedLog?.detailInfo?.lastWebsiteVisit}
                    </a>
                  </p>
                </div>
              </div>
            ) : (
              <div>Select a log to view employee's history detail.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;
