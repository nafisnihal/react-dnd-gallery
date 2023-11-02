import React, { useState } from "react";
import ImageCard from "./ImageCard";

const Gallery = () => {
  const GalleryData = [
    {
      id: 1,
      image: "/images/image-11.jpeg",
    },
    {
      id: 2,
      image: "/images/image-2.webp",
    },
    {
      id: 3,
      image: "/images/image-7.webp",
    },
    {
      id: 4,
      image: "/images/image-4.webp",
    },
    {
      id: 5,
      image: "/images/image-8.webp",
    },
    {
      id: 6,
      image: "/images/image-3.webp",
    },
    {
      id: 7,
      image: "/images/image-10.jpeg",
    },
    {
      id: 8,
      image: "/images/image-6.webp",
    },
    {
      id: 9,
      image: "/images/image-9.webp",
    },
    {
      id: 10,
      image: "/images/image-5.webp",
    },
    {
      id: 11,
      image: "/images/image-1.webp",
    },
  ];
  const [data, setData] = useState([...GalleryData]);
  // console.log(data);

  // for selecting and deselecting a single image
  const handleSelect = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      } else {
        return { ...item };
      }
    });
    setData([...newData]);
  };

  // for selecting and deselecting all images
  const selelctOrDeselectAll = () => {
    if (data.every((item) => item.selected === true)) {
      const newData = data.map((item) => {
        return { ...item, selected: false };
      });
      setData([...newData]);
    } else {
      const newData = data.map((item) => {
        return { ...item, selected: true };
      });
      setData([...newData]);
    }
  };

  // for counting the total selected images
  const totalSelected = data.filter((item) => item.selected === true).length;

  // for deleting the selected images
  const handleDelete = () => {
    const newData = data.filter((item) => item.selected !== true);
    setData([...newData]);
  };

  return (
    <div className="bg-white pt-3 rounded w-100 lg:w-2/3 mx-auto">
      <div className="flex flex-col md:flex-row align-middle justify-between">
        {totalSelected >= 1 ? (
          <div className="flex align-middle justify-center md:justify-start">
            <input
              type="checkbox"
              name=""
              id=""
              checked={
                data.every((item) => item.selected === true) && data.length > 0
              }
              onChange={selelctOrDeselectAll}
              className={`mt-2 md:ml-8 cursor-pointer w-4 h-4`}
            />
            <h1 className="pb-3 ps-2 text-xl font-bold ">
              {totalSelected} {totalSelected > 1 ? "Files " : "File "} Selected
            </h1>
          </div>
        ) : (
          <h1 className="pb-3 ps-8 text-xl font-bold">Gallery</h1>
        )}
        <button
          className={`text-red-600 font-semibold pb-3 pr-8 ${
            !data.some((item) => item.selected === true) && "hidden"
          }`}
          onClick={handleDelete}
        >
          Delete {totalSelected > 1 ? "Files " : "File "}
        </button>
      </div>
      <hr />
      <div className="ps-8 p-5">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {!!Boolean(data.length) ? (
            data?.map((data, index) => (
              <ImageCard
                key={index}
                data={data}
                index={index}
                handleSelect={handleSelect}
              />
            ))
          ) : (
            <>
              <h1 className="col-span-5 mt-5 mb-2 text-center text-red-600 text-2xl font-bold">
                Opps! The Galley Got Hurt &#128546;
              </h1>
              <button
                className="col-span-5 px-2 py-2 pb-3 mb-6 text-center bg-red-400 text-white w-full md:w-1/3 lg:w-1/4 mx-auto text-xl font-semibold rounded-md hover:bg-green-400 transition duration-200 ease-in-out"
                onClick={() => location.reload()}
              >
                Lets get them back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
