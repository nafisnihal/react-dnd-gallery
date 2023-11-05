import React, { useState } from "react";
import { GalleryData } from "../utils/GalleryData";
import SortableGallery from "./SortableGallery";

const Gallery = () => {
  const [images, setImages] = useState([...GalleryData]);
  const [isChecked, setIsChecked] = useState([]);

  // for selecting and deselecting ids using checkbox and update isChecked state
  const handleSelect = (id) => {
    if (isChecked.includes(id)) {
      const newData = isChecked.filter((item) => item !== id);
      setIsChecked([...newData]);
    } else {
      setIsChecked([...isChecked, id]);
    }
  };

  // for selecting and deselecting all images
  const selectOrDeselectAll = () => {
    if (isChecked.length === images.length) {
      setIsChecked([]);
    } else {
      const newData = images.map((image) => image.id);
      setIsChecked([...newData]);
    }
  };

  // for counting the total selected images
  const totalSelected = isChecked.length;

  // delete images id isChecked
  const handleDelete = () => {
    const newData = images.filter((image) => !isChecked.includes(image.id));
    setImages([...newData]);
    setIsChecked([]);
  };

  return (
    <div className="bg-white pt-3 rounded w-100 lg:w-3/4 mx-auto">
      <div className="flex flex-col md:flex-row align-middle justify-between">
        {totalSelected >= 1 ? (
          <div className="flex align-middle justify-center md:justify-start">
            {/* checkbox for selecting all items */}
            <input
              type="checkbox"
              name=""
              id=""
              isChecked={isChecked.length === images.length}
              onChange={selectOrDeselectAll}
              className={`mt-2 md:ml-5 cursor-pointer w-5 h-5`}
            />
            <p className="mt-1 pb-3 ps-2 text-lg font-bold">
              {totalSelected} {totalSelected > 1 ? "Files " : "File "} Selected
            </p>
          </div>
        ) : (
          <h1 className="pb-4 ps-5 text-xl font-bold">Gallery</h1>
        )}
        <button
          className={`text-red-500 font-semibold pb-3 pr-8 ${
            totalSelected < 1 && "invisible"
          } hover:text-red-700 transition-all duration-300 ease-in-out`}
          onClick={handleDelete}
        >
          Delete {totalSelected > 1 ? "Files " : "File "}
        </button>
      </div>
      <hr />
      <div className="p-5">
        <SortableGallery
          images={images}
          handleSelect={handleSelect}
          isChecked={isChecked}
        />
      </div>
    </div>
  );
};

export default Gallery;
