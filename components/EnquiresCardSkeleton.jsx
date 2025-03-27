import React from "react";

const EnquiresCardSkeleton = () => {
  return (
    <div className="bg-gray-100 animate-pulse rounded-xl shadow-md w-full sm:w-[350px] md:w-[380px] h-[220px] flex flex-col justify-between">
      <div className="bg-gradient-to-r from-gray-200/10 to-gray-200/40 p-4 flex flex-col sm:flex-row sm:items-center gap-4 ">
        <div className="flex items-center gap-3 w-full flex-shrink-0">
          <div className="rounded-full  bg-gray-200/90 px-6 py-6"></div>
          <div className="w-full">
            <div className="rounded-md py-4  px-16 mb-1"></div>
            <div className="rounded-md py-2 px-16"></div>
          </div>
          <span className={`px-10 py-4 rounded-full text-sm self-start sm:self-center bg-gray-200/90`}>
        </span>
        </div>
      </div>
      <div className="flex gap-3 pt-2 pb-3 w-full justify-center px-4">
            <div className="rounded-lg py-5 w-full bg-gray-200 px-5"></div>
            <div className="rounded-lg py-5 w-full bg-gray-200 px-5"></div>
        </div>
    </div>
  );
};

export default EnquiresCardSkeleton;
