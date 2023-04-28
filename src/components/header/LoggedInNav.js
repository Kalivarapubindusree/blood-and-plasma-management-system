import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toast } from "../helper/HelperFunctions";

function LoggedInNav({
  setLoggedIn,
  setSearchFilterValue,
  setSearchCityFilter,
}) {
  return (
    <div className="w-full h-24 xl:h-28">
      <div className="w-4/5 m-auto bg-white flex justify-between items-center py-5 rounded-lg shadow-2xl">
        <div className="font-bold text-2xl xl:text-3xl logo-color ml-4">
          DONOR SPOT
        </div>
        <div className="flex justify-between items-center space-x-4 mr-3 lg:space-x-8 lg:mr-6">
          <div className="logo-color xl:text-xl text-sm contact-border">
            +91-123456789
          </div>
          <Link to="/profile">
            <div className="navheader-btn cursor-pointer text-sm">Profile</div>
          </Link>
          <Link to="/changepassword">
            <div className="navheader-btn cursor-pointer text-xs">
              Change Password
            </div>
          </Link>
          <Link to="/donor">
            <div
              className="navheader-btn cursor-pointer text-xs"
              onClick={() => {
                setSearchFilterValue("");
                setSearchCityFilter("");
              }}
            >
              Emergengy Corner
            </div>
          </Link>
          <div
            className="navheader-btn cursor-pointer text-xs"
            onClick={() => {
              localStorage.removeItem("bloodid");
              localStorage.removeItem("bloodtoken");
              setLoggedIn(false);
              Toast("success", "Logged Out Successfully");
            }}
          >
            Log Out
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default LoggedInNav;
