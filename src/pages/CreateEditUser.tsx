import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Form,
  FormControl,
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

import { LuCheckCircle, LuPlus, LuTrash2 } from "react-icons/lu";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUser, updateUser } from "@/api/usersApi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";
import { useEffect, useState } from "react";
import {
  UserDetail,
  // ROLE_ID,
  UserListItem,
} from "@/types/types";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name cannot be empty.",
  }),
  lastName: z.string().min(1, {
    message: "Last name cannot be empty.",
  }),
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
});

function CreateEditUser() {
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

  const {
    data: userDetailData,
    error: userDetailError,
    isLoading: isUserDetailLoading,
  } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const data = await getUser(id as string);

      form.setValue("firstName", data.firstName);
      form.setValue("lastName", data.lastName);
      form.setValue("email", data.email);
      // form.setValue("roleId", data.roleId as unknown as ROLE_ID);

      return data;
    },
    enabled: !!id, // query is only triggered if id is not undefined
  });

  const createUserMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: async (userItem: z.infer<typeof formSchema>) => {
      return await createUser({
        ...userItem,
        // roleId: Number(userItem.roleId),
        roleId: 1,
      });
    },
    onError: () => {},
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(`User "${data.firstName} ${data.lastName}" has been created`);

      navigate("/users");
      toast.success(
        `User "${data.firstName} ${data.lastName}" has been created`
      );
    },
  });

  const updateUserMutation = useMutation({
    mutationKey: ["updatecase", id],
    mutationFn: async (userItem: z.infer<typeof formSchema>) => {
      return await updateUser(
        {
          ...userItem,
          roleId: 1,
        },
        id as string
      );
    },
    onError: () => {},
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      navigate("/users");
      toast.success(
        `User "${data.firstName} ${data.lastName}" has been updated`
      );
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      // roleId: userDetailData
      //   ? (userDetailData.roleId as unknown as ROLE_ID)
      //   : (0 as unknown as ROLE_ID),
    },
  });

  useEffect(() => {
    setFormEdited(form.formState.isDirty);
  }, [form.formState.isDirty]);

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("aaa ", values);

    // if case exists, update the form
    if (userDetailData) {
      updateUserMutation.mutate(values);
      return;
    }

    // else create a new form
    createUserMutation.mutate(values);
  };

  const handleBackDialogVisibility = () => {
    if (!isFormEdited) {
      navigate(`/users/${id}`);
      return;
    }
    setSingleRowActionDialogOpen(true);
  };

  const handleDiscardChanges = () => {
    form.reset();
    navigate(`/users/${id}`);
  };

  const renderSubmitButton = () => {
    if (userDetailData) {
      return (
        <Button className="w-[150px]" type="submit" disabled={!isFormEdited}>
          <LuCheckCircle className="w-5 h-5 mr-2" />
          Update Analyst
        </Button>
      );
    }
    return (
      <Button className="w-[150px]" type="submit">
        <LuPlus className="w-5 h-5 mr-2" />
        Create Analyst
      </Button>
    );
  };

  const computeFullName = (user: UserListItem | undefined) => {
    if (user == undefined) {
      return "Select Assignee";
    }
    return `${user.firstName} ${user.lastName}`;
  };

  const renderPageTitle = (userDetailData: UserDetail | undefined) => {
    if (userDetailData == undefined) return "Analyst's Profile";

    return `${computeFullName(userDetailData)}'s Profile`;
  };

  if (isUserDetailLoading) {
    return <div>Loading...</div>;
  }

  if (userDetailError) {
    return <div>Analyst Detail cannot be found.</div>;
  }

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <h1 className="text-2xl font-semibold tracking-tight mb-10">
            {"Edit Analyst's Profile" ?? "Create an Analyst"}
          </h1>
          <Card className="max-w-[700px] mb-14">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {renderPageTitle(userDetailData)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid w-full items-center gap-2 mt-6">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid w-full items-center gap-2 mt-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className="grid w-full max-w-sm items-center gap-2 mt-6">
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Account Role</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Risk Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value={ROLE_ID.normal.toString()}>
                              Normal User
                            </SelectItem>
                            <SelectItem value={ROLE_ID.analyst.toString()}>
                              Analyst
                            </SelectItem>
                            <SelectItem value={ROLE_ID.admin.toString()}>
                              Admin
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}
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
              bring you back to list of users.
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

export default CreateEditUser;
