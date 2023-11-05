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

const SortableGallery = ({ images, handleSelect, isChecked }) => {
  const [items, setItems] = useState([...images].map((item) => item?.id));

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setItems([...images].map((item) => item?.id));
  }, [images]);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {items?.map((item, index) => {
            const [imageData] = images.filter((image) => image?.id == item);
            return (
              <div
                key={item}
                className={`relative ${index == 0 && "col-span-2 row-span-2"} ${
                  isChecked?.includes(imageData?.id) && "brightness-90"
                } group`}
              >
                <SortablePhotos item={item} index={index} image={imageData} />
                <input
                  type="checkbox"
                  name="checkbox"
                  id={`checked-${imageData?.id}`}
                  className={`absolute top-2 left-3 w-4 h-4 cursor-pointer z-50 group-hover:opacity-100 ${
                    isChecked?.includes(imageData?.id)
                      ? "opacity-100"
                      : "opacity-0"
                  } transition-all duration-400 ease-in-out`}
                  onChange={() => handleSelect(imageData?.id)}
                  checked={isChecked?.includes(imageData?.id) ? true : false}
                />
              </div>
            );
          })}
        </div>
      </SortableContext>
      <DragOverlay adjustScale={true}>
        {activeId ? (
          <PhotoCard index={items.indexOf(activeId)} image={activeId} overlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableGallery;
