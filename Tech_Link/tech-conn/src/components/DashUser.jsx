import { Button, Modal, Table, TableCell } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import {FaCheck , FaTimes} from 'react-icons/fa'
export default function DashUser() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);   
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/getuser`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(data.error);
      }
    };
    if (currentUser.isAdmin) {
      fetchUser();
    }
  }, [currentUser.id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/getuser?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => [...prev, ...data.user]);
        if (data.user.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/delete/${userIdToDelete}`,
            {
                method : "DELETE"
            }
        )
        const data = await res.json()
        if(res.ok){
            setUsers((prev) => prev.filter((user) => user.id !== userIdToDelete) )
            setShowModal(false)
        }else{
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
        
    }
  };

  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {users.map((user) => (
                <Table.Row
                  key={user.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>

                  <Table.Cell>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user.id);
                      }}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 py-7 self-center text-sm"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>you have no user yet </p>
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
              Are you sure you want to delete this user ?
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
