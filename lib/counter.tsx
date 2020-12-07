import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
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
  if (action.type === "setUsers") {
    return UserReducer(state, action);
  } else {
    return BooksReducer(state, action);
  }
};
const Child: FC<{ m: number }> = memo(function ({ m }) {
  console.log("child");
  return <div>{m}</div>;
});
const Counter: FC = function () {
  // const [state, dispatch] = useReducer(reducer, Store);
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);

  let timer = useRef(0);
  useEffect(() => {
    if (timer.current) {
      console.log((timer.current || 0) - performance.now());
    }
  }, [n]);
  useCallback(() => {}, []);
  const divRef = useRef(null);
  return (
    <div>
      {/*<Context.Provider value={{ state, dispatch }}>*/}
      {/*<Users />*/}
      {/*<Books />*/}
      {/*</Context.Provider>*/}
      <div ref={divRef}>{n}</div>
      <Child m={m} />
      <button
        onClick={() => {
          console.log(divRef);
          setN((i) => i + 1);
          timer.current = performance.now();
        }}
      >
        n
      </button>
      <button
        onClick={() => {
          setM((i) => i + 1);
          timer.current = performance.now();
        }}
      >
        m
      </button>
    </div>
  );
};

export default Counter;
