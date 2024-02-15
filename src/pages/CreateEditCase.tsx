import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RiskScoreSlider from "@/components/RiskScoreSlider/RiskScoreSlider";

import { LuImport, LuPlus, LuTrash2 } from "react-icons/lu";
import { ComboBox } from "@/components/ComboBox/ComboBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCase } from "@/api/casesApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description cannot be empty.",
  }),
  riskStatus: z.enum(["low", "medium", "high"], {
    required_error: "Risk Status must be selected.",
  }),
  riskScore: z.number(),
  // suspectType: z.number(),
  threatPageUrl: z.string().url(),
});

function CreateEditCase() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const casesMutation = useMutation({
    mutationKey: ["cases"],
    mutationFn: (caseItem: z.infer<typeof formSchema>) =>
      createCase({
        title: caseItem.title,
        description: caseItem.description,
        risk_status: caseItem.riskStatus,
        risk_score: caseItem.riskScore,
        threat_page_url: caseItem.threatPageUrl,
      }),
    onError: () => {},
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      console.log(`Case "${data.title}" has been created`);

      navigate("/cases");
      toast.success(`Case "${data.title}" has been created`);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      riskStatus: undefined,
      riskScore: 0,
      threatPageUrl: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    casesMutation.mutate(values);
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <h1 className="text-2xl font-semibold tracking-tight mb-10">
            Create a Case
          </h1>
          <Card className="max-w-[700px] mb-14">
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
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Case Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid w-full items-center gap-2 mt-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2 mt-6">
                {/* <Label htmlFor="risk-status">Risk Status</Label>
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
                </Select> */}
                <FormField
                  control={form.control}
                  name="riskStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Risk Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Risk Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2 mt-6">
                <RiskScoreSlider defaultValue={[0]} />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2 mt-8">
                <Label htmlFor="suspect-type">Suspect Type</Label>
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

              <div className="grid w-full max-w-sm items-center gap-2 mt-8">
                <Label htmlFor="email">Assignee</Label>
                <p className="text-sm text-muted-foreground">
                  Select an analyst to be in charge of this case.
                </p>
                <ComboBox />
              </div>
              <div className="grid w-full max-w-sm items-center gap-2 mt-6">
                <FormField
                  control={form.control}
                  name="threatPageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threat Page Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Page URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <div className="fixed bottom-0 flex justify-center gap-4 w-[calc(100%-300px)] py-2 px-3 bg-white border-t-2">
            <Button
              variant="outline"
              className="w-[150px]"
              onClick={() => toast.success("abc")}
            >
              <LuTrash2 className="w-5 h-5 mr-2" />
              Discard
            </Button>
            <Button className="w-[150px]" type="submit">
              <LuPlus className="w-5 h-5 mr-2" />
              Create Case
            </Button>
          </div>
        </form>
      </Form>
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}

export default CreateEditCase;
