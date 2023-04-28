import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { REQUEST_URL } from "../CONSTANTS";
import { Toast, validateEmail } from "./helper/HelperFunctions";

function Register() {
  const [inputValues, setInputValues] = useState({
    fullname: "",
    password: "",
    email: "",
    confirmpassword: "",
    bloodgroup: "Dont't know",
    dob: "",
    gender: "male",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const validate = () => {
    if (
      inputValues.fullname === "" ||
      inputValues.password === "" ||
      inputValues.email === "" ||
      inputValues.confirmpassword === "" ||
      inputValues.dob === ""
    ) {
      Toast("error", "Some Fields are Empty");
      return false;
    } else {
      if (inputValues.password !== inputValues.confirmpassword) {
        Toast("error", "Passwords didn't match");
        return false;
      } else {
        if (!validateEmail(inputValues.email)) {
          Toast("error", "Email is not correct");
          return false;
        } else {
          return true;
        }
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios({
        method: "POST",
        url: `${REQUEST_URL}/auth/register`,
        data: {
          fullname: inputValues.fullname,
          email: inputValues.email,
          password: inputValues.password,
          dob: inputValues.dob,
          gender: inputValues.gender,
          bloodgroup: inputValues.bloodgroup,
        },
      }).then((response) => {
        if (response.data.status === "not ok") {
          Toast("error", response.data.message);
        } else {
          Toast("success", response.data.message);
          setTimeout(() => {
            window.location.href = "/signin";
          }, 2000);
        }
      });
    }
  };
  return (
    <div className="h-screen bg-white pt-10 logo-color">
      <div className="text-4xl text-center font-bold">Join Us</div>
      <div className="w-2/3 mx-auto">
        {/* Login information */}
        <div className="font-bold text-2xl">Login Information</div>
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2 mt-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="fullname">Full Name *</label>
              <input
                type="text"
                name="fullname"
                className="register-input-border px-3 py-1"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                name="password"
                className="register-input-border px-3 py-1"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 mt-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="email">Email *</label>
              <input
                type="text"
                name="email"
                className="register-input-border px-3 py-1"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmpassword">Confirm Password *</label>
              <input
                type="password"
                name="confirmpassword"
                className="register-input-border px-3 py-1"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Donor information */}
        <div className="font-bold text-2xl">Donor Information</div>
        <div className="flex space-x-4">
          <div className="flex flex-col w-1/2 mt-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="bloodgroup">Blood Group: *</label>

              <select
                name="bloodgroup"
                id="bloodgroup"
                className="register-input-border px-3 py-1"
                onChange={handleInputChange}
              >
                <option value="Dont't know">Don't know</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="dob">Date of Birth: *</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="register-input-border px-3 py-1"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 mt-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="bloodgroup">Blood Group: *</label>
              <select
                name="gender"
                id="gender"
                className="register-input-border px-3 py-1"
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not Interested">Not Interested</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="text-lg font-semibold mt-4">
          After register you are not able to update this field. So, Please check
          it before register.
        </div>
        <div
          className="font-bold text-2xl app-color text-white px-16 py-3 rounded-full my-4 cursor-pointer"
          onClick={handleSubmit}
        >
          Register
        </div>
        <div>
          Already have an account?{" "}
          <span className="font-semibold cursor-pointer">Login</span>
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

export default Register;
