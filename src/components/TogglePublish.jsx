import React, { useState } from "react";
import useAxiosPrivate from "./customHooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { togglePublishStatus } from "../store/slices/videoSlice.js";

function TogglePublish({ videoId, isPublish }) {
  const [isChecked, setIsChecked] = useState(isPublish);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const tooglePublishStatus = async () => {
    const res = await axiosPrivate.patch(
      `/api/v1/video//toggle/publish/${videoId}`
    );
    if (res.status === 200) {
      // console.log("Toogle: ", res);
      dispatch(togglePublishStatus(res.data.isPublish));
    }
    setIsChecked((prev) => !prev);
    // console.log("toogle it");
  };

  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={isChecked}
          onChange={tooglePublishStatus}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </>
  );
}

export default TogglePublish;
