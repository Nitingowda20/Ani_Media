import { Table, TableCell } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

export default function DashPost() {
  const {currentUser} = useSelector(state=> state.user)
  const [ userPost , setUserPost] = useState([])
  console.log(userPost);
  useEffect(()=>{
    const fetchpost =async()=>{
      try {
        const res = await fetch(`/api/post/getpost?userId=${currentUser.id}`)
        const data = await res.json()
        if(res.ok){
            setUserPost(data.posts)
        }
      } catch (error) {
        console.log(data.error);
        
      }
    }
    if(currentUser.isAdmin){
      fetchpost()
    }
  },[currentUser.id , currentUser.isAdmin])
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPost.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {userPost.map((posts) => (
                <Table.Row
                  key={posts.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    {new Date(posts.updatedAt).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    <Link to={`post/${posts.slug}`}>
                      <img
                        src={posts.image}
                        alt={posts.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{posts.title}</Table.Cell>
                  <Table.Cell>{posts.category}</Table.Cell>
                  <Table.Cell>
                    {/* Add delete button functionality */}
                    <button className="text-red-600 hover:underline cursor-pointer">
                      Delete
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    {/* Add edit functionality */}
                    <Link
                      to={`/update-post/${posts.id}`}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <p>you have no post </p>
      )}
    </div>
  );
}
