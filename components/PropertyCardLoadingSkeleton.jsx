import React from "react";

const PropertyCardLoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-slate-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-72 h-[21rem] flex flex-col justify-between">
      <div className="relative h-48">
        <div className="h-48 bg-gray-200/40"></div>
        <div className="absolute top-0 left-0 right-0 p-3">
          <div className="flex gap-2">
            <span className="px-2 py-1 text-xs bg-slate-200/90  rounded-full w-[60px] h-[24px]"></span>
            <span className="px-2 py-1 text-xs bg-slate-200/90 rounded-full w-[60px] h-[24px]"></span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center px-2">
          <div className="rounded-md bg-gray-200/50 px-7 py-3"></div>
          <div className="rounded-md bg-gray-200/50 px-7 py-3"></div>
          <div className="rounded-md bg-gray-200/50 px-7 py-3"></div>
        </div>
        <div className="w-full bg-gray-200/50 py-4 rounded-lg "></div>
      </div>
    </div>
  );
};

export default PropertyCardLoadingSkeleton;
