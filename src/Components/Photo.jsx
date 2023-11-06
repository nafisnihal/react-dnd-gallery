import React from "react";

const Photo = ({ image, isDragging }) => {
  return (
    <div
      className={`border rounded-lg overflow-hidden shadow relative group w-full h-full cursor-grab`}
    >
      <div className={`w-full h-full ${isDragging ? "invisible" : "visible"}`}>
        <img src={image?.image} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Photo;
