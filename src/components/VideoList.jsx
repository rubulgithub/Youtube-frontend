import React from "react";
import { formatDuration, timeAgo } from "./helpers/timeDuration.js";
import { useNavigate } from "react-router-dom";

function VideoList({
  thumbnail,
  duration,
  title,
  views = 0,
  avatar,
  channelName,
  createdAt,
  videoId,
}) {
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/channel/${channelName}`);
  };

  // console.log(avatar);

  return (
    <>
      <div
        className="w-full sm:p-2 cursor-pointer "
        onClick={() => navigate(`/watch/${videoId}`)}
      >
        <div className="relative sm:h-60 h-48">
          <img
            src={thumbnail}
            className="object-cover w-full h-full rounded-md"
          />
          <span className="absolute bottom-2 right-2 rounded-lg text-sm bg-black py-1 px-2">
            {formatDuration(duration)}
          </span>
        </div>
        <div className="flex items-start py-2 gap-2">
          {avatar && (
            <div onClick={handleAvatarClick}>
              <img
                src={avatar}
                className="w-8 h-8 rounded-full object-cover border border-slate-700"
              />
            </div>
          )}
          <div>
            <h2 className="font-medium text-black">{title}</h2>
            {channelName && (
              <h2 className="text-xs space-x-1 text-slate-500">
                {channelName}
              </h2>
            )}
            <div className="text-xs space-x-1 text-slate-500">
              <span>{views} Views</span> .<span>{timeAgo(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoList;
