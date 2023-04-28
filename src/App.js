import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/header/Navbar";
import Navheader from "./components/header/Navheader";
import MainFront from "./components/MainFront";
import { REQUEST_URL } from "./CONSTANTS";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";
import LoggedInNav from "./components/header/LoggedInNav";
import SignIn from "./components/SignIn";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import BloodBank from "./components/BloodBank";
import PlasmaBank from "./components/PlasmaBank";
import ProfileHeader from "./components/profile/ProfileHeader";
import CreateProfile from "./components/profile/CreateProfile";
import ContactUs from "./components/ContactUs";
import Videos from "./components/Videos";
import Event from "./components/Event";
import Donor from "./components/Donor";
import ForgetPassword from "./components/profile/ForgetPassword";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [switchData, setSwitchData] = useState([]);

  const [searchFilterValue, setSearchFilterValue] = useState("");
  const [searchCityFilter, setSearchCityFilter] = useState("");

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [allprofileData, setAllprofileData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${REQUEST_URL}/auth/login`,
      headers: {
        "x-access-token": localStorage.getItem("bloodtoken"),
      },
    }).then((response) => {
      if (response.data.auth === true) {
        setLoggedIn(true);
        setAdminLoggedIn(localStorage.getItem("bloodadmin"));
        console.log(adminLoggedIn, "admin check");
      } else {
        setLoggedIn(false);
      }
    });
  }, [loggedIn, switchData, adminLoggedIn]);
  return (
    <div className="app-color">
      {loggedIn && (
        <LoggedInNav
          setLoggedIn={setLoggedIn}
          setSearchFilterValue={setSearchFilterValue}
          setSearchCityFilter={setSearchCityFilter}
        />
      )}
      {!loggedIn && <Navheader />}

      <Navbar setSearchFilterValue={setSearchFilterValue} />
      <Routes>
        <Route
          path="/changepassword"
          element={<ForgetPassword loggedIn={loggedIn} />}
        ></Route>
        <Route
          path="/"
          exact
          element={
            <MainFront
              setSwitchData={setSwitchData}
              setSearchFilterValue={setSearchFilterValue}
              setSearchCityFilter={setSearchCityFilter}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/signin"
          element={
            <SignIn
              setLoggedIn={setLoggedIn}
              setAdminLoggedIn={setAdminLoggedIn}
            />
          }
        />
        <Route
          path="/bloodbank"
          element={
            <BloodBank
              switchData={switchData}
              setSwitchData={setSwitchData}
              loggedIn={loggedIn}
              searchFilterValue={searchFilterValue}
              adminLoggedIn={adminLoggedIn}
            />
          }
        />
        <Route
          path="/plasmabank"
          element={
            <PlasmaBank
              switchData={switchData}
              setSwitchData={setSwitchData}
              loggedIn={loggedIn}
              searchFilterValue={searchFilterValue}
              adminLoggedIn={adminLoggedIn}
            />
          }
        />
        <Route
          path="/donor"
          element={
            <Donor
              switchData={switchData}
              setSwitchData={setSwitchData}
              loggedIn={loggedIn}
              searchFilterValue={searchFilterValue}
              searchCityFilter={searchCityFilter}
              adminLoggedIn={adminLoggedIn}
              allprofileData={allprofileData}
              setAllprofileData={setAllprofileData}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfileHeader
              loggedIn={loggedIn}
              setProfileData={setProfileData}
              setSwitchData={setSwitchData}
            />
          }
        />
        <Route
          path="/create-profile"
          element={
            <CreateProfile loggedIn={loggedIn} profileData={profileData} />
          }
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/videos"
          element={<Videos loggedIn={loggedIn} adminLoggedIn={adminLoggedIn} />}
        />
        <Route
          path="/event"
          element={
            <Event
              switchData={switchData}
              setSwitchData={setSwitchData}
              loggedIn={loggedIn}
              adminLoggedIn={adminLoggedIn}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
