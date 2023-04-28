import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { REQUEST_URL } from "../../CONSTANTS";

function ProfileHeader({
  loggedIn,
  setProfileData,
  setSwitchData,
  switchData,
}) {
  const [profileCheck, setProfileCheck] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    axios({
      method: "post",
      url: `${REQUEST_URL}/userroutesprofile/findprofile`,
      data: { id: localStorage.getItem("bloodid") },
    }).then((response) => {
      if (response.data.result.length) {
        setProfileData(response.data.result[0]);
        setProfileCheck(true);
      }
    });

    axios({
      method: "get",
      url: `${REQUEST_URL}/auth/getusers`,
    }).then((response) => {
      setSwitchData(response.data.result);
      getUserName(response.data.result);
    });
  }, []);
  function getUserName(data) {
    const id = localStorage.getItem("bloodid");
    if (data.length) {
      for (let index = 0; index < data.length; index++) {
        if (data[index]._id === id) {
          setUserName(data[index].fullname);
          break;
        }
      }
    }
  }
  if (loggedIn)
    return (
      <div className="bg-white w-full">
        <div className="w-2/3 mx-auto pt-8">
          <div className="text-4xl font-bold ">Profile</div>
          <div className="text-xl font-semibold tracking-wider text-gray-600">
            Welcome {profileCheck ? `${userName}` : "User"}
          </div>

          {!profileCheck && (
            <>
              <div className="text-xl font-semibold tracking-wider text-gray-600">
                You have not yet set up a profile, Please add some info.
              </div>
              <Link to="/create-profile">
                <div className="mt-6 tracking-wider app-color px-10 py-4 text-white font-bold text-center cursor-pointer">
                  Create Profile
                </div>
              </Link>
            </>
          )}
          {profileCheck && (
            <Link to="/create-profile">
              <div className="mt-6 tracking-wider app-color px-10 py-4 text-white font-bold text-center cursor-pointer">
                Update Profile
              </div>
            </Link>
          )}
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

export default ProfileHeader;
