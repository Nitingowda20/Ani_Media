import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignOutPage() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the fade-in animation when the component mounts
    setFormVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.message === "User already exist") {
          setErrorMessage("Email is already in use");
          setLoading(false);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        return;
      }
      if (data.success === false) {
        return setErrorMessage(error.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div
        className={`flex w-full max-w-5xl mx-auto p-5 md:p-10 bg-gray-800 rounded-lg shadow-lg transform transition-all duration-700 ease-out ${
          formVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10"
        }`}
      >
        {/* Left Side (Description) */}
        <div className="flex-1 p-8 text-white space-y-4">
          <Link to="/" className="text-4xl font-bold">
            <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-red-500 rounded-lg text-white">
              Techie
            </span>{" "}
            Blog
          </Link>
          <p className="text-lg mt-4 leading-relaxed">
            Welcome to our community! By joining, you're staying ahead in the
            fast-paced world of technology. Our blog is here to support your
            journey. Get ready to explore, learn, and grow with content tailored
            for developers like you!
          </p>
        </div>

        {/* Right Side (Sign-Up Form) */}
        <div className="flex-1 bg-gray-700 p-8 pl-9 ml-5 rounded-lg shadow-md">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-600 hover:scale-105"
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-600 hover:scale-105"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
                className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-600 hover:scale-105"
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
              outline
              className="w-full transition-all duration-300 ease-in-out hover:scale-105"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-400">Have an account?</span>
            <Link
              to={"/sign-in"}
              className="text-blue-500 ml-1 transition-all duration-300 ease-in-out hover:text-blue-400"
            >
              Sign in
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
