import React from "react";
import { State } from "./types";

export default React.createContext<{
  state: State;
  dispatch: any;
}>({
  state: {
    users: [],
    books: [],
  },
  dispatch: null,
});
