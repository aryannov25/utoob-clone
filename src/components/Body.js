import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Head from "./Head";
import { useSelector, useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f1f1f1]">
      <Head />
      <div className="relative flex">
        {/* Sidebar — on mobile: fixed overlay, on desktop: sticky side column */}
        <Sidebar />

        {/* Backdrop — only on mobile when menu is open */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => dispatch(closeMenu())}
          />
        )}

        {/* Main content — always full width on mobile, fills remaining space on desktop */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
