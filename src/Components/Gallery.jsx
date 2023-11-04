import React, { useState } from "react";
import { GalleryData } from "../utils/GalleryData";
import SortableGallery from "./SortableGallery";

const Gallery = () => {
  const [images, setImages] = useState([...GalleryData]);
  console.log(images, "images");

  // for selecting and deselecting a single image
  const handleSelect = (id) => {
    const newData = images.map((image) => {
      if (image.id === id) {
        return { ...image, selected: !image.selected };
      } else {
        return { ...image };
      }
    });
    setImages([...newData]);
  };
  // for selecting and deselecting all images
  const selectOrDeselectAll = () => {
    if (images.every((image) => image.selected === true)) {
      const newData = images.map((image) => {
        return { ...image, selected: false };
      });
      setImages([...newData]);
    } else {
      const newData = images.map((image) => {
        return { ...image, selected: true };
      });
      setImages([...newData]);
    }
  };
  // for counting the total selected images
  const totalSelected = images.filter(
    (image) => image.selected === true
  ).length;
  // for deleting the selected images
  const handleDelete = () => {
    const newData = images.filter((image) => image.selected !== true);
    setImages([...newData]);
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
                images.every((item) => item.selected === true) &&
                images.length > 0
              }
              onChange={selectOrDeselectAll}
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
            !images.some((item) => item.selected === true) && "hidden"
          }`}
          onClick={handleDelete}
        >
          Delete {totalSelected > 1 ? "Files " : "File "}
        </button>
      </div>
      <hr />
      <div className="ps-8 p-5">
        <SortableGallery images={images} handleSelect={handleSelect} />
      </div>
    </div>
  );
};

export default Gallery;
