import React from "react";
import Button from "./Button.jsx";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "./customHooks/useAxiosPrivate.js";
import { createAComment } from "../store/slices/commentSlice.js";

function Comment({ comment, videoId }) {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const submitComment = async (data) => {
    if (comment) {
      const res = await axiosPrivate.post(`/api/v1/comments/${videoId}`, {
        content: data.content,
      });
      // console.log("COmment res", res);
      if (res.status === 201) {
        // console.log("Inside");
        dispatch(createAComment(res.data.data));
        setValue("content", "");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitComment)}
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
          Comment
        </Button>
      </form>
    </>
  );
}

export default Comment;
