import React, { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import useAxiosPrivate from "./customHooks/useAxiosPrivate";

const Like = ({
  isLiked,
  likesCount = 0,
  tweetId,
  commentId,
  videoId,
  size,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [localLikesCount, setLocalLikesCount] = useState(likesCount);

  const handleLikeToggle = async () => {
    if (localIsLiked) {
      setLocalLikesCount((prev) => prev - 1);
    } else {
      setLocalLikesCount((prev) => prev + 1);
    }

    setLocalIsLiked((prev) => !prev);

    if (tweetId) {
      try {
        const res = await axiosPrivate.post(`/api/v1/likes/t/${tweetId}`);

        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (commentId) {
      try {
        const res = await axiosPrivate.post(`/api/v1/likes/c/${commentId}`);

        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (videoId) {
      try {
        const res = await axiosPrivate.post(`/api/v1/likes/v/${videoId}`);

        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setLocalIsLiked(isLiked);
    setLocalLikesCount(likesCount);
  }, [isLiked, likesCount]);
  return (
    <>
      <div className="flex items-center gap-1">
        <BiSolidLike
          size={size}
          onClick={handleLikeToggle}
          className={`cursor-pointer ${localIsLiked ? "text-purple-500" : ""}`}
        />
        <span className="text-xs mr-3">{localLikesCount}</span>
        <BiSolidDislike size={size} />
      </div>
    </>
  );
};

export default Like;
