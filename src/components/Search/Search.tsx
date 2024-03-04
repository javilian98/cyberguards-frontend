import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuSearch, LuListFilter, LuRotateCw } from "react-icons/lu";
import { ReactNode } from "react";

interface SearchProps {
  placeholderText?: string;
  drawerTitle?: string;
  drawerDescription?: string;
  width?: string;
  onReset?: () => void;
  onApplyFilter?: () => void;
  children: ReactNode;
}

function Search({
  placeholderText = "Search",
  drawerTitle = "Filter",
  drawerDescription,
  width = "500px",
  onReset,
  onApplyFilter,
  children,
}: SearchProps) {
  return (
    <Sheet>
      <div
        className={`relative flex items-center justify-between max-w-[${width}] mb-2`}
      >
        <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder={placeholderText}
          className={`pl-9 min-w-[${width}]`}
        />
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 transform"
          >
            <LuListFilter className="h-4 w-4" />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent>
        <SheetHeader className="mb-8">
          <SheetTitle>{drawerTitle}</SheetTitle>
          <SheetDescription>{drawerDescription}</SheetDescription>
        </SheetHeader>

        {children}

        <SheetFooter className="mt-8">
          <Button variant="outline" onClick={onReset}>
            <LuRotateCw className="mr-2" /> Reset
          </Button>
          <SheetClose asChild>
            <Button onClick={onApplyFilter}>Apply Filter</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Search;
