import { Routes, Route } from "react-router-dom";
import ScreensHome from "@/screens/Home";
import ScreensSignup from "@/screens/Auth/Signup";
import ScreensSignin from "@/screens/Auth/Signin";
import PrivateRoute from "@/components/PrivateRoute";
import ScreensUser from "@/screens/User";
import ScreensUserEdit from "@/screens/User/Edit";
import ScreensUserList from "@/screens/User/List";
import ScreensNotFound from "@/screens/NotFound.jsx";

const ScreensRoot = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute component={ScreensHome} />} />
      <Route
        path="/users"
        element={<PrivateRoute component={ScreensUserList} />}
      />
      <Route path="/signup" element={<ScreensSignup />} />
      <Route path="/signin" element={<ScreensSignin />} />

      <Route
        path="/user/:userId"
        element={<PrivateRoute component={ScreensUser} />}
      />
      <Route
        path="/user/edit/:userId"
        element={<PrivateRoute component={ScreensUserEdit} />}
      />

      <Route path="*" element={<ScreensNotFound />} />
    </Routes>
  );
};

export default ScreensRoot;
