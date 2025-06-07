import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import cx from "clsx";
import { IconCircleMinus } from "@tabler/icons-react";
import classes from "./DragList.module.scss";

export default function DragList({ data, updateData }) {
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const reordered = Array.from(data);
    const [movedItem] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, movedItem);

    // Update step numbers
    const withUpdatedSteps = reordered.map((item, index) => ({
      ...item,
      step: index + 1,
    }));

    updateData(withUpdatedSteps);
  };

  const items = data.map((item, index) => (
    <Draggable
      key={item.step.toString()}
      index={index}
      draggableId={item.step.toString()}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center flex-wrap items-start w-full gap-2 group">
            <p className="font-semibold pr-5">Step {item.step}: </p>
            <p className="flex-1 break-words">{item.description}</p>
            <IconCircleMinus
              onClick={() => {
                const filtered = data.filter(
                  (step) => step.description !== item.description
                );
                updateData(
                  filtered.map((step, index) => ({
                    ...step,
                    step: index + 1,
                  }))
                );
              }}
              className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transition-translate duration-300 hover:cursor-pointer"
            />
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
