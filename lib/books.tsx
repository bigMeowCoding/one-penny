import React, { useEffect } from "react";
import { useContext } from "react";
import Context from "./Context";
import { Book, State } from "./types";
const getBooks = (): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { name: "好好说话" },
        { name: "好好学习" },
        { name: "算法导论" },
      ]);
    }, 2000);
  });
};
const Books = function () {
  const { state, dispatch } = useContext<{
    state: State;
    dispatch: any;
  }>(Context);
  useEffect(() => {
    getBooks().then((data) => {
      dispatch({
        type: "setBooks",
        payload: data,
      });
    });
  }, []);
  const { books } = state;
  return (
    <ul>
      {books.map((book) => {
        return <li>{book.name}</li>;
      })}
    </ul>
  );
};

export default Books;
