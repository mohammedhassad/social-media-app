import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import Users from "./components/Users";
import Profile from "./components/Users/Profile";
import EditProfile from "./components/Users/EditProfile";
import Signup from "./components/Auth/Signup";
import Signin from "./components/Auth/Signin";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/NotFound";

const MainRoutes = () => {
  return (
    <Routes>
      <PrivateRoute path="/" component={Home} />
      {/* <Route path="/users" element={<Users />} /> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <PrivateRoute path="/user/:userId" component={Profile} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
