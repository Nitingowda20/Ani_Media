import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiDocument, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function DashSlideBar() {
  const location = useLocation();
  const dispatch = useDispatch()
  const {currentUser} =useSelector(state=> state.user)
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  //Signout
  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to={"/Dashboard?tab=dash"}>
              <Sidebar.Item
                as="div"
                active={tab === "dash" || !tab}
                icon={HiChartPie}
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to={"/Dashboard?tab=profile"}>
            <Sidebar.Item
              as="div"
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor={"dark"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to={"/Dashboard?tab=post"}>
              <Sidebar.Item
                as="div"
                active={tab === "post"}
                icon={HiDocumentText}
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/Dashboard?tab=comments"}>
              <Sidebar.Item
                as="div"
                active={tab === "comments"}
                icon={HiDocument}
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/Dashboard?tab=users"}>
              <Sidebar.Item
                as="div"
                active={tab === "users"}
                icon={HiOutlineUserGroup}
              >
                Users
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            className="cursor-pointer"
            icon={HiArrowSmRight}
            onClick={handleSignOut}
          >
            Signout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
