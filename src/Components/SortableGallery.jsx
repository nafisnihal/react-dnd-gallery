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
import SortablePhotos from "./SortablePhotos";
import PhotoCard from "./PhotoCard";

const SortableGallery = ({ images, handleSelect }) => {
  //   console.log(images, "images");
  const [items, setItems] = useState([...images].map((item) => item?.id));
  //   console.log(items, "items");

  useEffect(() => {
    setItems([...images].map((item) => item?.id));
  }, [images]);
  // console.log(items);
  const [activeId, setActiveId] = useState(null);
  //   console.log(activeId, "activeId");
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event) {
    const [active] = images.filter((item) => item.id === event.active.id);
    setActiveId(active);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);

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
            const [imageData] = images.filter((image) => image?.id == item);
            return (
              <SortablePhotos
                key={item}
                item={item}
                index={index}
                image={imageData}
                handleSelect={handleSelect}
              />
            );
          })}
        </div>
      </SortableContext>
      <DragOverlay adjustScale={true}>
        {activeId ? (
          <PhotoCard
            index={items.indexOf(activeId)}
            image={activeId}
            handleSelect={handleSelect}
            overlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableGallery;
