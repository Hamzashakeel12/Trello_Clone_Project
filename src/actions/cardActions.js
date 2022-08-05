import { Add_card } from "./const";

export const addcard = (Listid, text) => {
  return {
    type: Add_card,
    payLoad: { text, Listid },
  };
};
