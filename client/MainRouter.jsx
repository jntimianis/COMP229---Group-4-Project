import { Route, Routes } from "react-router-dom";
import Home from "./core/Home";
import AboutUs from "./core/AboutUs.jsx";
import AddConcerts from "./core/AddConcerts.jsx";
import Signup from "./user/Signup.jsx";
import Signin from "./user/Signin.jsx";
import Profile from "./user/Profile.jsx";
import PrivateRoute from "./lib/PrivateRoute.jsx";
import EditProfile from "./user/EditProfile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Menu from "./core/Menu";
function MainRouter() {
  return (
    <div>
      <Menu />

      <ToastContainer />

      <Routes>
        <Route path="/" element={<PrivateRoute>{<Home />}</PrivateRoute>} />
        <Route path="/about-us" element={<AboutUs />}/>
        <Route
          path="/addconcerts"
          element={
            <PrivateRoute>
              <AddConcerts />
            </PrivateRoute>
          }
        />
        <Route path="/add-concerts" element={<AddConcerts />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route path="/user/:userId" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
