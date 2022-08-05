import { Add_list } from "./const";
import { Drag_happened } from "./const";

export const addlist = (title) => {
  return {
    type: Add_list,
    payLoad: title,
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: Drag_happened,
    payLoad: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  };
};
