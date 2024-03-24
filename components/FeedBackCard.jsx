import Image from "next/image";
import React from "react";

const FeedBackCard = ({ feedback }) => {
  return (
    <div className="flex  flex-col gap-2 w-full bg-slate-50 px-2 py-4 rounded-md shadow-md ">
      <div className="flex gap-2 justify-start items-center">
        <Image
          width={60}
          height={60}
          src={feedback?.user?.image}
          className="rounded-full p-1 border-2 border-dashed border-active-orange"
        />
        <div className="flex flex-col">
          <h2 className="text-xs font-bold tracking-wider text-right truncate ... ">
            {feedback?.user?.username}
          </h2>
          <h3 className="text-xs  tracking-wider text-right truncate ... ">
            {feedback?.user?.email}
          </h3>
        </div>
      </div>
      <div className="flex flex-col  flex-grow px-6">
        <p className="line-clamp-2 text-pretty text-md tracking-wider hover:line-clamp-none focus:line-clamp-none">
          {feedback.feedback}
        </p>
      </div>
    </div>
  );
};

export default FeedBackCard;
