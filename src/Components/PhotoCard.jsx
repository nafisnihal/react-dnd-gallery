import React, { forwardRef } from "react";
import Photo from "./Photo";
const PhotoCard = forwardRef(
  ({ image, index, isDragging, faded, style, ...props }, ref) => {
    const moreStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      backgroundSize: "cover",
      backgroundPosition: "center",
      ...style,
    };
    return (
      <div
        className={`rounded-lg overflow-hidden bg-white group-hover:opacity-100 group-hover:brightness-50 group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out`}
        ref={ref}
        style={moreStyles}
        {...props}
      >
        <Photo image={image} isDragging={isDragging} />
      </div>
    );
  }
);
export default PhotoCard;
