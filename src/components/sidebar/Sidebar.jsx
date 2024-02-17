import React from "react";
import { BiLike } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { BiHistory } from "react-icons/bi";
import { TbUserCheck } from "react-icons/tb";
import { IoFolderOutline } from "react-icons/io5";
import { RiHome6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar bg-white w-1/7 h-screen fixed top-0 pt-20 ml-4">
      <div className="items flex gap-1 flex-col">
        <Link to="/">
          <div className="flex home gap-5 text-lg hover:bg-slate-300 pl-3 rounded-md p-2 hover:cursor-pointer items-center">
            <RiHome6Line className="text-3xl" />
            <h3>Home</h3>
          </div>
        </Link>
        <div className="history flex gap-5 text-lg hover:bg-slate-300 pl-3 rounded-md p-2 hover:cursor-pointer items-center">
          <BiHistory className="text-3xl" />
          <h3>History</h3>
        </div>
        <Link to="/profile">
          <div className="your-channel flex gap-5 text-lg hover:bg-slate-300 pl-3 rounded-md p-2 hover:cursor-pointer items-center">
            <TbUserCheck className="text-3xl" />
            <h3>Your Channel</h3>
          </div>
        </Link>
        <div className="your-video flex gap-5 text-lg hover:bg-slate-300 pl-3 rounded-md p-2 hover:cursor-pointer items-center">
          <IoFolderOutline className="text-3xl" />
          <h3>Your Videos</h3>
        </div>
        <div className="liked videos flex gap-5 text-lg hover:bg-slate-300 pl-3 rounded-md p-2 hover:cursor-pointer items-center">
          <BiLike className="text-3xl" />
          <h3>Liked Videos</h3>
        </div>
        <div className="subscriptions flex gap-5 text-lg hover:bg-slate-300 pl-3 rounded-md p-2 hover:cursor-pointer items-center">
          <MdOutlineSubscriptions className="text-3xl" />
          <h3>Subscriptions</h3>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
