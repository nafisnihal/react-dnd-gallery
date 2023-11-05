import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PhotoCard from "./PhotoCard";

const SortablePhotos = (props) => {
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
