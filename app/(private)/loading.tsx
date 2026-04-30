"use client";

import React from "react";

type LoaderProps = {
  message?: string;
};

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="text-center">
        {/* Black Spinner */}
        <div className=" w-12 h-12 border-4 border-black/20 dark:border-white/30 border-t-black dark:border-t-white rounded-full animate-spin mx-auto "></div>
        <p className="mt-4 dark:bg-content2">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
