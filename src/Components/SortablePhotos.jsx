import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PhotoCard from "./PhotoCard";

const SortablePhotos = (props) => {
  // useSortable hook from dnd-kit
  const sortable = useSortable({ id: props.item });
  // destructuring required things from sortable
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = sortable;

  // style for photo card suggested by dnd-kit docs
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <PhotoCard
      ref={setNodeRef}
      isDragging={isDragging}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
    />
  );
};

export default SortablePhotos;
