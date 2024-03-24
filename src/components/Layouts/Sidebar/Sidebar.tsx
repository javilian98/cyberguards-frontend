import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  // FiHome,
  FiAlertTriangle,
  FiUsers,
  FiFolderMinus,
} from "react-icons/fi";

import AvatarMenu from "@/components/AvatarMenu/AvatarMenu";

import Logo from "@/assets/logo.jpg";
import { useUserAuthStore } from "@/stores/useUserAuthStore";
import { useEffect } from "react";

export default function Sidebar() {
  const { pathname } = useLocation();
  const userAuth = useUserAuthStore((state) => state.userAuth);

  const renderActiveLinkStyle = (pathname: string, selectedPath: string) => {
    if (
      (selectedPath === "/threats" && pathname.includes("threats")) ||
      (selectedPath === "/users" && pathname.includes("users")) ||
      (selectedPath === "/cases" && pathname.includes("cases"))
    )
      return "bg-slate-700 text-white hover:bg-slate-900 hover:text-white";

    return "ghost";
  };

  useEffect(() => {
    console.log("user auth changed ", userAuth);
  }, [userAuth]);

  const links = [
    // {
    //   path: "/",
    //   name: "Home",
    //   icon: <FiHome className="h-5 w-5 mr-3" />,
    // },
    {
      path: "/threats",
      name: "Threats",
      icon: <FiAlertTriangle className="h-5 w-5 mr-3" />,
    },
    {
      path: "/users",
      name: "Analysts",
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
              <Link to="/threats" className="flex items-center">
                <div className="w-12 h-12 bg-gray-600">
                  <img src={Logo} alt="Cyberguards Logo" />
                </div>

                <h2 className="px-4 text-lg font-semibold tracking-tight">
                  Cyberguards
                </h2>
              </Link>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="space-y-1">
              {links.map((linkItem) => {
                return (
                  <Link key={linkItem.path} to={linkItem.path}>
                    <Button
                      // variant={renderActiveLinkStyle(pathname, linkItem.path)}
                      variant="ghost"
                      className={`w-full justify-start ${renderActiveLinkStyle(
                        pathname,
                        linkItem.path
                      )}`}
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
          <AvatarMenu
            name={`${userAuth.firstName} ${userAuth.lastName}`}
            imgSrc="https://github.com/shadcn.png"
          />
        </div>
      </div>
    </>
  );
}
