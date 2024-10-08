import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/post/getpost`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPost();
  }, []);
  return (
    <div className=" w-full flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto">
      <div className="text-3xl font-bold lg:text-6xl">
        <h1>Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-5">
          In the ever-evolving world of technology, keeping up with new
          programming languages, tools, and frameworks can be a challenge. Our
          blog is dedicated to helping developers stay updated, refine their
          skills, and explore new ideas. We offer content on topics ranging from
          web development and back-end programming to cloud technologies.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          {" "}
          View all post
        </Link>
      </div>
      <div className="min-w-full p-1 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className=" p-3 mx-auto flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-3">
              {posts.map((post) => (
                // console.log("posts");
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Link
        to="/search"
        className="text-center text-xl hover:underline text-teal-500"
      >
        View all post
      </Link>
    </div>
  );
}
