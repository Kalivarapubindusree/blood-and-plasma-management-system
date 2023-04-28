import React, { useState } from "react";
import { Toast, validateEmail } from "./helper/HelperFunctions";
import emailjs from "@emailjs/browser";

function ContactUs() {
  const [inputValues, setInputValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    interested: "",
    detailedinformation: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = (e) => {
    if (
      inputValues.firstname === "" ||
      inputValues.lastname === "" ||
      inputValues.email === "" ||
      inputValues.mobilenumber === "" ||
      inputValues.interested === "" ||
      inputValues.detailedinformation === ""
    ) {
      Toast("error", "Some Fields are Empty");
    } else {
      if (!validateEmail(inputValues.email)) {
        Toast("error", "Email is not correct");
      } else {
        console.log(inputValues);
        emailjs.send(
          "service_3rt0xws",
          "template_skh4bs6",
          {
            interested: inputValues.interested,
            firstname: inputValues.firstname,
            lastname: inputValues.lastname,
            email: inputValues.email,
            mobilenumber: inputValues.mobilenumber,
            detailedmessage: inputValues.detailedinformation,
          },
          "89dA2aDL51eJZxFj4"
        );
        Toast("success", "Email send");
        setInputValues({
          firstname: "",
          lastname: "",
          email: "",
          mobilenumber: "",
          interested: "",
          detailedinformation: "",
        });
      }
    }
  };
  return (
    <div className="bg-white h-full">
      <div className="w-2/3 mx-auto logo-color">
        <div className="text-center text-3xl font-bold tracking-wider pt-8">
          Contact
        </div>
        <div className="text-center text-xl mt-4">
          Once you fill out this form, our team will contact you within 24
          hours.
        </div>
        <div className="flex mx-auto mt-4 space-x-16">
          <div className="flex flex-col w-1/2">
            <label htmlFor="firstname" className="logo-color font-bold">
              First Name *
            </label>
            <input
              type="text"
              name="firstname"
              className="bloodbank-input-border px-3 py-1 w-full"
              onChange={handleInputChange}
              value={inputValues.firstname}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastname" className="logo-color font-bold">
              Last Name *
            </label>
            <input
              type="text"
              name="lastname"
              className="bloodbank-input-border px-3 py-1 w-full"
              onChange={handleInputChange}
              value={inputValues.lastname}
            />
          </div>
        </div>
        <div className="flex mx-auto mt-4 space-x-16">
          <div className="flex flex-col w-1/2">
            <label htmlFor="email" className="logo-color font-bold">
              Email *
            </label>
            <input
              type="text"
              name="email"
              className="bloodbank-input-border px-3 py-1 w-full"
              onChange={handleInputChange}
              value={inputValues.email}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="password" className="logo-color font-bold">
              Mobile Number *
            </label>
            <input
              type="text"
              name="mobilenumber"
              className="bloodbank-input-border px-3 py-1 w-full"
              onChange={handleInputChange}
              value={inputValues.mobilenumber}
            />
          </div>
        </div>
        <div className="flex mx-auto mt-4 space-x-16">
          <div className="flex flex-col w-1/2">
            <label htmlFor="interested" className="logo-color font-bold">
              Interested In*
            </label>
            <input
              type="text"
              name="interested"
              className="bloodbank-input-border px-3 py-1 w-full"
              onChange={handleInputChange}
              value={inputValues.interested}
            />
          </div>
        </div>
        <div className="flex mx-auto mt-4 space-x-16">
          <div className="flex flex-col w-full h-28">
            <label
              htmlFor="detailedinformation"
              className="logo-color font-bold"
            >
              Some information about the Interested in *
            </label>
            <textarea
              type="textarea"
              rows="15"
              name="detailedinformation"
              className="bloodbank-input-border px-3 py-1 w-full"
              onChange={handleInputChange}
              value={inputValues.detailedinformation}
            />
          </div>
        </div>

        <div
          className="mt-4 py-3 text-center app-color text-white text-2xl font-semibold cursor-pointer"
          onClick={handleSubmit}
        >
          Send
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
