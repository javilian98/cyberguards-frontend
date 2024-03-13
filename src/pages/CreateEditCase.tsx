import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardDescription,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RiskScoreSlider from "@/components/RiskScoreSlider/RiskScoreSlider";

import {
  LuAlertCircle,
  LuAlertTriangle,
  LuCheck,
  LuCheckCircle,
  LuChevronsUpDown,
  LuContact2,
  LuExternalLink,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCase, getCase, updateCase } from "@/api/casesApi";
import { getUserList } from "@/api/usersApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CASE_STATUS, UserListItem } from "@/types/types";
import { LucideNotebookPen } from "lucide-react";
import { useThreatStore } from "@/stores/useThreatStore";

const assigneeSuspectedUserSchema = z
  .object({
    id: z.string().nullable(),
    fullName: z.string().nullable(),
  })
  .optional();
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description cannot be empty.",
  }),
  riskScore: z.array(z.number()).length(1),
  assignee: z.union([assigneeSuspectedUserSchema, z.undefined()]).optional(),
  caseStatus: z.number().refine(
    (value) => {
      // Custom validation logic for caseStatus
      return Object.values(CASE_STATUS).includes(value as CASE_STATUS);
    },
    {
      message: "Invalid case status.",
    }
  ),
  threatPageUrl: z.string().url(),
});

