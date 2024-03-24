import React from "react";
import Button from "./Button.jsx";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "./customHooks/useAxiosPrivate.js";
import { createTweet } from "../store/Slices/tweetSlice.js";

function TweetAndComment({ tweet, comment, videoId }) {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const comments = useSelector((state) => state.comment?.comments);
  // console.log("Comments from TAC:", comments);

  const sendContent = async (data) => {
    if (data) {
      if (tweet) {
        const res = await axiosPrivate.post("/api/v1/tweets", {
          content: data.content,
        });
        // console.log("Tweet Res:", res);
        if (res.status === 200) {
          dispatch(createTweet(res.data.data));
        }
      } else if (comment) {
        const res = await axiosPrivate.post(`/api/v1/comments/${videoId}`, {
          content: data.content,
        });
        // console.log("Comment res", res);
        if (res.status === 200) {
          dispatch(createAComment(res.data.data));
          setValue("content", "");
        }
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(sendContent)}
        className="sm:p-5 p-3 sm:max-w-4xl w-full relative"
      >
        <textarea
          placeholder={"Add a Comment"}
          className="p-2 text-sm pr-16 focus:border-white text-white border border-slate-500 bg-[#222222] outline-none w-full"
          {...register("content", { required: true })}
          rows={2}
        />
        <Button
          type="submit"
          className="bg-purple-500 px-2 py-1 text-black hover:scale-110 transition-all ease-in absolute sm:bottom-8 sm:right-8 bottom-8 right-4 text-xs sm:text-base"
        >
          Send
        </Button>
      </form>
    </>
  );
}

export default TweetAndComment;
