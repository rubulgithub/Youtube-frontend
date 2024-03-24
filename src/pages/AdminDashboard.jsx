import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../components/customHooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelStats,
  getChannelVideos,
} from "../store/slices/dashboardSlice.js";
import Container from "../components/Container.jsx";
import UploadVideo from "../components/UploadVideo.jsx";
import EditVideo from "../components/EditVideo";
import DeleteConfirmation from "../components/DeleteConfirmation";
import Spinner from "../components/Spinner";
import HeaderSection from "../components/dashboard/HeaderSection.jsx";
import StatsSection from "../components/dashboard/StatsSection.jsx";
import VideoTable from "../components/dashboard/VideoTable.jsx";

function AdminDashboard() {
  const username = useSelector((state) => state.auth?.userData?.username);
  const channelStats = useSelector((state) => state.dashboard.channelStats);
  //   console.log("channelStats: ", channelStats);
  const videos = useSelector((state) => state.dashboard?.channelVideos);
  // console.log("Videos: ", videos);
  const uploaded = useSelector((state) => state.video?.uploaded);
  const publishToggled = useSelector((state) => state.video?.publishToggled);
  const deleting = useSelector((state) => state.video?.loading);

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [popUp, setPopUp] = useState({
    uploadVideo: false,
    editVideo: false,
    deleteVideo: false,
  });

  const handleDeleteVideo = async () => {
    await axiosPrivate.delete(`/api/v1/video/${videoDetails?._id}`);
    setPopUp((prev) => ({
      ...prev,
      deleteVideo: !prev.deleteVideo,
    }));
  };

  useEffect(() => {
    const fetchChannelStats = async () => {
      const res = await axiosPrivate.get("/api/v1/dashboard/stats");
      //   console.log("Stats: ", res);
      if (res.status === 200) {
        dispatch(getChannelStats(res.data.data));
      }
    };
    fetchChannelStats();
  }, [dispatch]);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      const res = await axiosPrivate.get("/api/v1/dashboard/videos");
      // console.log("Videos: ", res);
      if (res.status === 200) {
        dispatch(getChannelVideos(res.data.data));
      }
    };
    fetchChannelVideos();
  }, [dispatch, uploaded, publishToggled, deleting]);

  return (
    <>
      <Container>
        <div className="w-full relative h-screen text-black space-y-5 z-10 py-4 px-1">
          {popUp.uploadVideo && <UploadVideo setUploadVideoPopup={setPopUp} />}

          {/* Edit-Video */}
          {popUp.editVideo && (
            <div className="w-full flex justify-center top-24 fixed z-20">
              <EditVideo
                setEditVideoPopup={setPopUp}
                title={videoDetails?.title}
                description={videoDetails?.description}
                videoId={videoDetails?._id}
              />
            </div>
          )}

          {/* Delete-Video */}
          {popUp.deleteVideo && (
            <div className="w-full fixed top-52 flex justify-center z-20">
              <DeleteConfirmation
                video={true}
                onCancel={() =>
                  setPopUp((prev) => ({
                    ...prev,
                    deleteVideo: !prev.deleteVideo,
                  }))
                }
                onDelete={handleDeleteVideo}
              />
            </div>
          )}
          {deleting && (
            <div className="w-full fixed top-20 flex justify-center z-20">
              <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                <Spinner />
                <span className="text-md font-bold">Deleting video...</span>
              </div>
            </div>
          )}

          {/* Dashboard Header */}
          <HeaderSection username={username} setPopUp={setPopUp} />

          {/* channel stats section */}
          <StatsSection dashboard={channelStats} />

          {/* Table for managing channel video */}
          <VideoTable
            videos={videos}
            setPopUp={setPopUp}
            setVideoDetails={setVideoDetails}
          />
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
