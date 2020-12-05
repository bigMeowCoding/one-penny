import { Action, Book, State } from "./types";

const BooksReducer = (state: State, action: Action<Book[]>): State => {
  switch (action.type) {
    case "setBooks":
      return {
        ...state,
        books: action.payload || [],
      };
    default:
      return state;
  }
};
export default BooksReducer;
