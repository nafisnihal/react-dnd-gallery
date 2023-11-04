import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import ImageCard from "./ImageCard";
import Image from "./Image";

const SortableGallery = ({ images, handleSelect }) => {
  console.log(images, "images");
  const [items, setItems] = useState(
    [...images].map((item) => item?.id?.toString())
  );
  console.log(items, "items");

  useEffect(() => {
    setItems([...images].map((item) => item?.id?.toString()));
  }, [images]);
  // console.log(items);
  const [activeId, setActiveId] = useState(null);
  console.log(activeId, "activeId");
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    // console.log(event.active, "eventend");
    const { active, over } = event;
    // console.log(active, over, "active, over");

    if (active.id !== over.id) {
      //added extra id(s) !!!!!!!!!!!
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        // console.log(oldIndex, "oldIndex");
        const newIndex = items.indexOf(over.id);
        // console.log(newIndex, "newIndex");
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {items?.map((item, index) => {
            const [imageData] = images.filter((image) => image.id == item);
            return (
              <ImageCard
                key={item}
                item={item}
                index={index}
                imageData={imageData}
                handleSelect={handleSelect}
              />
            );
          })}
        </div>
      </SortableContext>
      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Image index={items.indexOf(activeId)} image={activeId} overlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableGallery;
