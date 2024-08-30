import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignInPage() {
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
          <p className="text-sm mt-5">
            Join our anime community to stay updated on the latest reviews,
            discussions, and insights.iSgn in to continue exploring your favorite
            series and topics.
          </p>
        </div>

        {/* for Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5">
            <div>
              <Label value="Your UserName" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="Password" id="Ppass" />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit" outline>
              Sign-In
            </Button>
          </form>
          <div className="">
            <span>Create new account.!</span>
            <Link to={"/sign-out"} className="text-blue-500">
              Sign-up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
