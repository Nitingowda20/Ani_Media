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
  const {loading , error:errorMessage} = useSelector(state => state.user)
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
      return dispatch(signInFailure("All feilds are Required"))

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
        dispatch(signInFailure(data.message))
      }

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate("/");
      }
    } 
    catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
        dispatch(signInFailure(error.message));

    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8">
        {/* for left */}
        <div className="flex-1 md:items-center">
          <Link to="/" className=" sm:text-4xl font-bold dark:text-blue-400 ">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-red-500 rounded-lg text-white">
              AniLink
            </span>
            Blog
          </Link>
          <p className="text-xl mt-5">
            Join our anime community to stay updated on the latest reviews,
            discussions, and insights. Sign in now to start your journey into
            the world of anime.
          </p>
        </div>

        {/* for Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <Label value="Your UserName" />
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
          <div className="">
            <span>Don't have an account?</span>
            <Link to={"/sign-out"} className="text-blue-500">
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
