import axios from "axios";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { REQUEST_URL } from "../CONSTANTS";
import { Toast, validateEmail } from "./helper/HelperFunctions";

function SignIn({ setLoggedIn, setAdminLoggedIn }) {
  const [inputValues, setInputValues] = useState({
    name: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const validate = () => {
    if (inputValues.password === "" || inputValues.email === "") {
      Toast("error", "Some Fields are Empty");
      return false;
    } else {
      if (!validateEmail(inputValues.email)) {
        Toast("error", "Email is not correct");
        return false;
      } else {
        return true;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios({
        method: "POST",
        url: `${REQUEST_URL}/auth/login`,
        data: {
          email: inputValues.email,
          password: inputValues.password,
        },
      }).then((response) => {
        if (response.data.status === "not ok") {
          Toast("error", response.data.message);
        } else if (response.data.status === "ok") {
          Toast("success", response.data.message);
          if (response.data.auth === true) {
            localStorage.setItem("bloodtoken", response.data.token);
            localStorage.setItem("bloodid", response.data.result._id);
            localStorage.setItem("bloodadmin", response.data.adminCheck);
          }
          setLoggedIn(true);
          setAdminLoggedIn(response.data.adminCheck);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      });
    }
  };
  return (
    <div className=" bg-white sign-in-page-length pt-16">
      <div className="h-96 app-color w-2/3 mx-auto flex rounded-3xl sign-in-page-border">
        <div className="w-1/2 text-white font-bold text-4xl flex justify-center items-center">
          DONOR Spot
        </div>
        <div className="w-1/2 bg-white">
          <div className="text-2xl text-center mt-5 logo-color font-bold">
            Sign In
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <input
              type="text"
              placeholder="Email"
              className="signinpage-input-bottom px-3 py-2 mt-3"
              name="email"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="signinpage-input-bottom px-3 py-2 mt-3"
              name="password"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center items-center mt-10">
            <div
              className="app-color px-8 py-3 rounded-full text-white font-semibold cursor-pointer"
              onClick={handleSubmit}
            >
              LogIn
            </div>
          </div>
          <div className="logo-color text-center mt-5">
            Don't have a account
            <span className="font-bold cursor-pointer">Register Here</span>
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

export default SignIn;
