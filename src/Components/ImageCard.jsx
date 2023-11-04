import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "./Image";

const ImageCard = (props) => {
  console.log(props, "props");
  const sortable = useSortable({ id: props.item });
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className={`${props.index === 0 && "col-span-2 row-span-2"} ${
        props.item?.selected === true &&
        "contrast-75  transition duration-500 ease-in-out"
      } bg-white border-2 rounded-md cursor-grab group hover:contrast-50 transition duration-500 ease-in-out`}
    >
      <input
        type="checkbox"
        onChange={() => props.handleSelect(props.imageData.id)}
        className={`absolute mt-2 ml-2 cursor-pointer w-4 h-4 opacity-0  ${
          !!Boolean(props.imageData?.selected) && "opacity-100 outline-0"
        } group-hover:opacity-100 transition duration-500 ease-in-out`}
        checked={props.imageData?.selected ? true : false}
      />
      <Image
        ref={setNodeRef}
        imageData={props.imageData}
        isDragging={isDragging}
        style={style}
        {...attributes}
        {...listeners}
        {...props}
      />
    </div>
  );
};

export default ImageCard;
