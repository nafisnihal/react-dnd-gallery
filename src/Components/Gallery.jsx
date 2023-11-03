import React, { useState } from "react";
import ImageCard from "./ImageCard";
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
import Image from "./Image";

const Gallery = () => {
  const GalleryData = [
    {
      id: 1,
      image: "/images/image-11.jpeg",
    },
    {
      id: 2,
      image: "/images/image-2.webp",
    },
    {
      id: 3,
      image: "/images/image-7.webp",
    },
    {
      id: 4,
      image: "/images/image-4.webp",
    },
    {
      id: 5,
      image: "/images/image-8.webp",
    },
    {
      id: 6,
      image: "/images/image-3.webp",
    },
    {
      id: 7,
      image: "/images/image-10.jpeg",
    },
    {
      id: 8,
      image: "/images/image-6.webp",
    },
    {
      id: 9,
      image: "/images/image-9.webp",
    },
    {
      id: 10,
      image: "/images/image-5.webp",
    },
    {
      id: 11,
      image: "/images/image-1.webp",
    },
  ];

  const [items, setItems] = useState([...GalleryData]);
  console.log(items);
  const [activeId, setActiveId] = useState(null);
  console.log(activeId, "activeId");
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // for selecting and deselecting a single image
  const handleSelect = (id) => {
    const newData = items.map((item) => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      } else {
        return { ...item };
      }
    });
    setItems([...newData]);
  };

  // for selecting and deselecting all images
  const selectOrDeselectAll = () => {
    if (items.every((item) => item.selected === true)) {
      const newData = items.map((item) => {
        return { ...item, selected: false };
      });
      setItems([...newData]);
    } else {
      const newData = items.map((item) => {
        return { ...item, selected: true };
      });
      setItems([...newData]);
    }
  };

  // for counting the total selected images
  const totalSelected = items.filter((item) => item.selected === true).length;

  // for deleting the selected images
  const handleDelete = () => {
    const newData = items.filter((item) => item.selected !== true);
    setItems([...newData]);
  };

  function handleDragStart(event) {
    //added extra id(s) !!!!!!!!!!!
    // console.log(event, "eventstart");
    setActiveId(event.active.id.id);
  }

  function handleDragEnd(event) {
    // console.log(event.active, "eventend");
    const { active, over } = event;
    // console.log(active, over, "active, over");

    if (active.id.id !== over.id.id) {
      //added extra id(s) !!!!!!!!!!!
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.id);
        // console.log(oldIndex, "oldIndex");
        const newIndex = items.indexOf(over.id.id);
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
    <div className="bg-white pt-3 rounded w-100 lg:w-2/3 mx-auto">
      <div className="flex flex-col md:flex-row align-middle justify-between">
        {totalSelected >= 1 ? (
          <div className="flex align-middle justify-center md:justify-start">
            <input
              type="checkbox"
              name=""
              id=""
              checked={
                items.every((item) => item.selected === true) &&
                items.length > 0
              }
              onChange={selectOrDeselectAll}
              className={`mt-2 md:ml-8 cursor-pointer w-4 h-4`}
            />
            <h1 className="pb-3 ps-2 text-xl font-bold ">
              {totalSelected} {totalSelected > 1 ? "Files " : "File "} Selected
            </h1>
          </div>
        ) : (
          <h1 className="pb-3 ps-8 text-xl font-bold">Gallery</h1>
        )}
        <button
          className={`text-red-600 font-semibold pb-3 pr-8 ${
            !items.some((item) => item.selected === true) && "hidden"
          }`}
          onClick={handleDelete}
        >
          Delete {totalSelected > 1 ? "Files " : "File "}
        </button>
      </div>
      <hr />
      <div className="ps-8 p-5">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {items?.map((item, index) => (
                <ImageCard
                  key={index}
                  item={item}
                  index={index}
                  handleSelect={handleSelect}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay adjustScale={true}>
            {activeId ? (
              <Image
                imageLink={activeId.image}
                index={items?.indexOf(activeId)}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Gallery;
