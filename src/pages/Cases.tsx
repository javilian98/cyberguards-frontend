// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCaseStore } from "@/stores/useCaseStore";
import { useAlertDialogStore } from "@/stores/useAlertDialogStore";

import { DataTable } from "@/components/DataTable/DataTable";
import Search from "@/components/Search/Search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import FixedHeader from "@/components/Layouts/Header/FixedHeader";
import { casesColumns } from "@/components/DataTable/Cases/CasesColumns";

import { LuPlus } from "react-icons/lu";
import { deleteCase, getCaseList } from "@/api/casesApi";
import { toast, Toaster } from "sonner";

function Cases() {
  const cases = useCaseStore((state) => state.cases);
  const setCases = useCaseStore((state) => state.setCases);
  const selectedCases = useCaseStore((state) => state.selectedCases);
  const setSelectedCases = useCaseStore((state) => state.setSelectedCases);
  const currentSelectedCase = useCaseStore(
    (state) => state.currentSelectedCase
  );

  const isSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.isSingleRowActionDialogOpen
  );
  const setSingleRowActionDialogOpen = useAlertDialogStore(
    (state) => state.setSingleRowActionDialogOpen
  );

  const queryClient = useQueryClient();

  const casesQuery = useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const data = await getCaseList();
      setCases(data);
      return data;
    },
  });

  const deleteCaseMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteCase(id);
    },
    onSuccess: () => {
      const newCases = cases.filter(
        (item) => item.id !== currentSelectedCase.id
      );
      setCases(newCases);
      toast.success("Case deleted successfully");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cases"] });
      }
    },
  });

  const deleteMultipleCasesMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => deleteCase(id)));
    },
    onSuccess: () => {
      const newCases = cases.filter(
        (item) =>
          !selectedCases.some((selectedCase) => selectedCase.id === item.id)
      );
      setCases(newCases);
      setSelectedCases([]);
      toast.success("Cases deleted successfully");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["cases"] });
      }
    },
  });

  const handleDelete = () => {
    deleteCaseMutation.mutate(currentSelectedCase.id);
  };

  const handleDeleteAllSelected = () => {
    const selectedCaseIds = selectedCases.map((caseItem) => caseItem.id);
    deleteMultipleCasesMutation.mutate(selectedCaseIds);
  };

  return (
    <>
      <FixedHeader>
        <Search placeholderText="Search case title" drawerTitle="Filter Cases">
          asd
        </Search>

        <Link to="/cases/create">
          <Button>
            <LuPlus className="w-5 h-5 mr-2 text-white" />
            Create Case
          </Button>
        </Link>
      </FixedHeader>

      <Tabs defaultValue="all cases" className="mt-20">
        <TabsList>
          <TabsTrigger value="all cases" className="w-[200px]">
            All Cases
          </TabsTrigger>
          <TabsTrigger value="my cases" className="w-[200px]">
            My Cases
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all cases" className="mt-4">
          <DataTable
            columns={casesColumns}
            data={casesQuery.isLoading ? [] : cases}
            actionDelete={handleDeleteAllSelected}
          />
        </TabsContent>
        <TabsContent value="my cases">
          <DataTable
            columns={casesColumns}
            data={cases.filter((item) => item.assignee === "John Doe")}
          />
        </TabsContent>
      </Tabs>

      <AlertDialog
        open={isSingleRowActionDialogOpen}
        onOpenChange={() => setSingleRowActionDialogOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this case?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              case.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setSingleRowActionDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster position="top-right" closeButton richColors />
    </>
  );
}

export default Cases;
