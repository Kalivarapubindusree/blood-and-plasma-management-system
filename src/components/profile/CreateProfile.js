import axios from "axios";
import React, { useEffect, useState } from "react";
import { api_key, api_url, REQUEST_URL } from "../../CONSTANTS";
import { Toast } from "../helper/HelperFunctions";

const initialValues = {
  bio: "",
  weight: "",
  lastdonationdate: "",
  mobilenumber: "",
  disease: "",
  availability: "",
  state: "",
  district: "",
  city: "",
};
function is_of_age(dob, age) {
  // dates are all converted to date objects
  var my_dob = new Date(dob);
  var today = new Date();

  var max_dob = new Date(
    today.getFullYear() - age,
    today.getMonth(),
    today.getDate()
  );
  return max_dob.getTime() > my_dob.getTime();
}
function getAge(DOB) {
  var today = new Date();
  var birthDate = new Date(DOB);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0) m = m * -1;
  else if (m === 0) m = 1;

  console.log(age, m, "6 months");
  return age * m;
}
function diff_months_count(startDate, endDate) {
  var months;
  var d1 = new Date(startDate);
  var d2 = new Date(endDate);
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function CreateProfile({ loggedIn, profileData }) {
  const [inputValues, setInputValues] = useState(initialValues);
  const [availabilityCheck, setAvailabilityCheck] = useState("yes");
  const [coords, setCoords] = useState({
    lat: "",
    long: "",
  });

  const [currentLocation, setCurrentLocation] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  useEffect(() => {
    if (profileData) {
      setInputValues(profileData);
    }
    axios({
      method: "POST",
      url: `${REQUEST_URL}/auth/getuserdob`,
      data: {
        userid: localStorage.getItem("bloodid"),
      },
    }).then((response) => {
      const check = is_of_age(response.data.result, 18);
      check ? setAvailabilityCheck("yes") : setAvailabilityCheck("no");
    });
    function getCurrentLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);

          setCoords({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
          const lat = 32.262341;
          const long = 75.166168;
          var request_url =
            api_url +
            "?" +
            "key=" +
            api_key +
            "&q=" +
            encodeURIComponent(
              position.coords.latitude + "," + position.coords.longitude
            ) +
            "&pretty=1" +
            "&no_annotations=1";
          axios({
            method: "get",
            url: request_url,
          }).then((response) => {
            setCurrentLocation(response.data.results[0].formatted);
          });
        });
      } else {
        console.log("Not Available");
      }
    }
    getCurrentLocation();
  }, [profileData]);
  const handleSubmit = (e) => {
    if (
      inputValues.bio === "" ||
      inputValues.weight === "" ||
      inputValues.lastdonationdate === "" ||
      inputValues.mobilenumber === "" ||
      inputValues.disease === "" ||
      inputValues.availability === "" ||
      inputValues.state === "" ||
      inputValues.district === "" ||
      inputValues.city === ""
    ) {
      Toast("error", "Some Fields are Empty");
    } else {
      let output = "";
      let months = diff_months_count(inputValues.lastdonationdate, new Date());
      months >= 6 && availabilityCheck && inputValues.availability === "yes"
        ? (output = "yes")
        : (output = "no");
      console.log(output, months, availabilityCheck, "output");
      if (!profileData._id) {
        axios({
          method: "post",
          url: `${REQUEST_URL}/userroutesprofile/addprofile`,
          data: {
            userid: localStorage.getItem("bloodid"),
            bio: inputValues.bio,
            weight: inputValues.weight,
            lastdonationdate: inputValues.lastdonationdate,
            mobilenumber: inputValues.mobilenumber,
            disease: inputValues.disease,
            availability: output,
            state: inputValues.state,
            district: inputValues.district,
            city: inputValues.city,
            lat: coords.lat,
            long: coords.long,
          },
        }).then((response) => {
          console.log(response.data);
          Toast("success", response.data.message);
          setInputValues({
            bio: "",
            weight: "",
            lastdonationdate: "",
            mobilenumber: "",
            disease: "",
            availability: "",
            state: "",
            district: "",
            city: "",
          });
        });
      } else {
        axios({
          method: "post",
          url: `${REQUEST_URL}/userroutesprofile/updateprofile`,
          data: {
            userid: localStorage.getItem("bloodid"),
            bio: inputValues.bio,
            weight: inputValues.weight,
            lastdonationdate: inputValues.lastdonationdate,
            mobilenumber: inputValues.mobilenumber,
            disease: inputValues.disease,
            availability: output,
            state: inputValues.state,
            district: inputValues.district,
            city: inputValues.city,
            lat: coords.lat,
            long: coords.long,
          },
        }).then((response) => {
          console.log(response.data);
          Toast("success", response.data.message);
          setInputValues({
            bio: "",
            weight: "",
            lastdonationdate: "",
            mobilenumber: "",
            disease: "",
            availability: "",
            state: "",
            district: "",
            city: "",
          });
        });
      }
    }
  };

  if (loggedIn)
    return (
      <div className="bg-white w-full logo-color">
        <div className="w-2/3 mx-auto">
          <div className=" text-4xl font-bold tracking-wider pt-8">
            Create Your Profile
          </div>
          <div className="text-xl font-semibold tracking-wide mt-2">
            Let's get some information to make your profile stand out
          </div>

          <div className="flex mx-auto mt-4 space-x-16">
            <div className="flex flex-col w-1/2">
              <label htmlFor="fullname" className="logo-color font-bold">
                Bio *
              </label>
              <input
                type="text"
                name="bio"
                className="bloodbank-input-border px-3 py-1 w-full"
                placeholder="A short Bio of yourself"
                onChange={handleInputChange}
                value={inputValues.bio}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="weight" className="logo-color font-bold">
                Weight *
              </label>
              <input
                type="text"
                name="weight"
                className="bloodbank-input-border px-3 py-1 w-full"
                placeholder="Weight"
                onChange={handleInputChange}
                value={inputValues.weight}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="fullname" className="logo-color font-bold">
                Last Donation Date *
              </label>
              <input
                type="date"
                name="lastdonationdate"
                className="bloodbank-input-border px-3 py-1 w-full"
                onChange={handleInputChange}
                value={inputValues.lastdonationdate}
              />
            </div>
          </div>
          <div className="mx-auto mt-4">
            <div className="flex flex-col w-full">
              <label htmlFor="fullname" className="logo-color font-bold">
                Mobile Number *
              </label>
              <input
                type="text"
                name="mobilenumber"
                className="bloodbank-input-border px-3 py-1 w-full"
                placeholder="Mobile Number"
                onChange={handleInputChange}
                value={inputValues.mobilenumber}
              />
            </div>
          </div>
          <div className="flex mx-auto mt-4 space-x-16">
            <div className="flex flex-col w-1/2">
              <label htmlFor="fullname" className="logo-color font-bold">
                Disease *
              </label>
              <input
                type="text"
                name="disease"
                className="bloodbank-input-border px-3 py-1 w-full"
                onChange={handleInputChange}
                value={inputValues.disease}
              />
              <div>
                (Please provide disease you obtain as (Diabetes, Cancer,
                Covid-19, etc).
                <br />
                If not then mention as : No disease)
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="availability" className="logo-color font-bold">
                Are you available for donate *
              </label>
              <select
                name="availability"
                id="availability"
                className="bloodbank-input-border px-3 py-1"
                onChange={handleInputChange}
                value={inputValues.availability}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          <div className="text-3xl tracking-wider mt-4">Location</div>
          <div className="flex mx-auto mt-4 space-x-16">
            <div className="flex flex-col w-1/2">
              <label htmlFor="fullname" className="logo-color font-bold">
                State *
              </label>
              <input
                type="text"
                name="state"
                className="bloodbank-input-border px-3 py-1 w-full"
                onChange={handleInputChange}
                value={inputValues.state}
              />
            </div>
            <div className="flex flex-col w-1/2 ">
              <label htmlFor="text" className="logo-color font-bold">
                District *
              </label>
              <input
                type="text"
                name="district"
                className="bloodbank-input-border px-3 py-1 w-full"
                onChange={handleInputChange}
                value={inputValues.district}
              />
            </div>
          </div>
          <div className="mx-auto mt-4">
            <div className="w-full">
              <label htmlFor="fullname" className="logo-color font-bold">
                City *
              </label>
              <input
                type="text"
                name="city"
                className="bloodbank-input-border px-3 py-1 w-full"
                onChange={handleInputChange}
                value={inputValues.city}
              />
            </div>
          </div>

          <div className="font-semibold my-4">
            <span className="font-bolder tracking-wider text-black">
              Current Location:{" "}
            </span>
            {currentLocation}
          </div>
          {/* <div
            className="app-color px-5 py-3 text-white text-center font-bold tracking-widest my-8 cursor-pointer"
            // onClick={getCurrentLocation}
          >
            Get Current Location
          </div> */}
          <div
            className="app-color px-5 py-3 text-white text-center font-bold tracking-widest my-8 cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
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

export default CreateProfile;
