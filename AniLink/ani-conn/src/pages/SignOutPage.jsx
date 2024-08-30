import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignOutPage() {

  const [formData , setFormData]=useState({})

  const handleChange= (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  // console.log(formData)

  const handleSubmit =async(e)=>{
    e.preventDefault();
  }

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
            discussions, and insights. Sign up now to start your journey into
            the world of anime.
          </p>
        </div>

        {/* for Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <Label value="Your UserName" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="email" placeholder="Email" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Password" id="password"  onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit" outline>
              Sign-Up
            </Button>
          </form>
          <div className="">
            <span>Have an account?</span>
            <Link to={"/sign-in"} className="text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
