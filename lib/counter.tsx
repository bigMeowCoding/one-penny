import React, { FC, useReducer } from "react";
const initState = {
  n: 0,
};
interface State {
  n: number;
}
interface Action {
  type: string;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        n: state.n + 1,
      };
    case "remove":
      return {
        ...state,
        n: state.n - 1,
      };
    default:
      return state;
  }
};

const Counter: FC = function () {
  const [state, dispatch] = useReducer(reducer, initState);
  const { n } = state;
  console.log(n);
  return (
    <div>
      <div>{n}</div>
      <button
        onClick={() => {
          dispatch({
            type: "add",
          });
        }}
      >
        add
      </button>
      <button
        onClick={() => {
          dispatch({ type: "remove" });
        }}
      >
        remove
      </button>
    </div>
  );
};

export default Counter;
