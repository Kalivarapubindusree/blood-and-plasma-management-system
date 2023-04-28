import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { Toast } from "./helper/HelperFunctions";
import axios from "axios";
import { REQUEST_URL } from "../CONSTANTS";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import { MdPersonOutline } from "react-icons/md";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const label = { inputProps: { "aria-label": "Switch demo" } };
const cities = [
  "Ajit Singh Nagar",
  "Arul Nagar",
  "Ashok Nagar",
  "Auto Nagar",
  "Ayodhya Nagar",
  "Ayyappa Nagar",
  "Bandar Road",
  "Bapanayyanagar",
  "Bavajipet",
  "Benz Circle",
  "Bhagat Singh Nagar",
  "Bharathi Nagar",
  "Bhavanipuram",
  "Bhimannavaripeta",
  "Bramanadha Reddy Nagar",
  "Canal Road",
  "Chalasani Nagar",
  "Chittinagar",
  "Chowdhary Pet",
  "Christurajupuram",
  "Currency Nagar",
  "Devi Nagar",
  "Durga Agraharam",
  "Enikepadu",
  "Fakirgudem",
  "Fraserpeta",
  "Gayatri Nagar",
  "Gollapudi",
  "Governorpet",
  "Gunadala",
  "Hanumanpet",
  "Jojinagar",
  "Kaleswara Rao Market",
  "Kanayyathopu",
  "Kanuru",
  "Krishnalanka",
  "Labbipeta",
  "LEPL Icon",
  "LIC Colony",
  "Lurdhunagar",
  "Mallikarjunapeta",
  "Milk Colony",
  "Moghalrajpuram",
  "Mylavaram Vari Street",
  "Nehru Nagar",
  "New Rajarajeswaripeta",
  "NH-9",
  "Nidamanuru",
  "Patamata",
  "Payakapuram",
  "PNT Colony",
  "Poranki",
  "Ramalingeswara Nagar",
  "Ramarajunagar",
  "Ramavarapupadu",
  "Ranga Nagar",
  "Ranigaritota",
  "RR Nagar",
  "RTC Colony",
  "Sanath Nagar",
  "Satyanarayanapuram Main Road",
  "Satyaranayana Puram",
  "Siddhartha Nagar",
  "Sri Ramachandra Nagar",
  "Sriram Nagar",
  "State Bank Colony",
  "Station Road",
  "Surya Rao Peta",
  "Tadigadapa Main Raod",
  "Tarapet",
  "Tulasi Nagar",
  "Vambay Colony",
  "Vidhyadharpuram",
  "Yanamalakuduru",
  "Vinchipeta",
];

// const donors = [
//   {
//     fullname: "shivangi",
//     bloodgroup: "B+",
//   },
//   {
//     fullname: "Rogit",
//     bloodgroup: "B+",
//   },
//   {
//     fullname: "shivangi",
//     bloodgroup: "B+",
//   },
//   {
//     fullname: "shivangi",
//     bloodgroup: "B+",
//   },
// ];

