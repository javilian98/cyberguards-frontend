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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RiskScoreSlider from "@/components/RiskScoreSlider/RiskScoreSlider";

import {
  LuAlertCircle,
  LuCheck,
  LuCheckCircle,
  LuChevronsUpDown,
  LuExternalLink,
  LuImport,
  LuMoreHorizontal,
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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCase, getCase, updateCase } from "@/api/casesApi";
import { getUserList } from "@/api/usersApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CASE_STATUS, UserListItem } from "@/types/types";

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
  riskStatus: z.enum(["low", "medium", "high"], {
    required_error: "Risk Status must be selected.",
  }),
  riskScore: z.array(z.number()).length(1),
  // assignee: z
  //   .string()
  //   .min(2, {
  //     message: "You must select an assignee",
  //   })
  //   .optional(),
  assignee: z.union([assigneeSuspectedUserSchema, z.undefined()]).optional(),
  suspectedUser: z
    .union([assigneeSuspectedUserSchema, z.undefined()])
    .optional(),
  caseStatus: z.nativeEnum(CASE_STATUS, {
    required_error: "Case Status Must be selected.",
  }),
  // suspectType: z.number(),
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

  const [isFormEdited, setFormEdited] = useState(false);
  const [showSuspectDropdown, setShowSuspectDropdown] = useState(false);

  const {
    data: caseDetailData,
    error: caseDetailError,
    isLoading: isCaseDetailLoading,
  } = useQuery({
    queryKey: ["cases", id],
    queryFn: async () => {
      const data = await getCase(id as string);

      console.log("data ", data);

      // Object.keys(data).forEach((key) => {
      //   console.log("key", key);
      // });

      form.setValue("title", data.title);
      form.setValue("description", data.description);
      form.setValue("riskStatus", data.riskStatus);
      form.setValue("riskScore", [data.riskScore]);
      form.setValue("threatPageUrl", data.threatPageUrl);
      form.setValue("assignee", {
        id: data.assigneeId ?? null,
        fullName: data.assignee?.fullName ?? null,
      });
      form.setValue("suspectedUser", {
        id: data.suspectedUserId ?? null,
        fullName: data.suspectedUser?.fullName ?? null,
      });
      form.setValue("caseStatus", data.caseStatus as unknown as CASE_STATUS);

      console.log("form values ", form.getValues());

      return data;
    },
    enabled: !!id, // query is only triggered if id is not undefined
  });

  const createCaseMutation = useMutation({
    mutationKey: ["cases"],
    mutationFn: async (caseItem: z.infer<typeof formSchema>) => {
      const assigneeFormValue = form.getValues().assignee;
      const suspectedUserFormValue = form.getValues().suspectedUser;

      const assigneeFound = assigneeListData?.find((assignee) => {
        const fullName = assignee.firstName + " " + assignee.lastName;

        return fullName === assigneeFormValue?.fullName;
      });

      const suspectedUserFound = suspectedUserListData?.find(
        (suspectedUser) => {
          const fullName =
            suspectedUser.firstName + " " + suspectedUser.lastName;

          return fullName === suspectedUserFormValue?.fullName;
        }
      );

      return await createCase({
        ...caseItem,
        riskScore: caseItem.riskScore[0],
        assigneeId: assigneeFound?.id,
        caseStatus: Number(caseItem.caseStatus),
        suspectedUserId: suspectedUserFound?.id,
      });
    },
    onError: () => {},
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      console.log(`Case "${data.title}" has been created`);

      navigate("/cases");
      toast.success(`Case "${data.title}" has been created`);
    },
  });

  const updateCaseMutation = useMutation({
    mutationKey: ["updatecase", id],
    mutationFn: async (caseItem: z.infer<typeof formSchema>) => {
      const assigneeFormValue = form.getValues().assignee;
      const suspectedUserFormValue = form.getValues().suspectedUser;

      const assigneeFound = assigneeListData?.find((assignee) => {
        const fullName = assignee.firstName + " " + assignee.lastName;

        return fullName === assigneeFormValue?.fullName;
      });

      const suspectedUserFound = suspectedUserListData?.find(
        (suspectedUser) => {
          const fullName =
            suspectedUser.firstName + " " + suspectedUser.lastName;

          return fullName === suspectedUserFormValue?.fullName;
        }
      );

      console.log("updateCase ", caseItem);

      return await updateCase(
        {
          ...caseItem,
          riskScore: caseItem.riskScore[0],
          assigneeId: assigneeFound?.id,
          caseStatus: Number(caseItem.caseStatus),
          suspectedUserId: suspectedUserFound?.id,
        },
        id as string
      );
    },
    onError: () => {},
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["cases"] });
      console.log(`Case "${data.title}" has been updated`);

      navigate("/cases");
      toast.success(`Case "${data.title}" has been updated`);
    },
  });

  const { data: assigneeListData } = useQuery({
    queryKey: ["assignees"],
    queryFn: async () => {
      // roleId: 1 is analyst
      const data = await getUserList({ roleId: 1 });

      // setUsers(data);
      return data;
    },
  });

  const { data: suspectedUserListData } = useQuery({
    queryKey: ["suspectedUsers"],
    queryFn: async () => {
      // roleId: 1 is analyst
      const data = await getUserList({ roleId: 0 });

      // setUsers(data);
      return data;
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      riskStatus: undefined,
      riskScore: [0],
      assignee: {
        id: "",
        fullName: "",
      },
      suspectedUser: {
        id: "",
        fullName: "",
      },
      caseStatus: caseDetailData
        ? (caseDetailData.caseStatus as unknown as CASE_STATUS)
        : (1 as unknown as CASE_STATUS),
      threatPageUrl: "",
    },
  });

  useEffect(() => {
    setFormEdited(form.formState.isDirty);
  }, [form.formState.isDirty]);

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
    // console.log("caseDetailData ", caseDetailData);

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
          <h1 className="text-2xl font-semibold tracking-tight mb-10">
            {caseDetailData?.title ?? "Create a Case"}
          </h1>
          <Card className="max-w-[700px] mb-14">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Case Details
                <Button>
                  <LuImport className="w-5 h-5 mr-3" />
                  Import Threat
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
                            <SelectLabel>Risk Status</SelectLabel>
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

              <div className="flex ">
                <div className="grid w-full max-w-sm items-center gap-2 mt-8">
                  {caseDetailData?.suspectedUser?.fullName &&
                    !showSuspectDropdown && (
                      <>
                        <FormLabel>User Suspect</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Select a user as suspect for this case.
                        </p>
                        <div className="flex gap-2">
                          <Link to={`/users/${caseDetailData.suspectedUserId}`}>
                            <Button
                              type="button"
                              variant={"destructive"}
                              className="w-fit"
                            >
                              <LuExternalLink className="w-4 h-4 mr-2" />
                              {caseDetailData?.suspectedUser?.fullName ??
                                form.getValues().suspectedUser?.fullName}
                            </Button>
                          </Link>
                          <Button
                            type="button"
                            variant={"outline"}
                            className="w-fit"
                            onClick={() =>
                              setShowSuspectDropdown(!showSuspectDropdown)
                            }
                          >
                            <LuMoreHorizontal />
                          </Button>
                        </div>
                      </>
                    )}

                  {showSuspectDropdown && (
                    <FormField
                      control={form.control}
                      name="suspectedUser"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>User Suspect</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Select a user as suspect for this case.
                          </p>

                          <Popover>
                            <div className="flex gap-2">
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    disabled={!suspectedUserListData}
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[200px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {computeFullName(
                                      suspectedUserListData?.find(
                                        (suspectedUser) =>
                                          computeFullName(suspectedUser) ===
                                          field.value?.fullName
                                      ),
                                      "Select User Suspect"
                                    )}
                                    <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <Button
                                type="button"
                                variant={"outline"}
                                className="w-fit"
                                onClick={() =>
                                  setShowSuspectDropdown(!showSuspectDropdown)
                                }
                              >
                                <LuMoreHorizontal />
                              </Button>
                            </div>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search user suspect..." />
                                <CommandEmpty>No user found.</CommandEmpty>
                                <CommandGroup>
                                  {suspectedUserListData?.map(
                                    (suspectedUser) => (
                                      <CommandItem
                                        value={computeFullName(suspectedUser)}
                                        key={computeFullName(suspectedUser)}
                                        onSelect={() => {
                                          form.setValue("suspectedUser", {
                                            id: suspectedUser.id,
                                            fullName:
                                              computeFullName(suspectedUser),
                                          });
                                        }}
                                      >
                                        <LuCheck
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            computeFullName(suspectedUser) ===
                                              field.value?.fullName
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {computeFullName(suspectedUser)}
                                      </CommandItem>
                                    )
                                  )}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                          {!assigneeListData && (
                            <FormDescription className="flex items-center gap-1 text-red-500">
                              <LuAlertCircle />
                              Unable to select a user suspect at the moment
                            </FormDescription>
                          )}
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-2 mt-8">
                  <Label htmlFor="suspect-type">Suspect Type</Label>
                  <p className="text-sm text-muted-foreground">
                    Select a user as suspect for this case.
                  </p>
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
              </div>

              <div className="grid w-full max-w-sm items-center gap-2 mt-8">
                <FormField
                  control={form.control}
                  name="assignee"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Assignee</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Select an analyst to be in charge of this case.
                      </p>
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
              <div className="grid w-full max-w-sm items-center gap-2 mt-6">
                <FormField
                  control={form.control}
                  name="caseStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                        value={field.value.toString()}
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
