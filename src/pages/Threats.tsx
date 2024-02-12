import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Define a type for the props expected by the StatCard component
type StatCardProps = {
  title: string;
  value: string;
  progress?: number;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, progress }) => (
  <Card className="flex-1 mx-2">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-between items-center">
      <CardDescription>{value}</CardDescription>
      {progress !== undefined && <Progress value={progress} />}
    </CardContent>
  </Card>
);

// Example data, replace with actual data from your state or props
const stats = {
  monitoredUsers: 105,
  highRiskUserPercentage: 0,
  usersDiscoveredFromEvents: 79,
  usersImportedFromDirectory: 26,
  activeAnalytics: { current: 84, total: 215 }
};

const Threats: React.FC = () => {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="flex">
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
      </CardContent>
    </Card>
  );
};

export default Threats;
