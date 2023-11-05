import React, { forwardRef } from "react";
import Photo from "./Photo";
const PhotoCard = forwardRef(
  ({ image, index, overlay, isDragging, faded, style, ...props }, ref) => {
    console.log(props.handleMark, "handleSelectcard");
    // console.log(index, "indexbedfh");
    const moreStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#ffffff",
      ...style,
    };
    return (
      <div
        className={`rounded-lg overflow-hidden group-hover:opacity-100`}
        ref={ref}
        style={moreStyles}
        {...props}
      >
        <Photo
          image={image}
          index={index}
          handleMark={props.handleMark}
          overlay={overlay}
          isDragging={isDragging}
        />
      </div>
    );
  }
);
export default PhotoCard;