function CreateEditCase() {
  const { id } = useParams(); // Get the case ID from the URL params
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const isSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.isSingleRowActionDialogOpen
  );
  const setSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.setSingleRowActionDialogOpen
  );

  const currentSelectedEmployee = useThreatStore(
    (state) => state.currentSelectedEmployee
  );
  const resetCurrentSelectedEmployee = useThreatStore(
    (state) => state.resetCurrentSelectedEmployee
  );
  const logType = useThreatStore((state) => state.logType);
  const resetLogType = useThreatStore((state) => state.resetLogType);
  const currentSelectedLog = useThreatStore(
    (state) => state.currentSelectedLog
  );
  const resetCurrentSelectedLog = useThreatStore(
    (state) => state.resetCurrentSelectedLog
  );

  const [isFormEdited, setFormEdited] = useState(false);
  const [logIdValue, setLogIdValue] = useState("");

  const {
    data: caseDetailData,
    error: caseDetailError,
    isLoading: isCaseDetailLoading,
  } = useQuery({
    queryKey: ["cases", id],
    queryFn: async () => {
      const data = await getCase(id as string);

      console.log("data ", data);

      form.setValue("title", data.title);
      form.setValue("description", data.description);
      form.setValue("riskScore", [data.riskScore]);
      form.setValue("threatPageUrl", data.threatPageUrl);

      form.setValue("assignee", {
        id: data.assigneeId ?? null,
        fullName: data.assignee?.fullName ?? null,
      });

      form.setValue("caseStatus", data.caseStatus);

      const logIdComputed = computeLogIdValue(data.threatPageUrl);
      setLogIdValue(logIdComputed);

      return data;
    },
    enabled: !!id, // query is only triggered if id is not undefined
  });

  const createCaseMutation = useMutation({
    mutationKey: ["cases"],
    mutationFn: async (caseItem: z.infer<typeof formSchema>) => {
      const assigneeFormValue = form.getValues().assignee;
      const assigneeFound = assigneeListData?.find((assignee) => {
        const fullName = assignee.firstName + " " + assignee.lastName;

        return fullName === assigneeFormValue?.fullName;
      });

      const logIdVal = currentSelectedLog?.logId ?? logIdValue;

      return await createCase({
        ...caseItem,
        riskScore: caseItem.riskScore[0],
        assigneeId: assigneeFound?.id,
        caseStatus: caseItem.caseStatus,
        suspectedUserId: "0",
        suspectTypeId: 0,
        logId: logIdVal,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      await queryClient.invalidateQueries({ queryKey: ["cases_threatlogid"] });
      console.log(`Case "${data.title}" has been created`);

      navigate("/cases");
      toast.success(`Case "${data.title}" has been created`);
    },
  });

  const updateCaseMutation = useMutation({
    mutationKey: ["updatecase", id],
    mutationFn: async (caseItem: z.infer<typeof formSchema>) => {
      const assigneeFormValue = form.getValues().assignee;
      const assigneeFound = assigneeListData?.find((assignee) => {
        const fullName = assignee.firstName + " " + assignee.lastName;

        return fullName === assigneeFormValue?.fullName;
      });

      const logIdVal = currentSelectedLog?.logId ?? logIdValue;

      return await updateCase(
        {
          ...caseItem,
          riskScore: caseItem.riskScore[0],
          assigneeId: assigneeFound?.id,
          caseStatus: caseItem.caseStatus,
          suspectedUserId: "0",
          suspectTypeId: 0,
          logId: logIdVal,
        },
        id as string
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      // await queryClient.invalidateQueries({ queryKey: ["cases_threatlogid"] });
      console.log(`Case "${data.title}" has been updated`);

      navigate("/cases");
      toast.success(`Case "${data.title}" has been updated`);
    },
  });

  const { data: assigneeListData } = useQuery({
    queryKey: ["assignees"],
    queryFn: async () => {
      // roleId: 1 is analyst
      const data = await getUserList();
      return data;
    },
  });

  const computeThreatUrl = useCallback(() => {
    if (
      currentSelectedEmployee == undefined ||
      logType == "" ||
      currentSelectedLog == undefined
    )
      return undefined;

    return `http://localhost:5173/threats/employee/${currentSelectedEmployee?.id}/${logType}/${currentSelectedLog?.logId}`;
  }, [currentSelectedEmployee, logType, currentSelectedLog]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      riskScore: [0],
      assignee: {
        id: "",
        fullName: "",
      },
      caseStatus: caseDetailData ? caseDetailData.caseStatus : CASE_STATUS.open,
      threatPageUrl: "",
    },
  });

  const [isAssigneeChanged, setIsAssigneeChanged] = useState(false);

  useEffect(() => {
    setFormEdited(form.formState.isDirty || isAssigneeChanged);
  }, [form.formState.isDirty, isAssigneeChanged]);

  useEffect(() => {
    form.setValue("threatPageUrl", computeThreatUrl() as string);

    const logIdReceived = computeLogIdValue(computeThreatUrl() as string);
    setLogIdValue(logIdReceived);

    return () => {
      resetCurrentSelectedEmployee();
      resetLogType();
      resetCurrentSelectedLog();
    };
  }, [
    form,
    computeThreatUrl,
    resetCurrentSelectedEmployee,
    resetLogType,
    resetCurrentSelectedLog,
  ]);

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("aaa ", values);

    // if case exists, update the form
    if (caseDetailData) {
      updateCaseMutation.mutate(values);
      return;
    }

    // else create a new form
    createCaseMutation.mutate(values);
  };

  const handleBackDialogVisibility = () => {
    if (!isFormEdited) {
      navigate("/cases");
      return;
    }
    setSingleRowActionDialogOpen(true);
  };

  const handleDiscardChanges = () => {
    form.reset();
    navigate("/cases");
  };

  const renderSubmitButton = () => {
    if (caseDetailData) {
      return (
        <Button className="w-[150px]" type="submit" disabled={!isFormEdited}>
          <LuCheckCircle className="w-5 h-5 mr-2" />
          Update Case
        </Button>
      );
    }
    return (
      <Button className="w-[150px]" type="submit">
        <LuPlus className="w-5 h-5 mr-2" />
        Create Case
      </Button>
    );
  };

  const computeFullName = (
    user: UserListItem | undefined,
    defaultText: string = ""
  ) => {
    if (user == undefined) {
      return defaultText;
    }
    return `${user.firstName} ${user.lastName}`;
  };

  function computeUrlForwardSlashCount(url: string) {
    // Regular expression to match forward slashes
    const forwardSlashRegex = /\//g;

    // Count the number of matches
    const count = (url.match(forwardSlashRegex) || []).length;

    return count;
  }

  const computeLogIdValue = (threatPageUrl: string) => {
    console.log("computeLogIdValue ", threatPageUrl);

    if (threatPageUrl == undefined) return "";

    // Split the threatPageUrl by forward slashes
    const urlParts = threatPageUrl.split("/");
    // Extract the value after the fifth forward slash
    const logId = urlParts[7];

    return logId;
  };

  const handleThreatPageUrlChange = (value: string) => {
    const threatPageUrl = value;
    const forwardSlashCount = computeUrlForwardSlashCount(threatPageUrl);

    // Check if the forwardSlashCount is equal to 5
    if (forwardSlashCount === 7) {
      const logId = computeLogIdValue(threatPageUrl);
      // Set the logIdValue state
      setLogIdValue(logId);

      console.log("REACHEDDDDDD", logId == "");
    } else {
      // If forwardSlashCount is less than 5, reset the logIdValue state
      setLogIdValue("");
    }
  };

  if (isCaseDetailLoading) {
    return <div>Loading...</div>;
  }

  if (caseDetailError) {
    return <div>Case Detail cannot be found.</div>;
  }

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <h1 className="text-3xl font-semibold tracking-tight mb-10">
            {caseDetailData?.title ?? "Create a Case"}
          </h1>
          <Card className="max-w-[700px] mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LuAlertTriangle className="w-6 h-6 mr-3" />
                Threat Source
              </CardTitle>
              <CardDescription>
                Where is the source of threat this case is based on?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="min-w-[400px] mb-4">
                <FormField
                  // disabled
                  control={form.control}
                  name="threatPageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threat Page Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Page URL"
                          {...field}
                          onChange={(value) => {
                            console.log(
                              "value ",
                              value.target.value.toString()
                            );

                            field.onChange(value);
                            handleThreatPageUrlChange(value.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {caseDetailData?.threatPageUrl && (
                <Dialog>
                  <DialogTrigger>
                    <Button type="button" variant={"secondary"} asChild>
                      <Link
                        to={
                          caseDetailData?.threatPageUrl ??
                          computeThreatUrl() ??
                          ""
                        }
                      >
                        Go To Threat
                        <LuExternalLink className="w-5 h-5 ml-3" />
                      </Link>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>

          <Card className="max-w-[700px] mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LucideNotebookPen className="w-6 h-6 mr-3" />
                Case Details
                {/* <Button>
                  <LuImport className="w-5 h-5 mr-3" />
                  Import Threat
                </Button> */}
              </CardTitle>
              <CardDescription>
                Fill in relevant information about this particular case.
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
                      <FormLabel>Case Note</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here."
                          rows={8}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-2 mt-6">
                <FormField
                  control={form.control}
                  name="riskScore"
                  render={({ field: { value, onChange } }) => (
                    <RiskScoreSlider
                      defaultValue={value}
                      handleValueChange={onChange}
                    />
                  )}
                />
              </div>

              <div className="grid w-full max-w-sm items-center gap-2 mt-6">
                <FormField
                  control={form.control}
                  name="caseStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Status</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value?.toString()}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Case Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Case Status</SelectLabel>
                            <SelectItem value={CASE_STATUS.open.toString()}>
                              Open
                            </SelectItem>
                            <SelectItem value={CASE_STATUS.assigned.toString()}>
                              Assigned
                            </SelectItem>
                            <SelectItem
                              value={CASE_STATUS.inProgress.toString()}
                            >
                              In-Progress
                            </SelectItem>
                            <SelectItem value={CASE_STATUS.closed.toString()}>
                              Closed
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-[700px] mb-16">
            <CardHeader>
              <CardTitle className="flex items-center">
                <LuContact2 className="w-6 h-6 mr-3" />
                Case Assignee
                {/* <Button>
                  <LuImport className="w-5 h-5 mr-3" />
                  Import Threat
                </Button> */}
              </CardTitle>
              <CardDescription>
                Assign an analyst to be in charge of this case.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-2">
                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Assignee</FormLabel>
                      {/* <p className="text-sm text-muted-foreground">
                        Select an analyst to be in charge of this case.
                      </p> */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={!assigneeListData}
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {computeFullName(
                                assigneeListData?.find(
                                  (assignee) =>
                                    computeFullName(assignee) ===
                                    field.value?.fullName
                                ),
                                "Select Assignee"
                              )}
                              <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search analyst..." />
                            <CommandEmpty>No user found.</CommandEmpty>
                            <CommandGroup>
                              {assigneeListData?.map((assignee) => (
                                <CommandItem
                                  value={computeFullName(assignee)}
                                  key={computeFullName(assignee)}
                                  onSelect={() => {
                                    form.setValue("assignee", {
                                      id: assignee.id,
                                      fullName: computeFullName(assignee),
                                    });

                                    console.log("assigneeee");

                                    setIsAssigneeChanged(true);
                                  }}
                                >
                                  <LuCheck
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      computeFullName(assignee) ===
                                        field.value?.fullName
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {computeFullName(assignee)}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                      {!assigneeListData && (
                        <FormDescription className="flex items-center gap-1 text-red-500">
                          <LuAlertCircle />
                          Unable to select an assignee at the moment
                        </FormDescription>
                      )}
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
              onClick={handleBackDialogVisibility}
              type="button"
            >
              <LuTrash2 className="w-5 h-5 mr-2" />
              Discard
            </Button>
            {renderSubmitButton()}
          </div>
        </form>
      </Form>
      <AlertDialog
        open={isSingleRowActionDialogOpen}
        onOpenChange={() => setSingleRowActionDialogOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to discard your changes?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will remove all your inputs and
              bring you back to list of cases.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setSingleRowActionDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDiscardChanges}>
              Discard Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CreateEditCase;
