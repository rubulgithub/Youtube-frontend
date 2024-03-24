import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import useAxiosPrivate from "./customHooks/useAxiosPrivate";
import DeleteConfirmation from "./DeleteConfirmation.jsx";
import Edit from "./Edit.jsx";
import Like from "./Like.jsx";
import { timeAgo } from "./helpers/timeDuration.js";

function TweetsList({
  tweetId,
  avatar,
  username,
  createdAt,
  content,
  likesCount = 0,
  isLiked,
}) {
  const axiosPrivate = useAxiosPrivate();
  const avatar2 = useSelector((state) => state.user?.profileData?.avatar.url);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });

  const handleEditTweet = async (editedContent) => {
    const res = await axiosPrivate.patch(`/api/v1/tweets/${tweetId}`, {
      content: editedContent,
    });
    // console.log("edit tweet:", res);
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
    }));
  };

  const handleDeleteTweet = async () => {
    const res = await axiosPrivate.delete(`/api/v1/tweets/${tweetId}`);
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      isOpen: false,
      delete: false,
    }));
  };

  return (
    <>
      <div className="text-black w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
        <div className="w-10">
          <img
            src={avatar || avatar2}
            className="w-8 h-8 object-cover rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-center gap-2">
            <h2 className="text-xs">{username}</h2>
            <span className="text-xs text-slate-400">{timeAgo(createdAt)}</span>
          </div>

          {/* editing the tweet */}

          {editState.editing ? (
            <Edit
              initialContent={editState.editedContent}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  editing: false,
                  isOpen: false,
                }))
              }
              onSave={handleEditTweet}
            />
          ) : (
            editState.editedContent
          )}

          {/* Like the tweet */}
          <Like
            isLiked={isLiked}
            likesCount={likesCount}
            tweetId={tweetId}
            size={20}
          />

          {/* 3 dots */}
          {authUsername == username && (
            <div className="w-5 h-5 absolute right-0 cursor-pointer">
              <HiOutlineDotsVertical
                onClick={() =>
                  setEditState((prevState) => ({
                    ...prevState,
                    isOpen: !prevState.isOpen,
                  }))
                }
              />
            </div>
          )}

          {/* edit and delete dropdown */}
          {editState.isOpen && (
            <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
              <ul>
                <li
                  className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      editing: !prevState.editing,
                      isOpen: false,
                    }))
                  }
                >
                  Edit
                </li>
                <li
                  className="px-5 hover:opacity-50 cursor-pointer"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      delete: true,
                      isOpen: false,
                    }))
                  }
                >
                  Delete
                </li>
              </ul>
            </div>
          )}

          {/* deleteing the tweet */}
          {editState.delete && (
            <DeleteConfirmation
              tweet={true}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  delete: !prevState.delete,
                }))
              }
              onDelete={handleDeleteTweet}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TweetsList;
