import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideoList from "../../components/VideoList";
import { getAllVideos, makeVideosNull } from "../../store/slices/videoSlice.js";
import useAxiosPrivate from "../../components/customHooks/useAxiosPrivate.js";

function ChannelVideos() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const userId = useSelector((state) => state.user?.profileData?._id);
  const videos = useSelector((state) => state.video?.videos?.docs);
  // console.log("Video see: ", videos);
  const [searchParams, setSearchParams] = useState();
  const [activeButton, setActiveButton] = useState("button1");

  useEffect(() => {
    const sortBy = searchParams?.sortBy;
    const sortType = searchParams?.sortType;
    const getVideos = async (userId, sortBy, sortType, query, page, limit) => {
      try {
        const url = "/api/v1/video";

        if (userId) url.searchParams.set("userId", userId);
        if (query) url.searchParams.set("query", query);
        if (page) url.searchParams.set("page", page);
        if (limit) url.searchParams.set("limit", limit);
        if (sortBy && sortType) {
          url.searchParams.set("sortBy", sortBy);
          url.searchParams.set("sortType", sortType);
        }

        const res = await axiosPrivate.get(url);
        // console.log("All video for profile- ", res);
        if (res.status === 200) {
          dispatch(getAllVideos(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getVideos();

    return () => dispatch(makeVideosNull());
  }, [dispatch, userId, searchParams]);

  //   if (videos?.length == 0) {
  //     return <NoVideosFound />;
  //   }

  const handleSort = (sortBy, sortType = "asc") => {
    setSearchParams({ sortBy, sortType });
  };

  return (
    <>
      {/* For sorting latest, popular and oldest videos */}
      <div className="w-full p-2 text-white flex gap-4">
        <button
          onClick={() => {
            setActiveButton("button1");
            handleSort("createdAt", "desc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button1" ? "bg-purple-500" : "bg-[#222222]"
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => {
            setActiveButton("button2");
            handleSort("views", "desc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button2" ? "bg-purple-500" : "bg-[#222222]"
          }`}
        >
          Popluar
        </button>
        <button
          onClick={() => {
            setActiveButton("button3");
            handleSort("createdAt", "asc");
          }}
          className={`group py-1 px-2 rounded-md ${
            activeButton === "button3" ? "bg-purple-500" : "bg-[#222222]"
          }`}
        >
          Oldest
        </button>
      </div>
      {/* Video listing */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white">
        {videos?.map((video) => (
          <VideoList
            key={video._id}
            avatar={video.avatar?.url}
            duration={video.duration}
            title={video.title}
            thumbnail={video.thumbnail?.url}
            createdAt={video.createdAt}
            views={video.views}
            videoId={video._id}
          />
        ))}
      </div>
    </>
  );
}

export default ChannelVideos;
