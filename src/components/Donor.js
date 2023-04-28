import axios from "axios";
import React, { useEffect, useState } from "react";
import { REQUEST_URL } from "../CONSTANTS";
import { Toast, validateEmail } from "./helper/HelperFunctions";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div className="font-bold text-lg text-orange-500">
    <span className="pin1"> {text}</span>
    {/* {text} */}
  </div>
);

function Donor({
  switchData,
  setSwitchData,
  loggedIn,
  searchFilterValue,
  adminLoggedIn,
  setAllprofileData,
  allprofileData,
  searchCityFilter,
}) {
  const defaultProps = {
    // center: {
    //   lat: 32.1014,
    //   lng: 74.88,
    // },
    center: {
      lat: 15.9129,
      lng: 79.74,
    },
    zoom: 5,
  };

  const [addBankCheck, setAddBankCheck] = useState(false);
  const [addBankBtn, setAddBankBtn] = useState(false);
  const [deleteCheck, setDeleteCheck] = useState(false);
  const [combinedData, setCombinedData] = useState([]);
  function filterData(users, profiles) {
    const dummyData = [];

    for (let i = 0; i < users.length; i++) {
      let temp = {};
      for (let j = 0; j < profiles.length; j++) {
        if (
          profiles[j].city.includes(searchCityFilter) &&
          users[i].bloodgroup.includes(searchFilterValue) &&
          users[i]._id === profiles[j].userid
        ) {
          temp = users[i];
          temp["profileobj"] = profiles[j];

          if (
            dummyData.indexOf(temp) === -1 &&
            temp.email !== "lifesaver0606@gmail.com"
          )
            dummyData.push(temp);
        }
      }
    }
    setSwitchData(dummyData);
    console.log(switchData, "switch data");
  }

  useEffect(() => {
    console.log(searchFilterValue, "blood", searchCityFilter, "city");

    axios({
      method: "get",
      url: `${REQUEST_URL}/auth/getusers`,
    }).then((response) => {
      axios({
        method: "get",
        url: `${REQUEST_URL}/userroutesprofile/getprofiles`,
      }).then((response2) => {
        // setAllprofileData(response2.data.result);
        // setSwitchData(response.data.result);
        console.log(response2.data.result);
        filterData(response.data.result, response2.data.result);
      });
    });
  }, [addBankBtn, searchFilterValue, deleteCheck]);

  const deleteItem = (id) => {
    axios({
      method: "post",
      url: `${REQUEST_URL}/userroutesprofile/deleteprofile`,
      data: {
        userid: id,
      },
    }).then((response) => {
      Toast("success", response.data.message);
      setDeleteCheck(!deleteCheck);
    });
  };
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
  // if (loggedIn)
  return (
    <div className="bg-white w-full">
      <div className="w-2/3 mx-auto">
        <div className="pt-8 text-2xl font-bold tracking-widest">Donors</div>
        <div className="mt-2 text-md font-semibold text-gray-600">
          Total number of Donors : {switchData.length}
        </div>

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
                      {val.fullname}
                    </div>
                    <div>
                      <div>
                        <span className="font-bold">Email: </span>
                        {val.email}
                      </div>
                      <div>
                        <span className="font-bold">Date of Birth: </span>
                        {val.dob}
                      </div>
                      <div>
                        {" "}
                        <span className="font-bold">Gender: </span>
                        {val.gender}
                      </div>
                      <div>
                        {" "}
                        <span className="font-bold">Blood Group: </span>
                        {val.bloodgroup}
                      </div>
                      <div>
                        {" "}
                        <span className="font-bold">Disease: </span>
                        {val.profileobj && val.profileobj.disease}
                      </div>
                      <div>
                        {" "}
                        <span className="font-bold">
                          Available For Donation:{" "}
                        </span>
                        {val.profileobj && val.profileobj.availability}
                      </div>
                      <div>
                        {" "}
                        <span className="font-bold">Mobile Number: </span>
                        {val.profileobj && val.profileobj.mobilenumber}
                      </div>
                      {val.profileobj && (
                        <div>
                          {" "}
                          <span className="font-bold">Address: </span>
                          {val.profileobj.city}, {val.profileobj.district},{" "}
                          {val.profileobj.state}
                        </div>
                      )}

                      {loggedIn && adminLoggedIn === "true" && (
                        <div
                          className="navheader-btn cursor-pointer mt-4 w-fit"
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
        {switchData[0] && switchData[0].profileobj && (
          <div className="h-screen w-full mt-16">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyDZIpOewtiUkfBBfsDMPeJ8zZzxYJE1oQE",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              {switchData.map((val, index) => {
                return (
                  <AnyReactComponent
                    lat={val.profileobj.lat}
                    lng={val.profileobj.long}
                    text={val.fullname}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
        )}
      </div>
    </div>
  );
  // return (
  //   <div className="bg-white w-full">
  //     <div className="w-2/3 mx-auto pt-8">
  //       <div className="text-4xl font-bold ">You Need to login first</div>
  //     </div>
  //   </div>
  // );
}

export default Donor;
