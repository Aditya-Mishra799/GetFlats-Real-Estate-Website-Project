import Image from "next/image";
import React from "react";
import { IoTrashBinSharp } from "react-icons/io5";

const SelectedImageDisplay = ({
  thumbnail,
  images = [],
  dispatchMedia,
}) => {
  if (images.length === 0 && thumbnail === null) return <></>;

  return (
    <div className="flex flex-col rounded-xl shadow-lg  px-3 py-2 bg-slate-100">
      <label className="font-bold text-xl text-center">Selected Images</label>
      <div>
      {thumbnail && (
        <div className="flex flex-col">
          <label className="font-bold text-lg">Thumbnail</label>
          <div className="flex gap-1 h-max w-full items-center border bg-highlight-orange border-highlight-orange my-1.5 rounded-md shadow-sm justify-between hover:border-2 transition-all">
            <Image
              src={URL.createObjectURL(thumbnail)}
              width={70}
              height={80}
              alt={"thumbnail"}
              className="px-1.5 py-1"
            />
            <span>{thumbnail?.name}</span>
            <button
              onClick={() =>{
                dispatchMedia({type : 'REMOVE-THUMBNAIL'})
            }}
              title="Remove"
              className=" px-1.5 py-1 justify-self-end self-stretch w-16 rounded-r-md text-active-orange flex items-center justify-center text-4xl"
            >
              <IoTrashBinSharp />
            </button>
          </div>
        </div>
      )}
      {images.length > 0 && (
        <div>
          <label className="font-bold text-lg">Images</label>
          {images.map((image, index) => (
            <div
              className="flex gap-1 h-max w-full items-center border bg-highlight-orange border-highlight-orange my-1.5 rounded-md shadow-sm justify-between hover:border-2 transition-all"
              key={image.name}
            >
              <Image
                src={URL.createObjectURL(image)}
                width={70}
                height={80}
                alt={"thumbnail"}
                className="px-1.5 py-1"
              />
              <span>{image?.name}</span>
              <button
                onClick={() =>{ 
                    dispatchMedia({ type: "REMOVE-IMAGE", payload : index })
                }
            }
                title="Remove"
                className=" px-1.5 py-1 justify-self-end self-stretch w-16 rounded-r-md text-active-orange flex items-center justify-center text-4xl"
              >
                <IoTrashBinSharp />
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default SelectedImageDisplay;
