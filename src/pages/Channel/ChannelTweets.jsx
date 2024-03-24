import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../components/customHooks/useAxiosPrivate";
import TweetsList from "../../components/TweetsList";
import TweetAndComment from "../../components/TweetAndComment.jsx";
import { getUserTweets } from "../../store/Slices/tweetSlice.js";

function ChannelTweets() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const authId = useSelector((state) => state.auth?.userData?.user?._id);
  const userId = useSelector((state) => state.user?.profileData?._id);
  const tweets = useSelector((state) => state.tweet?.tweets);
  // console.log("state tweets", tweets);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await axiosPrivate.get(`/api/v1/tweets/user/${userId}`);
      // console.log("get tweets", response);
      if (response.status === 200) {
        dispatch(getUserTweets(response.data.data));
      }
    };
    if (userId) {
      fetchTweets();
    }
  }, [dispatch, userId]);

  return (
    <>
      {authId === userId && <TweetAndComment tweet={true} />}
      {tweets?.map((tweet) => (
        <TweetsList
          key={tweet?._id}
          avatar={tweet?.ownerDetails?.avatar}
          content={tweet?.content}
          createdAt={tweet?.createdAt}
          likesCount={tweet?.likesCount}
          tweetId={tweet?._id}
          username={tweet?.ownerDetails?.username}
          isLiked={tweet?.isLiked}
        />
      ))}
    </>
  );
}

export default ChannelTweets;
