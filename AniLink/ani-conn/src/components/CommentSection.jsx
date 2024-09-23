import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  // console.log(comments);

    useEffect(() => {
      const getComments = async () => {
        try {
          const res = await fetch(`/api/comment/getpostcomments/${postId}`);
          if (res.ok) {
            const data = await res.json();
            setComments(data);
          } else {
            console.error("Failed to fetch comments");
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getComments();
    }, [postId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setCommentError("You must be signed in to comment");
      return; // Prevent submission if there's no user
    }
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          content: comment,
          userId: currentUser.id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setComment("");
        setCommentError(null);
        setComments((prevComments) => [data, ...prevComments]);
      } else {
        const errorData = await res.json();
        setCommentError(errorData.message); // Show error message from API
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };


  return (
    <div className=" max-w-2xl p-3 mx-auto w-full">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment
          <Link
            to={"/sign-in"}
            className="text-xs text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-400 rounded-md p-5"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-500 text-sm">
              {200 - comment.length} Characters Remaining
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            // <h1>hiiii</h1>
            <Comment
              key={comment.id}
              comment={comment}
              //   onLike={handleLike}
              //   onEdit={handleEdit}
              //   onDelete={(commentId) => {
              //     setShowModal(true);
              //     setCommentToDelete(commentId);
              //   }}
            />
          ))}
        </>
      )}
    </div>
  );
}
