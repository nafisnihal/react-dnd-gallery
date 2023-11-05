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
import UploadImage from "./UploadImage";

const SortableGallery = ({ images, handleSelect, isChecked }) => {
  // seperating ids from images array to use in SortableContext items
  const [items, setItems] = useState([...images].map((item) => item?.id));

  // for showing overlay on active drag
  const [activeId, setActiveId] = useState(null);

  // updating items state when images state changes
  useEffect(() => {
    setItems([...images].map((item) => item?.id));
  }, [images]);

  // for using mouse and touch sensors
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // for handling drag start -- got from dnd-kit docs
  function handleDragStart(event) {
    // getting active id from event object of dnd-kit and finding the active image from images array
    const [active] = images.filter((item) => item.id === event.active.id);
    setActiveId(active);
  }

  // for handling drag end -- got from dnd-kit docs
  function handleDragEnd(event) {
    // getting active and over ids from event object of dnd-kit
    const { active, over } = event;

    if (active?.id !== over?.id) {
      setItems((items) => {
        // getting old and new index of dragged item
        const oldIndex = items.indexOf(active?.id);
        const newIndex = items.indexOf(over?.id);

        // updating items state with new sorted array of ids using arrayMove from dnd-kit
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    // removing active id from state after drag ends to remove overlay
    setActiveId(null);
  }

  // for handling drag cancel -- got from dnd-kit docs
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
      {/* ^|^ dnd context from dnd-kit to handle drag and drop */}

      {/* sortable context from dnd-kit to sort items and rectSortingStrategy strategy is applying */}
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {items?.map((item, index) => {
            // finding the image from images array using id from items array
            const [imageData] = images.filter((image) => image?.id == item);
            return (
              <div
                key={item}
                className={`relative ${index == 0 && "col-span-2 row-span-2"} ${
                  isChecked?.includes(imageData?.id) &&
                  "opacity-50 brightness-95 transition-all duration-300 ease-in-out"
                } group`}
              >
                {/* main images layout started getting ready from here */}
                <SortablePhotos item={item} index={index} image={imageData} />
                {/* checkbox for selecting images */}
                <input
                  type="checkbox"
                  name="checkbox"
                  id={`checked-${imageData?.id}`}
                  // using ternary operator to check if image is selected or not and show checkbox accordingly and hover effect
                  className={`absolute top-4 left-4 w-5 h-5 cursor-pointer z-50 group-hover:opacity-100 ${
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
          {/* upload image grid item */}
          <UploadImage />
        </div>
      </SortableContext>
      {/* overlay for active drag */}
      <DragOverlay adjustScale={true}>
        {activeId ? (
          <PhotoCard
            index={items.indexOf(activeId)}
            image={activeId}
            overlay="true"
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableGallery;
