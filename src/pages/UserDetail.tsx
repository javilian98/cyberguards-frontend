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
import { useParams } from "react-router-dom";

const userLogs = [
  {
    dateTime: "21 Jan 2024, 2:30pm",
    riskStatus: "High",
    riskPercentage: "75%",
    suspectType: "After Hour Login",
  },
  {
    dateTime: "22 Jan 2024, 1:15am",
    riskStatus: "Medium",
    riskPercentage: "50%",
    suspectType: "Unusual IP Address",
  },
  {
    dateTime: "23 Jan 2024, 3:40pm",
    riskStatus: "Low",
    riskPercentage: "25%",
    suspectType: "Multiple Failed Logins",
  },
  {
    dateTime: "24 Jan 2024, 4:00pm",
    riskStatus: "High",
    riskPercentage: "80%",
    suspectType: "Access from Restricted Location",
  },
  // ... add more logs as needed
];

const UserDetail = () => {
  const { id } = useParams(); // Get the case ID from the URL params

  const percent = 75; // This would be dynamic based on your data
  const data = [
    { x: 1, y: percent },
    { x: 2, y: 100 - percent },
  ];
  const color = percent > 70 ? "red" : "green";

  const detailInfo = {
    reason: "Logged in at 9:43pm on a Sunday.",
    lastAccessDate: "21 Jan 2024, 2:30pm",
    lastAccessLocation: "Singapore",
    lastWebsiteVisit: "https://stackoverflow.com/questions/6784567/qa",
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
      <div className="px-7 py-2">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-gray-600"></div>
          <div className="flex flex-col ml-4">
            <h2 className="px-4 text-lg font-semibold tracking-tight">
              {userDetailData?.firstName} {userDetailData?.lastName}
            </h2>
            <span className="text-sm text-gray-600">
              {userDetailData?.profession}
            </span>
          </div>
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
                {userLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.dateTime}</TableCell>
                    <TableCell>{log.riskStatus}</TableCell>
                    <TableCell>{log.riskPercentage}</TableCell>
                    <TableCell>{log.suspectType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>History Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-center" style={{ fontWeight: "bold" }}>
                    After Hour Login
                  </h2>
                  <svg viewBox="0 0 400 400" width="200px" height="200px">
                    <VictoryPie
                      standalone={false}
                      animate={{ duration: 1000 }}
                      width={400}
                      height={400}
                      data={data}
                      innerRadius={120}
                      cornerRadius={25}
                      labels={() => null}
                      style={{
                        data: {
                          fill: ({ datum }) => {
                            return datum.x === 1 ? color : "transparent";
                          },
                        },
                      }}
                    />
                    <VictoryLabel
                      textAnchor="middle"
                      verticalAnchor="middle"
                      x={200}
                      y={200}
                      text={`${Math.round(percent)}%`}
                      style={{ fontSize: 45 }}
                    />
                  </svg>
                </div>
              </div>
              <Button className="absolute top-0 right-0">Assign Case</Button>
              <div className="details">
                <p>{detailInfo.reason}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Last Access Date</h2>
                <p>{detailInfo.lastAccessDate}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Last Access Location</h2>
                <p>{detailInfo.lastAccessLocation}</p>
                <br />
                <h2 style={{ fontWeight: "bold" }}>Last Website Visit</h2>
                <p>
                  <a href={detailInfo.lastWebsiteVisit}>
                    {detailInfo.lastWebsiteVisit}
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetail;
