import React from "react";

const Photo = ({ handleSelect, image, isDragging, overlay }) => {
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
        <input
          type="checkbox"
          id={`checked-${image?.id}`}
          onChange={() => {
            // console.log(image?.id, "handleSelect");
            handleSelect(image?.id);
          }}
          // className={`absolute mt-2 ml-2 cursor-pointer w-4 h-4 ${
          //   !overlay ? "group-hover:block" : ""
          // } ${
          //   !!Boolean(image?.selected) && !overlay
          //     ? "opacity-100 outline-0"
          //     : "opacity-0 outline-0"
          // }  group-hover:opacity-100 transition duration-500 ease-in-out`}
          className={`absolute w-4 h-4 top-2 left-3  ${
            !overlay ? "group-hover:block" : ""
          } cursor-pointer z-50 ${
            image?.selected && !overlay ? "block" : "hidden"
          } transition-all duration-400 ease-in-out `}
          checked={image?.selected ? true : false}
        />
        <img src={image?.image} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Photo;
