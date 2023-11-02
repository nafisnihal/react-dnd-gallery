import React from "react";

const ImageCard = ({ index, data, handleSelect }) => {
  // console.log(data);
  return (
    <div
      className={`${index === 0 && "col-span-2 row-span-2"} ${
        data?.selected === true &&
        "brightness-90  transition duration-500 ease-in-out"
      } bg-white border-2 rounded-md cursor-pointer group hover:contrast-50 transition duration-500 ease-in-out`}
    >
      <input
        type="checkbox"
        name=""
        id=""
        onChange={() => handleSelect(data.id)}
        className={`absolute mt-2 ml-2 cursor-pointer w-4 h-4 opacity-0  ${
          !!Boolean(data?.selected) && "opacity-100 outline-0"
        } group-hover:opacity-100 transition duration-500 ease-in-out`}
        checked={data?.selected ? true : false}
      />
      <img
        src={data?.image}
        alt="random"
        className="rounded group-hover:opacity-100 transition duration-500 ease-in-out"
      />
    </div>
  );
};

export default ImageCard;