function MainFront({
  setSwitchData,
  setSearchFilterValue,
  setSearchCityFilter,
}) {
  const [bankPlasmaSwitch, setBankPlasmaSwitch] = useState("bank");
  const [donors, setDonors] = useState([]);
  const [inputValues, setInputValues] = useState({
    city: "",
    state: "",
    bloodgroup: "",
  });

  useEffect(() => {
    setSearchFilterValue("");
    setSearchCityFilter("");

    axios({
      method: "get",
      url: `${REQUEST_URL}/auth/getusers`,
    }).then((response) => {
      setDonors(response.data.result);
    });
  }, []);
  const handleInputChange = (e) => {
    if (e.target.checked) setBankPlasmaSwitch("plasma");
    else setBankPlasmaSwitch("bank");
  };
  const handleInputChangeSwitch = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSearch = () => {
    if (inputValues.city === "") {
      Toast("error", "Some Fields are Empty");
    } else {
      setSearchFilterValue(inputValues.city);
    }
  };
  const handleBloodSearch = () => {
    if (inputValues.bloodgroup === "" && inputValues.city === "") {
      Toast("error", "Some Fields are Empty");
    } else {
      setSearchFilterValue(inputValues.bloodgroup);
      setSearchCityFilter(inputValues.city);
    }
  };

  return (
    <>
      <div className="text-white font-semibold px-8 w-full border-b-2 border-white mb-2">
        <div className="flex flex-col w-1/2 px-8 py-20">
          {/* <div className="flex space-x-4">
            <div className="text-2xl">Blood Bank</div>
            <Switch {...label} onChange={handleInputChange} color="warning" />

            <div className="text-2xl">Plasma Bank</div>
          </div> */}
          <div className="flex items-center space-x-12 mt-12">
            <div className="flex flex-col w-1/2 space-y-8 ">
              <select
                name="state"
                id="state"
                className="h-10 rounded-lg text-black px-4 py-2"
                onChange={handleInputChangeSwitch}
                value={inputValues.state}
              >
                <option value="">City</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
              </select>
              <select
                name="city"
                id="city"
                className="h-10 rounded-lg text-black px-4 py-2"
                onChange={handleInputChangeSwitch}
                value={inputValues.city}
              >
                <option value="">Select Area</option>
                {cities.map((val, index) => {
                  return (
                    <option value={val} key={index}>
                      {val}
                    </option>
                  );
                })}
              </select>

              <select
                name="bloodgroup"
                id="bloodgroup"
                className="h-10 rounded-lg text-black px-4 py-2"
                onChange={handleInputChangeSwitch}
                value={inputValues.bloodgroup}
              >
                <option value="">Select BloodGroup</option>
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
            {/* <Link
              to={bankPlasmaSwitch === "bank" ? "/bloodbank" : "/plasmabank"}
            >
              <div
                className="text-md bg-white logo-color px-8 py-2 rounded-xl cursor-pointer"
                onClick={handleSearch}
              >
                Find
              </div>
            </Link> */}
          </div>
          <div className="mt-20 flex">
            <Link to="/donor">
              <div
                className="bg-white logo-color py-2 px-4 rounded-lg cursor-pointer"
                onClick={handleBloodSearch}
              >
                Find Donor
              </div>
            </Link>
          </div>
        </div>
        {/* Image section */}
      </div>
      <div className="totals-front flex space-x-20 w-full justify-center items-center py-8">
        <div className="h-32 w-64 bg-black border-white border-4 rounded-lg flex flex-col text-white font-bold justify-center items-center">
          <div className="text-xl">Total Donors</div>
          <div>14</div>
        </div>
        <div className="h-32 w-64 bg-black border-white border-4 rounded-lg flex flex-col text-white font-bold justify-center items-center">
          <div className="text-xl">Total Plasmabanks</div>
          <div>14</div>
        </div>
        <div className="h-32 w-64 bg-black border-white border-4 rounded-lg flex flex-col text-white font-bold justify-center items-center">
          <div className="text-xl">Total Bloodbanks</div>
          <div>14</div>
        </div>
      </div>

      <div className="bg-whtie h-screen">
        <div className="bg-white w-full">
          <div className="py-10 ">
            <div className="text-3xl font-bold text-center my-5 mt-20">
              Donors Register With DONOR Spot
            </div>

            <div className="w-2/3 bg-white h-72 mx-auto donors-front rounded-2xl">
              <div className="py-20 px-20">
                <Carousel responsive={responsive}>
                  {donors.map((val, index) => {
                    return (
                      <div
                        className="flex flex-col justify-center items-center"
                        key={index}
                      >
                        <div>
                          <MdPersonOutline className="text-6xl" />
                        </div>
                        <div>{val.fullname}</div>
                        <div>{val.bloodgroup}</div>
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full">
          <div className="pt-12 w-2/3 mx-auto">
            <div className="text-4xl font-bold text-center">We Save Lives</div>
            <div className="text-center capitalize text-xl mt-4 text-gray-600">
              " find blood and plasma donor near your location and make blood
              and plasma request as soon as possible "
            </div>
            <div className="flex justify-center items-center mt-12 py-20 space-x-8">
              <div className="flex flex-col justify-center items-center">
                <div>Icon here</div>

                <div className="font-bold text-xl">Find Blood</div>
                <div className="capitalize text-center text-gray-600 font-semibold">
                  find blood donors near your location and request the needed
                  blood type
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>Icon here</div>
                <div className="font-bold text-xl">Find Blood</div>
                <div className="capitalize text-center text-gray-600 font-semibold">
                  find blood donors near your location and request the needed
                  blood type
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>Icon here</div>
                <div className="font-bold text-xl">Find Blood</div>
                <div className="capitalize text-center text-gray-600 font-semibold">
                  find blood donors near your location and request the needed
                  blood type
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 w-2/3 mx-auto">
          <div className="text-4xl font-bold text-center">Lives Saved</div>
          <div className="text-center capitalize text-xl mt-4 text-gray-600">
            Save life connect helped saving the live of more than 100 people.
            Help us saving more!
          </div>
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Rogit</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              voluptatum cumque ab itaque eligendi. Doloremque sunt aspernatur
              dignissimos est vitae?
            </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Rogit</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              voluptatum cumque ab itaque eligendi. Doloremque sunt aspernatur
              dignissimos est vitae?
            </div>
          </div>
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Rogit</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              voluptatum cumque ab itaque eligendi. Doloremque sunt aspernatur
              dignissimos est vitae?
            </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Rogit</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              voluptatum cumque ab itaque eligendi. Doloremque sunt aspernatur
              dignissimos est vitae?
            </div>
          </div>
        </div>
        <div className="testimonial my-8 w-2/3 mx-auto flex justify-center items-center space-x-12 text-white">
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Rogit</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              voluptatum cumque ab itaque eligendi. Doloremque sunt aspernatur
              dignissimos est vitae?
            </div>
          </div>
          <div className="flex justify-center items-center flex-col w-1/2 p-5 rounded-xl">
            <div className="font-bold">Rogit</div>
            <div className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
              voluptatum cumque ab itaque eligendi. Doloremque sunt aspernatur
              dignissimos est vitae?
            </div>
          </div>
        </div>

        <div className="w-full footer-top h-52 flex flex-col justify-center items-center text-white font-bold">
          <div className="text-5xl">Start Saving Lives</div>
          <div className="mt-5">
            Become a donor or request for blood and help save lives
          </div>
          <Link to="/register">
            <div className="mt-6 bg-white logo-color px-12 py-2 rounded-full cursor-pointer tracking-widest">
              Register
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MainFront;
