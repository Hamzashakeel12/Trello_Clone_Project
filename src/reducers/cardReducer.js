import { Add_card, Add_list, Drag_happened } from "../actions/const";

let Listid = 1;
let Cardid = 1;

const initialState = [];

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    // Adding New list reducer

    case Add_list:
      const newList = {
        title: action.payLoad,
        cards: [],
        id: Listid,
      };
      Listid += 1;
      return [...state, newList];

    //Adding new Card Reducer

    case Add_card: {
      const newCard = {
        text: action.payLoad.text,
        id: `Card -${Cardid}`,
      };
      Cardid += 1;
      const newState = state.map((list) => {
        if (list.id === action.payLoad.Listid) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    // DraggAble Reducers

    case Drag_happened:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payLoad;

      const newState = [...state];

      //  List Dragging Logic!!!!!!!!

      if (type === "list") {
        const listContainer = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...listContainer);
        return newState;
      }

      // in same list...

      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === String(list.id));
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // in Another List..........

      if (droppableIdStart !== droppableIdEnd) {
        // From where  dragging start

        const listStart = state.find(
          (list) => droppableIdStart === String(list.id)
        );

        // pulling That Card out from here

        const card = listStart.cards.splice(droppableIndexStart, 1);

        //

        const listEnd = state.find(
          (list) => droppableIdEnd === String(list.id)
        );
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newState;
    default:
      return state;
  }
};
