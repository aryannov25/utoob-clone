import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Head from "./Head";

const Body = () => {
  return (
    <>
      <div className="dark:bg-zinc-900 dark:text-white">
        <Head />
        <div className="grid grid-flow-col ">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Body;
