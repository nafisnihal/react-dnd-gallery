import React from "react";

const Photo = ({ image, isDragging, overlay }) => {
  return (
    <div className=" border rounded-lg overflow-hidden shadow relative group w-full h-full">
      <div
        className={`absolute h-full w-full bg-black/30 flex items-center transition-all duration-400 ease-in-out justify-center   ${
          isDragging || overlay ? "" : "group-hover:opacity-100"
        }  ${
          isDragging && image?.selected
            ? "opacity-0"
            : image?.selected
            ? "opacity-40"
            : "opacity-0"
        }`}
      ></div>
      <div
        className={`w-full h-full border-lg ${
          isDragging ? "invisible" : "visible"
        }`}
      >
        <img src={image?.image} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Photo;
