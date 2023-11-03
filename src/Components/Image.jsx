import React, { forwardRef } from "react";

const Image = forwardRef(
  ({ index, imageLink, faded, style, ...props }, ref) => {
    // console.log(imageLink, "imageLink");
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
        <img src={props.item.image || imageLink} alt={index} />
      </div>
    );
  }
);

export default Image;
