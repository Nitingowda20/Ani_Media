import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import AboutPage from "./pages/AboutPage";
import HeaderSec from "./components/HeaderSec";
import FooterSec from "./components/FooterSec";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";
import QuizzesPage from "./components/QuizzesPage";
import CodeEditor from "./components/Code-Compiler/CodeEditor";
import { Box } from "@chakra-ui/react";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const App = () => {
  const location = useLocation();

  // Check if the current path is "/editor"
  const isEditorPage = location.pathname === "/editor";

  return (
    <>
      {!isEditorPage && <HeaderSec />}
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/sign-out" element={<SignOutPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route
          path="/terms-and-condition"
          element={<TermsConditionsPage />}
        ></Route>
        <Route
          path="/PrivacyPolicyPage"
          element={<PrivacyPolicyPage />}
        ></Route>
        <Route path="/search" element={<Search />}></Route>
        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        {/* CodeEditor route */}
        <Route
          path="/editor"
          element={
            <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
              <CodeEditor />
            </Box>
          }
        />
        {/* nested routes */}
        <Route>
          <Route path="/quizz" element={<Projects />} />
          <Route path="/quizzes/:topicId" element={<QuizzesPage />} />
        </Route>
        {/* post management routes */}
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
        <Route path="/post/:postSlug" element={<PostPage />}></Route>
      </Routes>

      {/* Always show FooterSec */}
      <FooterSec />
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

export default AppWrapper;
