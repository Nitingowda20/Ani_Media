import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={"/dashboard"} />;
}

// import { useSelector } from "react-redux";
// import { Outlet, Navigate } from "react-router-dom";

// export default function PrivateRoute() {
//   const { currentUser } = useSelector((state) => state.user);

//   // Ensure the user is logged in and is an admin
//   if (!currentUser || !currentUser.isAdmin) {
//     return <Navigate to={"/"} />; // Redirect to the homepage or another page if not an admin
//   }

//   return <Outlet />; // Allow access to the Dashboard if the user is an admin
// }
