import React, { useState } from "react";
import { GalleryData } from "../utils/GalleryData";
import SortableGallery from "./SortableGallery";

const Gallery = () => {
  const [images, setImages] = useState([...GalleryData]);
  const [isChecked, setIsChecked] = useState([]);
  // console.log(isChecked, "isChecked");

  // for selecting and deselecting ids using checkbox and update isChecked state
  const handleCheck = (id) => {
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
            <input
              type="checkbox"
              name=""
              id=""
              isChecked={isChecked.length === images.length}
              onChange={selectOrDeselectAll}
              className={`mt-2 md:ml-5 cursor-pointer w-4 h-4`}
            />
            <h1 className="pb-3 ps-2 text-xl font-bold ">
              {totalSelected} {totalSelected > 1 ? "Files " : "File "} Selected
            </h1>
          </div>
        ) : (
          <h1 className="pb-3 ps-5 text-xl font-bold">Gallery</h1>
        )}
        <button
          className={`text-red-600 font-semibold pb-3 pr-8 ${
            totalSelected < 1 && "invisible"
          }`}
          onClick={handleDelete}
        >
          Delete {totalSelected > 1 ? "Files " : "File "}
        </button>
      </div>
      <hr />
      <div className="p-5">
        <SortableGallery
          images={images}
          handleSelect={handleCheck}
          isChecked={isChecked}
        />
      </div>
    </div>
  );
};

export default Gallery;
