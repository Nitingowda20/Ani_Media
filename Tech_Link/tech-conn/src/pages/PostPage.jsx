import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // Track if the user has liked the post
  const [likes, setLikes] = useState(0); // Track the number of likes
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post/getpost?slug=${postSlug}`
        );
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        const fetchedPost = data.posts[0];
        setPost(fetchedPost);
        setLikes(fetchedPost.Numberoflikes || 0); // Set initial likes
        setLoading(false);
        setError(false);

        // Set the initial likes count
        setLikes(fetchedPost.Numberoflikes || 0);

        // Check if the user has liked the post
        const hasLiked = await fetch(
          `${import.meta.env.VITE_API_URL}/api/like/check?postId=${
            fetchedPost.id
          }&userId=${currentUser?.id}`
        );
        const likeData = await hasLiked.json();
        if (likeData.hasLiked) {
          setIsLiked(true); // If user has liked the post, set isLiked to true
        } else {
          setIsLiked(false);
        }

        if (fetchedPost.likes && currentUser) {
          const userLiked = fetchedPost.likes.some(
            (like) => like.userId === currentUser.id
          );
          setIsLiked(userLiked); // Set like status
        }
        // Check if the post is saved by the user
        const isPostSaved = await checkIfPostIsSaved(
          fetchedPost.id,
          currentUser?.id
        );
        setIsSaved(isPostSaved);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug, currentUser]);

  const checkIfPostIsSaved = async (postId, userId) => {
    if (!userId) return false; // If the user is not logged in, return false
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/savelist/check?postId=${postId}&userId=${userId}`
    );
    if (!res.ok) {
      console.error("Failed to check saved post:", await res.text());
      return false;
    }
    const data = await res.json();
    return data.isSaved;
  };

  useEffect(() => {
    const fetchRecentPost = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post/getpost?limit=3`
        );
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPost();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  const savePost = async (postId) => {
    if (!currentUser) {
      console.error("User is not logged in.");
      return;
    }
    try {
      const url = isSaved
        ? `${import.meta.env.VITE_API_URL}/api/savelist/unsave`
        : `${import.meta.env.VITE_API_URL}/api/savelist/savepost`;
      const method = isSaved ? "DELETE" : "POST";
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userId: currentUser.id }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSaved((prevState) => !prevState);
        // console.log(isSaved ? "Post removed from saved" : "Post saved", data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error saving post:", err);
    }
  };

  const handleLikeClick = async () => {
    if (!currentUser) {
      navigate("/sign-in"); // Redirect to login if user is not logged in
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/like/likepost/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setIsLiked((prev) => !prev); // Toggle like status
        setLikes(data.Numberoflikes); // Update the number of likes
      } else {
        console.error("Failed to like/unlike post:", data.message);
      }
    } catch (err) {
      console.error("Error liking the post:", err);
    }
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <div className="flex">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post?.title}
        </h1>
        <button onClick={() => savePost(post?.id)} className="save-button">
          {isSaved ? (
            <HiBookmark size={58} color="blue" />
          ) : (
            <HiOutlineBookmark size={58} color="blue" />
          )}
        </button>
      </div>

      <Link
        to={`/search?category=${post?.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <button
          type="button"
          onClick={() => handleLikeClick(post.id)}
          className={` flex items-center gap-2 text-gray-400 hover:text-red-300 ${
            isLiked && "!text-red-500"
          }`}
        >
          <FaHeart className="text-3xl" />
          <span className="text-gray-400 text-sm">
            {/* {post.Numberoflikes > 0 &&
              post.Numberoflikes +
                " " +
                (post.Numberoflikes === 1 ? "like" : "likes")} */}
            {likes > 0 && likes + " " + (likes === 1 ? `like` : `likes`)}
          </span>
        </button>

        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      <div>
        <CallToAction />
      </div>
      <CommentSection postId={post?.id} />
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="text-xl mt-5 ">Recent Articles</h1>
        <div className="flex flex-row gap-5 mt-5 justify-center items-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
