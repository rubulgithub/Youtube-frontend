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
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer"
        onClick={() => navigate(`/watch/${videoId}`)}
      >
        <div className="relative aspect-w-16 gap-2 aspect-h-9">
          <img
            src={thumbnail}
            className="object-cover w-[400px] h-56 rounded-sm"
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
