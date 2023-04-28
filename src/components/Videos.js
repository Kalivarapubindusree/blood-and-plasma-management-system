import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { REQUEST_URL } from "../CONSTANTS";
import { Toast } from "./helper/HelperFunctions";

function Videos({ loggedIn, adminLoggedIn }) {
  const [videoData, setVideoData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${REQUEST_URL}/userroutesvideo/get`,
    }).then((response) => {
      setVideoData(response.data.result);
    });
  }, [inputValue, check]);

  const onDelete = (id) => {
    axios({
      method: "post",
      url: `${REQUEST_URL}/userroutesvideo/delete`,
      data: {
        urlid: id,
      },
    }).then((response) => {
      Toast("success", response.data.message);
      setCheck(!check);
    });
  };
  const onSubmit = () => {
    if (inputValue === "") {
      Toast("error", "Some Fields are Empty");
    } else {
      axios({
        method: "post",
        url: `${REQUEST_URL}/userroutesvideo/add`,
        data: {
          url: inputValue,
        },
      }).then((response) => {
        Toast("success", response.data.message);
        setInputValue("");
      });
    }
  };
  return (
    <div className="bg-white h-full">
      <div className="w-2/3 mx-auto">
        <div className="pt-8 text-2xl font-bold tracking-widest">Videos</div>
        <div className="mt-2 text-md font-semibold text-gray-600">
          Total number of videos : {videoData.length}
        </div>
        {loggedIn && adminLoggedIn === "true" && (
          <div className="flex justify-between items-center px-5 mt-8 add-bloodbank py-3 ">
            <div className="text-lg text-gray-600">Add new Video</div>
            <input
              type="text"
              className="contact-border w-1/2 py-2"
              placeholder="Enter Video Url"
              onChange={handleInputChange}
              value={inputValue}
            />
            <div
              className="app-color px-8 font-bold py-2 rounded-full text-white cursor-pointer"
              onClick={(e) => {
                onSubmit();
              }}
            >
              Add
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-16 justify-center items-center py-10">
          {videoData.map((val, index) => {
            return (
              <div>
                <ReactPlayer
                  url={val.url}
                  controls
                  playbackRate={2}
                  width="796px"
                  height="404px"
                />
                {loggedIn && adminLoggedIn === "true" && (
                  <div
                    className="mt-2 navheader-btn text-center tracking-widest cursor-pointer"
                    onClick={() => {
                      onDelete(val._id);
                    }}
                  >
                    Delete
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Videos;
