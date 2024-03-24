import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserChannelSubscribers } from "../../store/slices/subscriptionSlice";
import Button from "../../components/Button.jsx";
import useAxiosPrivate from "../../components/customHooks/useAxiosPrivate";
import Avatar from "../../components/Avatar.jsx";

function ChannelSubscribers() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const channelId = useSelector((state) => state.user.profileData?._id);
  const subscribers = useSelector(
    (state) => state.subscription?.channelSubscribers
  );
  // console.log("State Subscriber :", subscribers);
  useEffect(() => {
    const fetcheSubscribers = async () => {
      const response = await axiosPrivate.get(
        `/api/v1/subscriptions/c/${channelId}`
      );
      // console.log("Subscribers: ", response);
      if (response.status === 200) {
        dispatch(getUserChannelSubscribers(response.data.data));
      }
    };
    if (channelId) {
      fetcheSubscribers();
    }
  }, [dispatch, channelId]);

  return (
    <>
      {subscribers?.map((subscriber) => (
        <Link
          key={subscriber?.subscriber?._id}
          className="flex border-b border-slate-500 px-3 py-1 justify-between items-center text-white"
        >
          <div className="flex gap-3 items-center">
            <Avatar
              src={subscriber?.subscriber?.avatar}
              channelName={subscriber?.subscriber?.username}
            />
            <div>
              <h5 className="text-sm text-black">
                {subscriber?.subscriber?.username}
              </h5>
              <span className="text-xs text-slate-400">
                {subscriber?.subscriber?.subscribersCount} Subscribers
              </span>
            </div>
          </div>
          <div>
            <Button className="bg-purple-500 text-black text-xs py-1 px-2">
              {subscriber?.subscriber?.subscribedToSubscriber
                ? "Subscribed"
                : "subscribe"}
            </Button>
          </div>
        </Link>
      ))}
    </>
  );
}

export default ChannelSubscribers;
