import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../components/customHooks/useAxiosPrivate.js";
import Description from "../components/Description.jsx";
import CommentsList from "../components/CommentsList.jsx";
import Spinner from "../components/Spinner.jsx";
import Video from "../components/Video.jsx";
import InfiniteScroll from "../components/InfiniteScroll";
import { videoUploaded } from "../store/slices/videoSlice.js";
import {
  cleanUpComments,
  getVideoComments,
  gettingVideoComments,
} from "../store/slices/commentSlice.js";
import Comment from "../components/Comment.jsx";
// import TweetAndComment from "../components/TweetAndComment.jsx";

function VideoDetail() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video);
  const { loading, totalComments, hasNextPage } = useSelector(
    (state) => state.comment
  );
  const comments = useSelector((state) => state.comment?.comments);
  // console.log("Loading", loading);
  // console.log("comments", comments);
  // console.log("totalComments", totalComments);
  // console.log("hasNextPage", hasNextPage);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAVideo = async () => {
      try {
        const VideoRes = await axiosPrivate.get(`/api/v1/video/${videoId}`);
        // console.log("video res", VideoRes);
        dispatch(videoUploaded(VideoRes.data.data));
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    const getComments = async () => {
      try {
        let url = new URL(
          `/api/v1/comments/${videoId}`,
          window.location.origin
        );
        url.searchParams.set("page", page);
        url.searchParams.set("limit", 10);
        const res = await axiosPrivate.get(url.toString());
        // console.log("Comment res", res);
        if (res.status === 200) {
          dispatch(getVideoComments(res.data.data));
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (videoId) {
      getAVideo();
      getComments();
    }

    return () => dispatch(cleanUpComments());
  }, [videoId, page, dispatch, axiosPrivate]);

  const fetchMoreComments = useCallback(() => {
    if (!loading && hasNextPage) {
      dispatch(getVideoComments({ videoId, page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [page, loading, hasNextPage, dispatch, videoId]);

  return (
    <>
      <Video src={video?.videoFile?.url} poster={video?.thumbnail?.url} />
      <Description
        avatar={video?.owner?.avatar}
        channelName={video?.owner?.username}
        createdAt={video?.createdAt}
        description={video?.description}
        isSubscribed={video?.owner?.isSubscribed}
        likesCount={video?.likesCount}
        subscribersCount={video?.owner?.subscribersCount}
        title={video?.title}
        views={video?.views}
        key={video?._id}
        isLiked={video?.isLiked}
        videoId={video?._id}
        channelId={video?.owner?._id}
      />
      <div className="text-black font-semibold sm:px-5 px-3">
        {totalComments} Comments
      </div>
      <Comment comment={true} videoId={video?._id} />
      <InfiniteScroll fetchMore={fetchMoreComments} hasNextPage={hasNextPage}>
        <div className="w-full sm:max-w-4xl">
          {comments?.map((comment) => (
            <CommentsList
              key={comment?._id}
              avatar={comment?.owner?.avatar}
              commentId={comment?._id}
              content={comment?.content}
              createdAt={comment?.createdAt}
              fullName={comment?.owner?.fullName}
              isLiked={comment?.isLiked}
              likesCount={comment?.likesCount}
              username={comment?.owner?.username}
            />
          ))}
          {/* {loading && (
            <div className="w-full flex justify-center items-center">
              <Spinner width={10} />
            </div>
          )} */}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default VideoDetail;
