import { Button, Textarea } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike , onEdit , onDelete }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  useEffect(() => {
    const getUser = async () => {
      if (!comment.userId) return; // Avoid fetching if userId is not defined
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${comment.userId}`);
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

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async()=>{
    try {
      const res = await fetch (`${import.meta.env.VITE_API_URL}/api/comment/editcomment/${comment.id}`,{
        method:"PUT",
        headers:{
          'content-type' : 'application/json',
          Authorization: `Bearer ${currentUser.token}`
        },
        body:JSON.stringify({
          content:editedContent
        })
      })
      if(res.ok){
        setIsEditing(false)
        onEdit(comment , editedContent)
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }
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
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="buttom"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={(e) => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit   gap-2">
              <button
                type="button"
                onClick={() => onLike(comment.id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  Array.isArray(comment.likes) &&
                  comment.likes.includes(currentUser.id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>

              <p className="text-gray-400">
                {comment.Numberoflikes > 0 &&
                  comment.Numberoflikes +
                    " " +
                    (comment.Numberoflikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser.id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
