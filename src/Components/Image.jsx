import React, { forwardRef } from "react";

const Image = forwardRef(
  (
    { image, index, imageData, overlay, isDragging, faded, style, ...props },
    ref
  ) => {
    console.log(imageData, "imageData");
    const moreStyles = {
      opacity: faded ? 0.2 : 1,
      ...style,
    };
    return (
      <div
        className="rounded group-hover:opacity-100 transition duration-500 ease-in-out"
        ref={ref}
        style={moreStyles}
        {...props}
      >
        <img src={imageData?.image} alt={index} />
      </div>
    );
  }
);

export default Image;
