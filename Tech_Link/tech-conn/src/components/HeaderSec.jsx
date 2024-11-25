import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  Navbar,
  NavbarCollapse,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { HiDocumentText } from "react-icons/hi";

export default function HeaderSec() {
  const path = useLocation().pathname;
  const location = useLocation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    Navigate(`/search?${searchQuery}`);
  };
  const openInNewTab = (url) => {
    const newTab = window.open(url, "_blank");

    // Ensure the new tab's content is fully loaded before changing the title
    if (newTab) {
      newTab.onload = () => {
        newTab.document.title = "Blog-code-compiler"; // Set the new tab title after it has loaded
      };
    }
  };

  return (
    <Navbar className="border-b-8 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-blue-400"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-red-500 rounded-lg text-white">
          Techie 🌐👨🏻‍💻
        </span>
        
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <Button className="w-12 h-10 lg:hidden self-center" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <NavbarCollapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/quizz"} as={"div"}>
          <Link to={"/quizz"}>Quizzes</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/editor"} as={"div"}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => openInNewTab("/editor")}
          >
            Code-Editor
          </span>
        </Navbar.Link>

        {/* {currentUser.isAdmin && (
          <Navbar.Link active={path === "/create-post"} as={"div"}>
            <Link to={"/create-post"}>Post</Link>
          </Navbar.Link>
        )} */}
      </NavbarCollapse>

      <div className="flex gap-2 mid:order-2">
        <button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* <Link to={"/dashboard"}> */}
            <Link to={"/Dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Link to={"/sign-in"}>
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to={"/sign-in"}>
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign-In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
