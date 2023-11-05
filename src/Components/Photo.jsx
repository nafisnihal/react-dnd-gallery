import React from "react";

const Photo = ({ image, isDragging }) => {
  return (
    <div
      className={`border-2 rounded-lg overflow-hidden shadow relative group w-full h-full`}
    >
      <div
        className={`w-full h-full border-lg ${
          isDragging ? "invisible" : "visible"
        }`}
      >
        <img src={image?.image} alt="image" className="w-full" />
      </div>
    </div>
  );
};

export default Photo;
