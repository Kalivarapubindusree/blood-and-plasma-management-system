import axios from "axios";
import React, { useState } from "react";
import { REQUEST_URL } from "../../CONSTANTS";
import { Toast } from "../helper/HelperFunctions";

function ForgetPassword({ loggedIn }) {
  const [inputValues, setInputValues] = useState({
    old: "",
    new: "",
    newagain: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = (e) => {
    if (inputValues.old && inputValues.new && inputValues.newagain) {
      if (inputValues.new === inputValues.newagain) {
        axios({
          method: "post",
          url: `${REQUEST_URL}/auth/changepassword`,
          data: {
            userid: localStorage.getItem("bloodid"),
            oldPassword: inputValues.old,
            newPassword: inputValues.new,
          },
        }).then((response) => {
          console.log(response.data);
          if (response.data.status === "not ok")
            Toast("error", response.data.message);
          else Toast("success", "Changed Password successfully");
        });
      } else Toast("error", "New password did't match");
    } else Toast("error", "Something went wronge");
  };
  if (loggedIn)
    return (
      <div className="bg-white w-full logo-color">
        <div className="change-password-container w-1/3 mx-auto">
          <div className="text-2xl text-center pt-5 logo-color font-bold">
            Sign In
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <input
              type="password"
              placeholder="Old Password"
              className="signinpage-input-bottom px-3 py-2 mt-3"
              name="old"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="New Password"
              className="signinpage-input-bottom px-3 py-2 mt-3"
              name="new"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="New Password Again"
              className="signinpage-input-bottom px-3 py-2 mt-3"
              name="newagain"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <div
              className="app-color px-8 py-3 rounded-full text-white font-semibold cursor-pointer"
              onClick={handleSubmit}
            >
              Change Password
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="bg-white w-full">
      <div className="w-2/3 mx-auto pt-8">
        <div className="text-4xl font-bold ">You Need to login first</div>
      </div>
    </div>
  );
}

export default ForgetPassword;
