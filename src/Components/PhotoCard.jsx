import React, { forwardRef } from "react";
import Photo from "./Photo";
const PhotoCard = forwardRef(
  (
    { image, index, handleSelect, overlay, isDragging, faded, style, ...props },
    ref
  ) => {
    // console.log(index, "indexbedfh");
    const moreStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#ffffff",
      ...style,
    };
    return (
      <div
        className={`rounded-lg overflow-hidden`}
        ref={ref}
        style={moreStyles}
        {...props}
      >
        <Photo
          image={image}
          index={index}
          handleSelect={handleSelect}
          overlay={overlay}
          isDragging={isDragging}
        />
      </div>
    );
  }
);
export default PhotoCard;
