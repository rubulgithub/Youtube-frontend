import { useState, useEffect } from "react";
import useAxiosPrivate from "../customHooks/useAxiosPrivate.js";

const MyProfile = () => {
  const [users, setUsers] = useState([]);
  // const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosPrivate.get("/api/v1/users/current-user", {
          withCredentials: true,
        });
        if (res?.status === 200) {
          console.log(res.data.data);
          setUsers(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <div className="flex gap-4 items-start ml-5">
      <div className="image ">
        <img
          src={users.avatar}
          alt=""
          className="rounded-full w-40 h-40 object-cover"
        />
      </div>
      <div className="info flex flex-col gap-2">
        <div className="text-6xl font-normal space-x-0">{users.fullName}</div>
        <div className="top-info flex gap-2">
          <div className="username font-medium text-neutral-600">
            {"@" + users.username}
          </div>
          <div className="subscribers font-medium text-neutral-600">
            10 Subscribers
          </div>
          <div className="videos font-medium text-neutral-600">5 Videos</div>
        </div>
        <div className="">More about this channel </div>
      </div>
    </div>
  );
};

export default MyProfile;
