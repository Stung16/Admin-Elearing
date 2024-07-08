import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Handlelogout } from "@/services/auth.service";

const ProfileUser = () => {
  const profile = useSelector((state) => state.usersData.profile);
  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="relative bg-gray-700 px-4 text-gray-400 hover:text-white text-sm cursor-pointer">
          <div className="flex items-center min-h-full">
            <div
              className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu-button"
            >
              <img
                className="h-8 w-8 rounded-full"
                src={profile?.avatar}
                alt=""
              />
            </div>

            <div className="flex flex-col ml-4">
              <span>{profile?.name}</span>
              <span>{profile?.types}</span>
            </div>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">My profile</DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            Handlelogout();
            window.location.href = "/auth/login";
          }}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileUser;
