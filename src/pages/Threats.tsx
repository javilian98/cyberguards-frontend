import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { VictoryChart, VictoryTheme, VictoryArea, VictoryPie, VictoryLabel } from 'victory';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Threat, threatColumns } from "@/components/ui/threatsColumn";
import { DataTable } from "@/components/ui/datatable";

// Define a type for the props expected by the StatCard component
type StatCardProps = {
  title: string;
  value: string;
  progress?: number;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, progress }) => (
  <Card className="flex-1 mx-2 my-2">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-between items-center">
      <CardDescription>{value}</CardDescription>
      {progress !== undefined && <Progress value={progress} />}
    </CardContent>
  </Card>
);

// Example data for stat cards, replace with actual data from your state or props
const stats = {
  monitoredUsers: 105,
  highRiskUserPercentage: 0,
  usersDiscoveredFromEvents: 79,
  usersImportedFromDirectory: 26,
  activeAnalytics: { current: 84, total: 215 }
};

// Async function to fetch data
async function getData(): Promise<Threat[]> {
  // Replace with actual data fetching logic
  return [
    {
      username: "Haiyang",
      recent_risk: 9,
      overall_risk: 72,
    },
    {
      username: "Javier",
      recent_risk: 0,
      overall_risk: 8,
    },
    // ... more data
  ];
}

// Define the type for a log entry based on the provided image structure
type LogEntry = {
  offenseNumber: string;
  username: string;
  description: string;
  eventCount: number;
  flowCount: number;
  magnitude: number;
  updatedTime: string;
};

// Create dummy log data based on the provided image
const dummyLogData: LogEntry[] = [
  {
    offenseNumber: "#665",
    username: "Jay Blue",
    description: "Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same Username containing Failed Password For SSH",
    eventCount: 44036,
    flowCount: 0,
    magnitude: 5,
    updatedTime: "updated 3 minutes ago",
  },
  {
    offenseNumber: "#633",
    username: "Ray Sharrer",
    description: "Multiple Login Failures for the Same User preceded by Multiple Login Failures to the Same Destination preceded by Login Failures Followed By Success from the same Username containing Login attempt - failed",
    eventCount: 190597,
    flowCount: 0,
    magnitude: 5,
    updatedTime: "updated 3 minutes ago",
  },
  // ... more log entries
];

// Define some dummy data for the area chart
const areaData = [
  { x: new Date('Dec 12 2020 00:00'), y: 200 },
  { x: new Date('Dec 12 2020 06:00'), y: 250 },
  { x: new Date('Dec 12 2020 12:00'), y: 220 },
  { x: new Date('Dec 12 2020 18:00'), y: 215 },
  { x: new Date('Dec 13 2020 00:00'), y: 225 },
  { x: new Date('Dec 13 2020 06:00'), y: 240 },
  { x: new Date('Dec 13 2020 12:00'), y: 230 },
];

// Define some dummy data for the pie chart
const pieData = [
  { x: "User Behavior", y: 75 },
  { x: "UBA Machine Learning Anomaly", y: 25 }
];


const Threats: React.FC = () => {
  const [threatData, setThreatData] = useState<Threat[]>([]);

  useEffect(() => {
    let isMounted = true;
    getData().then(data => {
      if (isMounted) {
        setThreatData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container mx-auto py-10">
      {/* Card collection */}
      <div className="flex justify-between mb-8">
        <StatCard
          title="Monitored Users"
          value={stats.monitoredUsers.toString()}
        />
        <StatCard
          title="High Risk Users"
          value={`${stats.highRiskUserPercentage}%`}
          progress={stats.highRiskUserPercentage}
        />
        <StatCard
          title="Discovered from Events"
          value={`${stats.usersDiscoveredFromEvents}%`}
          progress={stats.usersDiscoveredFromEvents}
        />
        <StatCard
          title="Imported from Directory"
          value={`${stats.usersImportedFromDirectory}%`}
          progress={stats.usersImportedFromDirectory}
        />
        <StatCard
          title="Active Analytics"
          value={`${stats.activeAnalytics.current} of ${stats.activeAnalytics.total}`}
          progress={(stats.activeAnalytics.current / stats.activeAnalytics.total) * 100}
        />
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-1/3 lg:pr-2">
          <Card>
            <DataTable columns={threatColumns} data={threatData} />
          </Card>
        </div>
        <div className="w-full lg:w-2/3 lg:pl-2">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Offense</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Event Count</TableHead>
                  <TableHead>Flow Count</TableHead>
                  <TableHead>Magnitude</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyLogData.map(log => (
                  <TableRow key={log.offenseNumber}>
                    <TableCell>{log.offenseNumber}</TableCell>
                    <TableCell>{log.username}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>{log.eventCount}</TableCell>
                    <TableCell>{log.flowCount}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Progress value={(log.magnitude / 10) * 100} />
                        <span style={{ marginLeft: '8px' }}>{`${log.magnitude}/10`}</span>
                      </div>
                    </TableCell>
                    <TableCell>{log.updatedTime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full lg:w-1/3 lg:pr-2">
            <Card>
              <VictoryChart width={600}
                theme={VictoryTheme.material}
                scale={{ x: "time" }}
              >
                <VictoryArea
                  style={{ data: { fill: "#c43a31" } }}
                  data={areaData}
                  interpolation="natural"
                />
              </VictoryChart>
            </Card>
          </div>
          <div className="w-full lg:w-1/3 lg:pr-2">
            <Card>
              <VictoryPie
                // padAngle={({ datum }) => datum.y}
                // innerRadius={100}
                data={pieData}
                style={{
                  labels: { fill: "black", fontSize: 12, fontWeight: "bold" },
                  data: {
                    fill: ({ datum }) => {
                      const color = datum.x === "User Behavior" ? "#4c9aff" : "#ff8c00";
                      return datum.y > 0 ? color : "transparent"; // Only color the slice if there is a value
                    }
                  }
                }}
                labels={({ datum }) => `${datum.x}: ${datum.y}%`}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>

  );

};

export default Threats;
