import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch , useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignInPage() {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };
  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("All feilds are Required"));
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // formData is your JSON object
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex w-full max-w-5xl mx-auto p-5 md:p-10 bg-gray-800 rounded-lg shadow-lg">
        {/* Left Side (Description) */}
        <div className="flex-1 text-white p-6 space-y-5">
          <Link to="/" className="text-5xl font-bold">
            <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-red-500 rounded-lg text-white">
              AniLink
            </span>{" "}
            Blog
          </Link>
          <p className="text-lg mt-4 leading-relaxed max-h-24 overflow-hidden">
            Welcome back to your developer's haven! Dive into content that helps
            you refine your skills and discover new ideas, covering everything
            from web development to cloud technologies. Let’s explore and grow
            together!
          </p>
        </div>

        {/* Right Side (Login Form) */}
        <div className="flex-1 bg-gray-700 p-8 rounded-lg shadow-md">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="***********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
              outline
              className="w-full"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="mt-5 text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <Link to={"/sign-out"} className="text-blue-500 ml-1">
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}