import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  FiHome,
  FiAlertTriangle,
  FiUsers,
  FiFolderMinus,
} from "react-icons/fi";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  //   playlists: Playlist[]
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div>
      <div className="space-y-4 py-4 border-r-2 min-h-dvh w-[300px] flex flex-col justify-between">
        <div>
          <div className="px-7 py-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-600"></div>
              <h2 className="px-4 text-lg font-semibold tracking-tight">
                Cyberguards
              </h2>
            </div>
          </div>
          <div className="px-3 py-2">
            {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Library
          </h2> */}
            <div className="space-y-1">
              <Button variant="secondary" className="w-full justify-start">
                <FiHome className="h-5 w-5 mr-3" />
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FiAlertTriangle className="h-5 w-5 mr-3" />
                Threats
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FiUsers className="h-5 w-5 mr-3" />
                Users
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FiFolderMinus className="h-5 w-5 mr-3" />
                Cases
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4">
          <Separator className="mb-4" />
          <Button variant="ghost" className="w-full justify-start">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M21 15V6" />
              <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path d="M12 12H3" />
              <path d="M16 6H3" />
              <path d="M12 18H3" />
            </svg> */}
            <Avatar className="w-10 h-10 bg-gray-600 mr-3 rounded-full">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            John Doe
          </Button>
        </div>
      </div>
    </div>
  );
}
