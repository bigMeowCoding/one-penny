import React, { FC, useReducer } from "react";
import Users from "./users";
import Books from "./books";
import Context from "./Context";
import { Action, State } from "./types";
import UserReducer from "./users.reducer";
import BooksReducer from "./books.reducer";

const Store: State = {
  users: [],
  books: [],
};

const reducer = (state: State, action: Action) => {
    console.log(action)
  if (action.type === "setUsers") {
    return UserReducer(state, action);
  } else {
    return BooksReducer(state, action);
  }
};

const Counter: FC = function () {
  const [state, dispatch] = useReducer(reducer, Store);

  return (
    <div>
      <Context.Provider value={{ state, dispatch }}>
        <Users />
        <Books />
      </Context.Provider>
      {/*<div>{n}</div>*/}
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    dispatch({*/}
      {/*      type: "add",*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  add*/}
      {/*</button>*/}
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    dispatch({ type: "remove" });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  remove*/}
      {/*</button>*/}
    </div>
  );
};

export default Counter;
