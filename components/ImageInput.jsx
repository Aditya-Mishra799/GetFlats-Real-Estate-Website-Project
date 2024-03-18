'use-client'
import React, { useEffect, useReducer, useRef, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import SelectedImageDisplay from "./SelectedImageDisplay";

const initialMedia = {
  thumbnail: null,
  images: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-IMAGES":{
      const images = state.thumbnail === null ? action.payload.slice(1) : action.payload;
      const thumbnail = state.thumbnail == null ? action.payload[0]: state.thumbnail
      const updatedState = {
        thumbnail : thumbnail,
        images: [...state.images, ...images],
      }
      return updatedState;
    }
    case "REMOVE-IMAGE":
      return{
        ...state,
        images: state.images.filter((image, index) => index !== action.payload),
      };
    case "RESET":
      return initialMedia;
    case "SET-THUMBNAIL":
      return( {
        thumbnail: state.images[action.payload],
        images: [
          ...state.images.splice(0, action.payload),
          ...state.images.splice(action.payload + 1),
        ],
      });
      case'REMOVE-THUMBNAIL':
        return {
          ...state,
          thumbnail: null,
        }
    default:
      return state;
  }
    
};
const ImageInput = ({ label,onChange, name , errors,getValues,  ...rest }) => {
  const value = getValues(name)
  const [media, dispatchMedia] = useReducer(reducer, value);
  const imageInputRef = useRef(null);
  const handleImageChange =  (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    dispatchMedia({ type: "ADD-IMAGES", payload: filesArray });
  };
  useEffect(() => {
    onChange(media)
  }, [media]);
  return (
    <div className="w-full space-y-2">
      <div 
      onClick={() => {
        if(imageInputRef.current){
            imageInputRef.current.click();
        }
      }}
      className="border mx-auto p-3 rounded-xl cursor-pointer w-72 h-52 flex justify-center items-center"
      >
        <div className="w-full h-full flex justify-center items-center  border-dashed border-faded-orange rounded-xl border-spacing-6 border-2">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            ref = {imageInputRef}
          />
          <div className="flex flex-col justify-center items-center">
            <RiImageAddFill className="text-5xl text-active-orange outline-none" />
            <h3 className="text-smooth-orange text-sm font-semibold">
              Drop your image here, or{" "}
              <span className="text-dark-orange font-bold">browse</span>
            </h3>

            <p className="text-xs text-faded-orange font-medium">
              Maximum file size: 10MB
            </p>
            <p className="text-xs text-faded-orange font-medium">
              Allowed file types: JPG, PNG, GIF
            </p>
          </div>
        </div>
      </div>
      <SelectedImageDisplay 
      thumbnail = {media?.thumbnail} 
      images = {media?.images}
      dispatchMedia = {dispatchMedia}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs italic">{errors[name]?.images.message}</p>
      )}
    </div>
  );
};

export default ImageInput;
