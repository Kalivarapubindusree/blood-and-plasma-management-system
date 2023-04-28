import axios from "axios";
import React, { useEffect, useState } from "react";
import { REQUEST_URL } from "../CONSTANTS";
import { Toast, validateEmail } from "./helper/HelperFunctions";

const bloodbankitems = [
  {
    labname: "dummy name",
    address: "dummy address",
    landmark: "dummy",
    city: "dummy",
    pincode: "dummy",
    email: "dummy",
    mobilenumber: "dummy",
    componentsavailable: "dummy",
    license: "dummy",
    licenseissuedate: "dummy",
    opentime: "dummy",
  },
  {
    labname: "dummy name 2",
    address: "dummy address 2",
    landmark: "dummy 2",
    city: "dummy 2",
    pincode: "dummy",
    email: "dummy",
    mobilenumber: "dummy",
    componentsavailable: "dummy",
    license: "dummy",
    licenseissuedate: "dummy",
    opentime: "dummy",
  },
];
function Event({ switchData, setSwitchData, loggedIn, adminLoggedIn }) {
  const [addBankCheck, setAddBankCheck] = useState(false);
  const [addBankBtn, setAddBankBtn] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState(false);

  const [interestedBtn, setInterestedBtn] = useState(false);

  const [inputValues, setInputValues] = useState({
    eventtitle: "",
    eventdescription: "",
    eventdate: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `${REQUEST_URL}/userroutesevent/get`,
    }).then((response) => {
      setSwitchData(response.data.result);
    });
    console.log(adminLoggedIn, "admin check1111");
  }, [addBankBtn, interestedBtn, deleteCheck]);

  const handleSubmit = (e) => {
    if (
      inputValues.eventtitle === "" ||
      inputValues.eventdescription === "" ||
      inputValues.eventdate === ""
    ) {
      Toast("error", "Some Fields are Empty");
    } else {
      axios({
        method: "post",
        url: `${REQUEST_URL}/userroutesevent/add`,
        data: {
          userid: localStorage.getItem("bloodid"),
          eventtitle: inputValues.eventtitle,
          eventdescription: inputValues.eventdescription,
          eventdate: inputValues.eventdate,
        },
      }).then((response) => {
        console.log(response.data);
        Toast("success", "BloodBank Added");
        setAddBankBtn(false);
        setTimeout(() => {
          setAddBankCheck(false);
        }, 3000);
        setInputValues({
          eventtitle: "",
          eventdescription: "",
          eventdate: "",
        });
      });
    }
  };
  function convertToSimpleDate(val) {
    const d = new Date(val);
    const date = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
    return date;
  }
  const updateInterested = (val, eventid, users) => {
    const userid = localStorage.getItem("bloodid");
    if (!users.includes(localStorage.getItem("bloodid"))) {
      users.push(userid);

      axios({
        method: "post",
        url: `${REQUEST_URL}/userroutesevent/updateinterested`,
        data: {
          eventid: eventid,
          interested: true,
          usersinterested: users,
        },
      }).then((response) => {
        setInterestedBtn(true);
        setInterestedBtn(false);
      });
    }
  };
  const updateNotInterested = (val, eventid, users) => {
    const userid = localStorage.getItem("bloodid");
    if (users.includes(userid)) {
      users = users.filter((x) => x !== userid);
      if (val > 0);
      axios({
        method: "post",
        url: `${REQUEST_URL}/userroutesevent/updateinterested`,
        data: {
          eventid: eventid,
          interested: false,
          usersinterested: users,
        },
      }).then((response) => {
        setInterestedBtn(true);
        setInterestedBtn(false);
      });
    }
  };
  const deleteItem = (id) => {
    axios({
      method: "post",
      url: `${REQUEST_URL}/userroutesevent/delete`,
      data: {
        id: id,
      },
    }).then((response) => {
      Toast("success", response.data.message);
      setDeleteCheck(!deleteCheck);
    });
  };
  return (
    <div className="bg-white w-full">
      <div className="w-2/3 mx-auto">
        <div className="pt-5">
          {addBankCheck && (
            <div className="app-color px-5 py-3 font-bold text-white">
              Event Added
            </div>
          )}
        </div>
        <div className="mt-8 text-2xl font-bold tracking-widest">Events</div>
        <div className="mt-2 text-md font-semibold text-gray-600">
          Total number of events : {switchData.length}
        </div>
        {loggedIn && adminLoggedIn === "true" && (
          <div className="flex justify-between items-center px-5 mt-8 add-bloodbank py-3 ">
            <div className="text-lg text-gray-600">Add new Event</div>
            <div
              className="app-color px-8 font-bold py-2 rounded-full text-white cursor-pointer"
              onClick={(e) => {
                setAddBankBtn(!addBankBtn);
              }}
            >
              Add
            </div>
          </div>
        )}

        {addBankBtn && (
          <div className="bloodbank-form">
            <div className="logo-color text-4xl my-8 font-bold tracking-wider">
              Add Event
            </div>

            <div className="mx-auto mt-4">
              <div className="flex flex-col w-full">
                <label htmlFor="eventtitle" className="logo-color font-bold">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="eventtitle"
                  className="bloodbank-input-border px-3 py-1 w-full"
                  onChange={handleInputChange}
                  value={inputValues.eventtitle}
                />
              </div>
            </div>
            <div className="mx-auto mt-4 ">
              <div className="flex flex-col w-full h-28">
                <label
                  htmlFor="eventdescription"
                  className="logo-color font-bold"
                >
                  Event Description *
                </label>
                <textarea
                  type="textarea"
                  rows="15"
                  name="eventdescription"
                  className="bloodbank-input-border px-3 py-1 w-full"
                  onChange={handleInputChange}
                  value={inputValues.eventdescription}
                />
              </div>
            </div>
            <div className="mx-auto mt-4">
              <div className="flex flex-col w-full">
                <label htmlFor="eventdate" className="logo-color font-bold">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventdate"
                  className="bloodbank-input-border px-3 py-1 w-full"
                  onChange={handleInputChange}
                  value={inputValues.eventdate}
                />
              </div>
            </div>

            <div className="my-8 text-white">
              <div
                className="app-color px-10 py-4 text-center font-bold cursor-pointer"
                onClick={handleSubmit}
              >
                Add
              </div>
            </div>
          </div>
        )}

        {switchData.length > 0 ? (
          switchData.map((val, index) => {
            return (
              <div className="py-3 px-2 my-4 all-bloodbanks" key={index}>
                <div className="bank-item flex">
                  <div className="font-bold text-4xl w-1/2 flex justify-center items-center logo-color">
                    DONOR SPOT
                  </div>
                  <div className="px-8 w-full">
                    <div className="text-4xl font-semibold w-1/2">
                      {val.eventtitle}
                    </div>
                    <div className="mt-4 tracking-widest text-base text-gray-600">
                      {val.eventdescription}
                    </div>
                    <div className=" mt-6 py-4 flex justify-between items-center text-lg text-gray-500 events-bordertop">
                      <div>
                        <span>Interested: </span>
                        {val.interested}
                      </div>
                      <div>
                        <span>Event Date: </span>
                        {val.eventdate}
                      </div>
                      <div>
                        <span>Posted On: </span>
                        {convertToSimpleDate(val.createdAt)}
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <div
                        className="navheader-btn cursor-pointer"
                        onClick={() =>
                          updateInterested(
                            val.interested,
                            val._id,
                            val.usersinterested
                          )
                        }
                      >
                        Interested
                      </div>
                      <div
                        className="navheader-btn cursor-pointer"
                        onClick={() =>
                          updateNotInterested(
                            val.interested,
                            val._id,
                            val.usersinterested
                          )
                        }
                      >
                        Not Interested
                      </div>
                      {loggedIn && adminLoggedIn === "true" && (
                        <div
                          className="navheader-btn cursor-pointer w-fit"
                          onClick={() => {
                            deleteItem(val._id);
                          }}
                        >
                          Delete
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-2xl tracking-wider mt-8">No Item to Display</div>
        )}
      </div>
    </div>
  );
}

export default Event;
