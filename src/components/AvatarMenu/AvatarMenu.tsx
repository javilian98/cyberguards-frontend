import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FiUser, FiLogOut } from "react-icons/fi";

interface AvatarMenuProps {
  name: string;
  imgSrc: string;
}

function AvatarMenu({ name, imgSrc }: AvatarMenuProps) {
  const renderNameInitials = (name: string) => {
    const [firstName, lastName] = name.split("");
    return `${firstName[0]} ${lastName[0]}`;
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Button variant="ghost" className="w-full justify-start">
          <Avatar className="w-10 h-10 bg-gray-600 mr-3 rounded-full">
            <AvatarImage src={imgSrc} />
            <AvatarFallback className="bg-blue-600 text-white">
              {renderNameInitials(name)}
            </AvatarFallback>
          </Avatar>
          {name}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button variant="ghost" className="w-full justify-start">
          <FiUser className="h-5 w-5 mr-3" />
          My Profile
        </Button>
        <Separator className="my-4" />
        <Button variant="ghost" className="w-full justify-start text-red-600">
          <FiLogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default AvatarMenu;
