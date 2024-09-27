import { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSlideBar from '../components/DashSlideBar';
import DashProfile from '../components/DashProfile';
import DashPost from '../components/DashPost';
import DashUser from '../components/DashUser';
import DashComments from "../components/DashComments";
import DashboardComp from '../components/DashboardComp';


export default function Dashboard() {
  const location = useLocation();
  const [tab , setTab]=  useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div>
        <DashSlideBar />
      </div>
      {/* <div className="flex-grow flex justify-center items-start p-1"> */}
        {tab === "post" && <DashPost />}
        {tab === "profile" ? <DashProfile /> : null}
        {tab === "users" && <DashUser />}
        {tab === "comments" && <DashComments />}
        {tab === "dash" && <DashboardComp/>}
      {/* </div> */}
    </div>
  );
}
