import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [ImageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [ImageFileUploadError, setImageFileUploadError] = useState(null);
  const [ImageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileURL(null);
        setImageFileUploading(false);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);

    if (!currentUser || !currentUser.id) {
      console.log("User ID is undefined or currentUser is not set.");
      return;
    }
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (ImageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      // console.log("Form",formData)
      const userId = parseInt(currentUser.id, 10);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  //Deleting User in UI
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const userId = parseInt(currentUser.id, 10);
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/delete/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(deleteUserSuccess(data));
        setUpdateUserSuccess("User's profile deleted successfully");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  //Signout
  const handleSignOut = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/signout`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        navigate("/sign-in");
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //returnnnnn
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full "
          onClick={() => filePickerRef.current.click()}
        >
          {ImageFileUploadProgress && (
            <CircularProgressbar
              value={ImageFileUploadProgress || 0}
              text={`${ImageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    ImageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileURL || currentUser.profilePicture}
            alt="user"
            className={`rounded-full h-full w-full object-cover border-8 border-[lightgray] ${
              ImageFileUploadProgress &&
              ImageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {ImageFileUploadError && (
          <Alert color="failure">{ImageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="name"
          autoComplete="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          autoComplete="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="*********"
          autoComplete="current-password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || ImageFileUploading}
        >
          {loading ? "Loading.." : " Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create a Post
            </Button>
          </Link>
        )}
      </form>
      <div className=" flex justify-between text-red-500 mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-6">
          {updateUserSuccess}
        </Alert>
      )}
      {error && (
        <Alert color="success" className="mt-6">
          {error}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-6">
          {updateUserError}
        </Alert>
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
              Are you sure you want to delete your account
            </h3>
            <div className="flex justify-center gap-9">
              <Button color="failure" onClick={handleDeleteUser}>
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
