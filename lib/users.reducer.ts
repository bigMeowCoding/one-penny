import { Action, State, User } from "./types";

export default function UserReducer(
  state: State,
  action: Action<User[] >
): State {
  switch (action.type) {
    case "setUsers":
      return {
        ...state,
        users: action.payload || [],
      };
    default:
      return state;
  }
}
