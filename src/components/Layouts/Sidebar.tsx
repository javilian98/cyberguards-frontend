import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  FiHome,
  FiAlertTriangle,
  FiUsers,
  FiFolderMinus,
} from "react-icons/fi";

export default function Sidebar() {
  const { pathname } = useLocation();

  const renderActiveLinkStyle = (pathname: string, selectedPath: string) => {
    if (pathname === selectedPath) return "secondary";

    return "ghost";
  };

  const links = [
    {
      path: "/",
      name: "Home",
      icon: <FiHome className="h-5 w-5 mr-3" />,
    },
    {
      path: "/threats",
      name: "Threats",
      icon: <FiAlertTriangle className="h-5 w-5 mr-3" />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FiUsers className="h-5 w-5 mr-3" />,
    },
    {
      path: "/cases",
      name: "Cases",
      icon: <FiFolderMinus className="h-5 w-5 mr-3" />,
    },
  ];

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
            <div className="space-y-1">
              {links.map((linkItem) => {
                return (
                  <Link key={linkItem.path} to={linkItem.path}>
                    <Button
                      variant={renderActiveLinkStyle(pathname, linkItem.path)}
                      className="w-full justify-start"
                    >
                      {linkItem.icon}
                      {linkItem.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-4">
          <Separator className="mb-4" />
          <Button variant="ghost" className="w-full justify-start">
            <Avatar className="w-10 h-10 bg-gray-600 mr-3 rounded-full">
              <AvatarImage src="https://github.com/shadcn.pnga" />
              <AvatarFallback className="bg-blue-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            John Doe
          </Button>
        </div>
      </div>
    </div>
  );
}
