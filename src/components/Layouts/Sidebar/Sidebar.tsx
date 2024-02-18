import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  FiHome,
  FiAlertTriangle,
  FiUsers,
  FiFolderMinus,
} from "react-icons/fi";

import AvatarMenu from "@/components/AvatarMenu/AvatarMenu";

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
      path: "/userdetail",
      name: "UserDetail",
      icon: <FiUsers className="h-5 w-5 mr-3" />,
    },
    {
      path: "/cases",
      name: "Cases",
      icon: <FiFolderMinus className="h-5 w-5 mr-3" />,
    },
  ];

  return (
    <>
      <div className="fixed z-10 bg-white space-y-4 py-4 border-r-2 min-h-dvh w-[300px] flex flex-col justify-between">
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
          <AvatarMenu name="John Doe" imgSrc="https://github.com/shadcn.png" />
        </div>
      </div>
    </>
  );
}
