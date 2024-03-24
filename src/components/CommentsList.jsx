import React, { useState } from "react";
import { timeAgo } from "./helpers/timeDuration.js";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import Like from "./Like.jsx";
import DeleteConfirmation from "./DeleteConfirmation.jsx";
import Edit from "./Edit.jsx";
import useAxiosPrivate from "./customHooks/useAxiosPrivate.js";

function CommentsList({
  avatar,
  username,
  createdAt,
  content,
  commentId,
  isLiked,
  likesCount,
}) {
  const avatar2 = useSelector((state) => state.auth?.userData?.avatar);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const axiosPrivate = useAxiosPrivate();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });

  const handleEditComment = async (editedContent) => {
    // console.log(editedContent);
    try {
      const res = await axiosPrivate.patch(
        `/api/v1/comments/c/${commentId}`,
        editedContent
      );
      // console.log(res);
      setEditState((prevState) => ({
        ...prevState,
        editing: false,
        editedContent,
        isOpen: false,
        delete: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    try {
      const deleteRes = await axiosPrivate.delete(
        `/api/v1/comments/c/${commentId}`
      );
      // console.log(deleteRes);
      setEditState((prevState) => ({
        ...prevState,
        delete: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-black w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
        <div className="w-12">
          <img src={avatar} className="w-10 h-10 object-cover rounded-full" />
        </div>
        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-center gap-2">
            <h2 className="text-xs">{username}</h2>
            <span className="text-xs text-slate-400">{timeAgo(createdAt)}</span>
          </div>

          {/*dropdown for edit and delete comment */}
          {authUsername === username && (
            <div className="absolute right-0">
              <div className="relative">
                <HiOutlineDotsVertical
                  className="text-white cursor-pointer"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      isOpen: !prevState.isOpen,
                    }))
                  }
                />

                {editState.isOpen && (
                  <div className="border bg-[#222222] text-lg text-black border-slate-600 absolute text-center right-2 rounded-xl">
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
              </div>
            </div>
          )}

          {/* Delete Confirm popup */}
          {editState.delete && (
            <DeleteConfirmation
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  delete: false,
                  isOpen: false,
                }))
              }
              onDelete={handleDeleteComment}
              comment={true}
            />
          )}

          {/* edit comment */}
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
              onSave={handleEditComment}
            />
          ) : (
            editState.editedContent
          )}

          {/* Like for comments */}
          <Like
            isLiked={isLiked}
            likesCount={likesCount}
            commentId={commentId}
            size={17}
          />
        </div>
      </div>
    </>
  );
}

export default CommentsList;
