import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import ChannelHeader from "../../components/channel/ChannelHeader.jsx";
import ChannelNavigate from "../../components/channel/ChannelNavigate.jsx";
import useAxiosPrivate from "../../components/customHooks/useAxiosPrivate.js";
import { getUserChannelProfile } from "../../store/slices/useSlice.js";

function Channel() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { username } = useParams();
  // console.log("username:", username);

  const channel = useSelector((state) => state.user?.profileData);
  // console.log("Channel", channel);
  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axiosPrivate.get(`/api/v1/users/c/${username}`);
      // console.log("Profile:", response);
      if (response.status === 200) {
        dispatch(getUserChannelProfile(response.data.data));
      }
    };

    fetchProfile();
  }, [dispatch, username]);

  window.scrollTo(0, 0);

  return (
    <>
      {channel && (
        <ChannelHeader
          username={username}
          coverImage={channel?.coverImage.url}
          avatar={channel?.avatar}
          subscribedCount={channel?.channelsSubscribedToCount}
          fullName={channel?.fullName}
          subscribersCount={channel?.subcribersCount}
          isSubscribed={channel?.isSubscribed}
          channelId={channel?._id}
        />
      )}
      <ChannelNavigate username={username} />
      <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
        <Outlet />
      </div>
    </>
  );
}

export default Channel;
