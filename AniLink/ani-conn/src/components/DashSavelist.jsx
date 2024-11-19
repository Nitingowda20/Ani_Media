import React from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

export default function DashSavelist() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const res = await fetch(`/api/post/getpost`);
  //     const data = await res.json();
  //     setSavedPosts(data.posts);
  //   };
  //   fetchPost();
  // }, []);

  useEffect(() => {
    const fetchSavedPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/savelist/getSavedPosts?userId=${currentUser.id}`
        );
        if (!res.ok) {
          if (res.status === 404) {
            // Easily handle no saved posts scenario
            console.warn("No saved posts found.");
            setSavedPosts([]); // Set an empty array
            return;
          }
          throw new Error("Failed to fetch saved posts");
        }
        const data = await res.json();
        console.log("Fetched saved posts:", data);
        const Posts = data.savedPosts.map((savedPost) => savedPost.post);
        setSavedPosts(Posts); // Assuming the API returns saved posts in this format
      } catch (error) {
        console.log("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedPost();
  }, [currentUser.id, location]);

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/savelist/getSavedPosts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Saved Posts:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading && savedPosts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {savedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
