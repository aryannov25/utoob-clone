import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Head from "./Head";
import { useSelector, useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import ScrollToTop from "./ScrollToTop";

const Body = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen text-[#f4f4f5]">
      <ScrollToTop />
      <Head />
      <div className="relative flex">
        <Sidebar />

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => dispatch(closeMenu())}
          />
        )}

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Body;
