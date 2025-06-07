import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import cx from "clsx";
import { Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import classes from "./DragList.module.scss";

export default function DragList({ data }) {
  const [state, handlers] = useListState(data);

  useEffect(() => {
    handlers.setState(data);
  }, [data]);

  // When the list is reordered, update the positions based on new order
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    handlers.reorder({ from: source.index, to: destination.index });

    // After reorder, update step values to match new index + 1
    handlers.setState((current) =>
      current.map((item, index) => ({
        ...item,
        step: index + 1,
      }))
    );
  };

  const items = state.map((item, index) => (
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
          <div className="flex flex-wrap items-start w-full gap-2">
            <p className="font-semibold pr-5">Step {item.step}: </p>
            <p className="flex-1 break-words">{item.description}</p>
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
