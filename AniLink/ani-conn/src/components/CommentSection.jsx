import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const Navigate = useNavigate();
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
        setComments((prevComments) => [data?.comment, ...prevComments]);
      } else {
        const errorData = await res.json();
        setCommentError(errorData.message); // Show error message from API
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        Navigate("/sign-n");
        return;
      }

      const res = await fetch(`/api/comment/likecomment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        // Update the specific comment in the state
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  Numberoflikes: data.Numberoflikes,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c.id === comment.id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        Navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deletecomment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (error) {
      console.log(error.message);
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
          {comments.map((comment, index) => (
            // <h1>hiiii</h1>
            <Comment
              key={comment.id || index}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray=200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete this comment
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
