import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderSec />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/sign-out" element={<SignOutPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route>
          <Route path="/quizz" element={<Projects />} />
          <Route path="/quizzes/:topicId" element={<QuizzesPage />} />
        </Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
        <Route path="/post/:postSlug" element={<PostPage />}></Route>
      </Routes>

      <FooterSec />
    </BrowserRouter>
  );
}
