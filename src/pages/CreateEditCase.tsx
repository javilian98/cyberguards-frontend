import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RiskScoreSlider from "@/components/RiskScoreSlider/RiskScoreSlider";

import { LuImport } from "react-icons/lu";

function CreateEditCase() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight mb-10">
        Create a Case
      </h1>
      <Card className="max-w-[700px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Case Details
            <Button>
              <LuImport className="w-5 h-5 mr-3" />
              Import Case
            </Button>
          </CardTitle>
          <CardDescription>
            You can populate a case by clicking on the import case button or
            input the case details manually.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="case-title">Case Title</Label>
            <Input type="text" placeholder="Enter your Case Title" />
          </div>
          <div className="grid w-full items-center gap-2 mt-6">
            <Label htmlFor="message">Your message</Label>
            <Textarea placeholder="Type your message here." id="message" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 mt-6">
            <Label htmlFor="email">Risk Status</Label>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Risk Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 mt-6">
            <RiskScoreSlider defaultValue={[0]} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2 mt-8">
            <Label htmlFor="email">Suspect Type</Label>
            <Select>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select Suspect Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Suspect Type</SelectLabel>
                  <SelectItem value="type-1">Type 1</SelectItem>
                  <SelectItem value="type-2">Type 2</SelectItem>
                  <SelectItem value="type-3">Type 3</SelectItem>
                  <SelectItem value="type-4">Type 4</SelectItem>
                  <SelectItem value="type-5">Type 5</SelectItem>
                  <SelectItem value="type-6">Type 6</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </>
  );
}

export default CreateEditCase;
