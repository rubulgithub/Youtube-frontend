import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoVideosFound from "../components/NoVideosFound.jsx";
// import VideoList from "../components/VideoList.jsx";
import Container from "../components/Container.jsx";
import { makeVideosNull } from "../store/slices/videoSlice.js";
import useAxiosPrivate from "../components/customHooks/useAxiosPrivate.js";
import { timeAgo } from "../components/helpers/timeDuration.js";
import { getLikedVideos } from "../store/slices/likeSlice.js";
import VideoList2 from "../components/VideoList2.jsx";
import { useNavigate } from "react-router-dom";

function LikedVideos() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const likedVideos = useSelector((state) => state.like?.likedVideos);
  // console.log("Liked Videos", likedVideos);
  const navigate = useNavigate();

  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchLikedVideos = async () => {
      const response = await axiosPrivate.get("/api/v1/likes/videos");
      // console.log("res likes", response);
      if (response.status === 200) {
        dispatch(getLikedVideos(response.data.data));
      }
    };
    fetchLikedVideos();
    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  if (likedVideos?.length == 0) {
    return <NoVideosFound />;
  }

  return (
    <>
      <Container>
        <div className="flex w-full">
          {/* Left side: Most recent liked video and total number of video */}
          <div className=" flex flex-col items-center w-1/3 p-4 bg-[#d6ccc2] rounded-md">
            <div
              className="w-4/5 h-48 m-4"
              onClick={() =>
                navigate(`/watch/${likedVideos[0].likedVideo._id}`)
              }
            >
              <div className="video-item">
                <img
                  className="w-full h-48 object-cover rounded-md"
                  src={likedVideos[0].likedVideo.thumbnail?.url}
                  alt={likedVideos[0].likedVideo.title}
                />
              </div>
            </div>
            <div className="mt-2 mr-28 flex flex-col gap-3">
              <div className="">
                <h6 className="text-3xl text-[#000411] font-bold">
                  Liked Videos
                </h6>
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">
                  {likedVideos[0].likedBy[0].fullName}
                </h3>
                <span>{likedVideos.length} Videos</span>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-4 gap-4">
            {likedVideos?.map((video) => (
              <VideoList2
                key={video.likedVideo._id}
                avatar={video.likedVideo.ownerInfo?.avatar}
                duration={video.likedVideo.duration}
                title={video.likedVideo.title}
                thumbnail={video.likedVideo.thumbnail?.url}
                createdAt={video.likedVideo.createdAt}
                views={video.likedVideo.views}
                channelName={video.likedVideo.ownerInfo?.username}
                videoId={video.likedVideo._id}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

export default LikedVideos;
