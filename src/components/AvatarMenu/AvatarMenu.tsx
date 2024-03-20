import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { FiUser, FiLogOut } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { useUserAuthStore } from "@/stores/useUserAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AvatarMenuProps {
  name: string;
  imgSrc: string;
}

function AvatarMenu({ name, imgSrc }: AvatarMenuProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userAuth = useUserAuthStore((state) => state.userAuth);
  const resetUserAuth = useUserAuthStore((state) => state.resetUserAuth);

  const renderNameInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName[0]}${lastName[0]}`;
  };

  const handleLogout = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["users", userAuth.email],
    });

    toast.success("Logged out successfully");

    resetUserAuth();
    navigate("/login");
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Button variant="ghost" className="w-full justify-start">
          <Avatar className="w-10 h-10 bg-gray-600 mr-3 rounded-full">
            <img src={imgSrc} alt={name} />
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
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600"
          onClick={handleLogout}
        >
          <FiLogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default AvatarMenu;
