import moment from "moment";
import { useEffect, useState } from "react";
// import { FaThumbsUp } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment }) {
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
      </div>
    </div>
  );
}
