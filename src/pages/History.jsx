import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import VideoList from "../components/VideoList.jsx";
import Container from "../components/Container.jsx";
import useAxiosPrivate from "../components/customHooks/useAxiosPrivate.js";
import { getWatchHistory } from "../store/slices/useSlice.js";
import VideoList2 from "../components/VideoList2.jsx";

function History() {
  const axiosPrivate = useAxiosPrivate();
  const videos = useSelector((state) => state.user?.history);
  const dispatch = useDispatch();
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axiosPrivate.get("/api/v1/users/history");
      // console.log("Watch History", response);
      if (response.status === 200) {
        dispatch(getWatchHistory(response.data.data));
      }
    };
    // dispatch(getWatchHistory());
    fetchHistory();
  }, [dispatch]);

  if (videos && videos.length > 0) {
    return (
      <>
        <Container>
          <div className="w-4/5 p-4">
            {videos.map((video) => (
              <VideoList2
                key={video._id}
                avatar={video.owner?.avatar.url}
                duration={video.duration}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail?.url}
                createdAt={video.createdAt}
                views={video.views}
                channelName={video?.owner?.username}
                videoId={video._id}
              />
            ))}
          </div>
        </Container>
      </>
    );
  }
  return <></>;
}

export default History;
