import React, { useCallback, useEffect, useState } from "react";
import Container from "../components/Container.jsx";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "../components/InfiniteScroll.jsx";
import { getAllVideos, makeVideosNull } from "../store/slices/videoSlice.js";
import useAxiosPrivate from "../components/customHooks/useAxiosPrivate.js";
import VideoList from "../components/VideoList.jsx";

const HomePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video?.videos?.docs);
  const loading = useSelector((state) => state.video?.loading);
  const hasNextPage = useSelector((state) => state.video?.hasNextPage);
  const [page, setPage] = useState(1);
  // console.log(videos);

  useEffect(() => {
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
        // console.log("All videos- ", res);
        if (res.status === 200) {
          dispatch(getAllVideos(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getVideos();

    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  const fetchMoreVideos = useCallback(() => {
    if (hasNextPage) {
      dispatch(getAllVideos({ page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [page, hasNextPage, dispatch]);

  return (
    <Container>
      <InfiniteScroll fetchMore={fetchMoreVideos} hasNextPage={hasNextPage}>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white">
          {videos?.map((video, i) => (
            <VideoList
              key={i}
              avatar={video.ownerDetails?.avatar}
              duration={video.duration}
              thumbnail={video.thumbnail?.url}
              createdAt={video.createdAt}
              views={video.views}
              title={video.title}
              channelName={video.ownerDetails.username}
              videoId={video._id}
            />
          ))}
        </div>
      </InfiniteScroll>
    </Container>
  );
};

export default HomePage;
