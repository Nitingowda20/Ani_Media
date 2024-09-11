import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashSlideBar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* <Link to={'/Dashboard?tab=profile'}> */}
          <Sidebar.Item
            href={"/Dashboard?tab=profile"}
            active={tab === "profile"}
            icon={HiUser}
            label={"user"}
            labelColor={"dark"}
          >
            Profile
          </Sidebar.Item>
          {/* </Link> */}
          <Sidebar.Item className="cursor-pointer" icon={HiArrowSmRight}>
            Signout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
