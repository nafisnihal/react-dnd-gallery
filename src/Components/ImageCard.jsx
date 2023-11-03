import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "./Image";

const ImageCard = (props) => {
  // console.log(props, "props");
  const sortable = useSortable({ id: props.item.id });
  const { attributes, listeners, setNodeRef, transform, transition } = sortable;

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
        onChange={() => props.handleSelect(props.item.id)}
        className={`absolute mt-2 ml-2 cursor-pointer w-4 h-4 opacity-0  ${
          !!Boolean(props.item?.selected) && "opacity-100 outline-0"
        } group-hover:opacity-100 transition duration-500 ease-in-out`}
        checked={props.item?.selected ? true : false}
      />
      <Image
        ref={setNodeRef}
        style={style}
        // index={index}
        {...attributes}
        {...listeners}
        {...props}
      />
    </div>
  );
};

export default ImageCard;
