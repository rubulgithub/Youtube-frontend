import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import InputVideo from "./InputVideo";
import useAxiosPrivate from "./customHooks/useAxiosPrivate";
import { videoUploaded, videoUploading } from "../store/slices/videoSlice";
import UploadingVideo from "./UploadingVideo";

function UploadVideo({ setUploadVideoPopup }) {
  const [videoName, setVideoName] = useState("");
  const [videoSize, setVideoSize] = useState(0);
  const axiosPrivate = useAxiosPrivate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.video.uploading);
  const uploaded = useSelector((state) => state.video.uploaded);
  const uploadV = useSelector((state) => state.video.video);
  const uploadafter = useSelector((state) => state.video);
  // console.log("Upload video: ", uploadafter);

  // console.log("Uploading: ", uploading);
  // console.log("Uploaded: ", uploaded);

  const publishVideo = async (data) => {
    setVideoSize(Math.floor(data.videoFile[0].size / (1024 * 1024)));
    const formData = new FormData();
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    dispatch(videoUploading());
    try {
      // console.log(formData);
      const res = await axiosPrivate.post("/api/v1/video", formData);
      // console.log("Upload Video: ", res);
      if (res.status === 200) {
        dispatch(videoUploaded(res.data.data));
      }
      // console.log("Res: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  if (uploading) {
    return (
      <>
        <UploadingVideo
          setUploadVideoPopup={setUploadVideoPopup}
          videoFileName={videoName}
          fileSize={videoSize}
        />
      </>
    );
  }

  if (uploaded) {
    return (
      <>
        <UploadingVideo
          setUploadVideoPopup={setUploadVideoPopup}
          videoFileName={videoName}
          fileSize={videoSize}
          uploaded={true}
        />
      </>
    );
  }

  return (
    <>
      <div className="fixed top-5 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-30">
        <div className="relative w-[95vw] sm:w-3/4 h-[80vh] sm:h-[80vh] mx-auto text-white border overflow-y-scroll bg-black">
          <form onSubmit={handleSubmit(publishVideo)} className="space-y-5">
            <section className="h-12 sticky top-0 z-50 border-b w-full bg-[#222222] flex justify-between items-center px-3">
              <div className="flex gap-1 items-center cursor-pointer">
                <IoCloseCircleOutline
                  size={23}
                  onClick={() => setUploadVideoPopup((prev) => !prev)}
                />
                <h3 className="font-semibold">Upload Videos</h3>
              </div>
              <div>
                <Button
                  className="bg-purple-500 py-1 px-2 font-bold"
                  textColor="text-black"
                  type="button"
                >
                  Save
                </Button>
              </div>
            </section>

            <section className="px-3">
              <div className="w-full border border-dotted h-44 p-1 flex flex-col gap-3 justify-center items-center text-center">
                <div>
                  <h1 className="font-medium text-sm">
                    Drag and drop video files to upload{" "}
                  </h1>
                  <p className="font-light text-xs">
                    Your videos will be private untill you publish them.
                  </p>
                </div>
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer bg-purple-500 text-black font-bold text-sm py-2 px-4"
                >
                  Select Files
                </label>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  {...register("videoFile", {
                    required: "VideoFile is required",
                    onChange: (e) => setVideoName(e.target.files[0]?.name),
                  })}
                />
                <input
                  className="sm:w-3/4 w-full text-center h-10 bg-transparent text-white outline-none"
                  value={videoName}
                  readOnly
                ></input>
                <span className="text-red-500 text-xs">
                  {errors.videoFile?.message}
                </span>
              </div>
              <div className="space-y-5 mt-2">
                <InputVideo
                  type="file"
                  label="Thumbnail *"
                  accept="image/png, image/jpeg"
                  {...register("thumbnail", {
                    required: "Thumbnail is required",
                  })}
                />
                <span className="text-red-500 text-xs">
                  {errors.thumbnail?.message}
                </span>
                <InputVideo
                  type="text"
                  label="Title *"
                  className="mb-2"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <span className="text-red-500 text-xs">
                  {errors.title?.message}
                </span>
                <div>
                  <label>Description *</label>
                  <textarea
                    rows="5"
                    className="focus:bg-[#222222] bg-transparent outline-none border w-full mt-1 p-1"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  ></textarea>
                  <span className="text-red-500 text-xs">
                    {errors.description?.message}
                  </span>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
}

export default UploadVideo;
