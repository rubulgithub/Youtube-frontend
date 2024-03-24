import React from "react";
import { formatDuration, timeAgo } from "./helpers/timeDuration.js";
import { useNavigate } from "react-router-dom";

function VideoList2({
  thumbnail,
  duration,
  title,
  views = 0,
  avatar,
  channelName,
  createdAt,
  videoId,
  description,
}) {
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelName}`);
  };

  return (
    <>
      <div
        className="flex w-full h-32 content-start p-2 cursor-pointer hover:bg-gray-200"
        onClick={() => navigate(`/watch/${videoId}`)}
      >
        <div className="relative w-1/4 h-full">
          <img
            src={thumbnail}
            className="object-cover w-full h-full rounded-md"
            alt="Video Thumbnail"
          />
          <span className="absolute bottom-1 right-1 rounded-sm text-sm bg-black text-white px-[5px]">
            {formatDuration(duration)}
          </span>
        </div>
        <div className="flex flex-col justify-start w-3/4 ml-2 gap-2">
          <div className="">
            <h2 className="font-medium text-black text-lg">{title}</h2>
          </div>
          <div className="flex flex-col text-sm text-slate-600">
            <div className="">
              {channelName && (
                <h2 className=" text-slate-600">{channelName}</h2>
              )}
            </div>
            <div className="">
              {views && <span>{views} Views</span>}{" "}
              {createdAt && <span> {timeAgo(createdAt)} </span>}
            </div>
            <div className="">
              {description && (
                <h2 className=" text-slate-600">{description}</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoList2;
