import { Button } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
// import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [editedContent, setEditedContent] = useState(comment.content);
  //   const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      if (!comment.userId) return; // Avoid fetching if userId is not defined
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user:", await res.json());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (comment.userId) {
      getUser(); // Fetch user only if userId exists
    }
  }, [comment.userId]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p>{comment.content}</p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit   gap-2">
          <button
            type="button"
            onClick={() => onLike(comment.id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser.id) &&
              '!text-blue-500'
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {
              comment.Numberoflikes > 0 && comment.Numberoflikes + " " + (comment.Numberoflikes ===1 ?  "like" : "likes")
            }
          </p>
        </div>
      </div>
    </div>
  );
}
