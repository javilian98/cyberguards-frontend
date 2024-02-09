import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowRightIcon } from "lucide-react";

const latestThreats = [
  {
    threatsTitle: "Wordpress Squatting Program",
    threatsCategory: "Early warning",
    threatsDate: "1 min ago",
  },
  {
    threatsTitle: "Wordpress Squatting Program",
    threatsCategory: "Early warning",
    threatsDate: "56 min ago",
  },
  {
    threatsTitle: "Wordpress Squatting Program",
    threatsCategory: "Early warning",
    threatsDate: "11 Jan 2024",
  },
  {
    threatsTitle: "Wordpress Squatting Program",
    threatsCategory: "Early warning",
    threatsDate: "19 Jan 2024",
  },
  {
    threatsTitle: "Wordpress Squatting Program",
    threatsCategory: "Early warning",
    threatsDate: "29 Feb 2024",
  },
]

const riskyUsers = [
  {
    riskyName: "Kenny Yeo",
    riskScore: "73",
    latestRisk: "0",
  },
  {
    riskyName: "Abe Beh",
    riskScore: "45",
    latestRisk: "0",
  },
  {
    riskyName: "Monse Rrat",
    riskScore: "29",
    latestRisk: "0",
  },
  {
    riskyName: "Silas Chad",
    riskScore: "89",
    latestRisk: "0",
  },
  {
    riskyName: "Carmella Thng",
    riskScore: "4",
    latestRisk: "0",
  },
]


type CardProps = React.ComponentProps<typeof Card>

function Home({ className, ...props }: CardProps) {
  return (
    <div className="flex">
      <Card className={cn("w-[520px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Latest Threat</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Your other card content here */}
          
          {/* Table Integration */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[225px]">Title</TableHead>
                <TableHead className="w-[135px]" >Category</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestThreats.map((threatsTitle) => (
                <TableRow key={threatsTitle.threatsTitle}>
                  <TableCell className="font-small">{threatsTitle.threatsTitle}</TableCell>
                  <TableCell className="font-small">{threatsTitle.threatsCategory}</TableCell>
                  <TableCell className="font-small">{threatsTitle.threatsDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link to="/Threats">
            <Button variant="link">View all<ArrowRightIcon /></Button>
          </Link>
        </CardContent>
        
      </Card>
      <Card className={cn("w-[520px]", className)} {...props}>
        <CardHeader>
          <CardTitle>Risky Users</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Your other card content here */}
          
          {/* Table Integration */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[225px]">Username</TableHead>
                <TableHead className="w-[135px]">Risk Score</TableHead>
                <TableHead>Latest Risk</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskyUsers.map((riskyName) => (
                <TableRow key={riskyName.riskyName}>
                  <TableCell className="font-small">{riskyName.riskyName}</TableCell>
                  <TableCell className="font-small">{riskyName.riskScore}</TableCell>
                  <TableCell className="font-small">{riskyName.latestRisk}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link to="/Users">
            <Button variant="link">View all<ArrowRightIcon /></Button>
          </Link>
        </CardContent>
        
      </Card>

    </div>
  )
  
}


export default Home;
