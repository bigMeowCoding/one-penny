import React, { useEffect } from "react";
import { useContext } from "react";
import Context from "./Context";
import { State, User } from "./types";
const getUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { name: "lilei", age: 10 },
        { name: "zhangming", age: 10 },
        { name: "yanghua", age: 10 },
      ]);
    }, 2000);
  });
};
const Users = function () {
  const { state, dispatch } = useContext<{
    state: State;
    dispatch: any;
  }>(Context);
  const { users } = state;
  console.log(users);
  useEffect(() => {
    getUsers().then((data) => {
      console.log(data);
      dispatch({
        type: "setUsers",
        payload: data,
      });
    });
  }, []);
  return (
    <ul>
      {users.map((user, i) => {
        return <li key={i}>{user.name}</li>;
      })}
    </ul>
  );
};

export default Users;
