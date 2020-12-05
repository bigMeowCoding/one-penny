import React, { FC, useState } from "react";

const Counter: FC = function () {
  const [user, setUser] = useState<{ name: string; age: number }>({
    name: "zyj",
    age: 10,
  });
  return (
    <React.Fragment>
      <div>{user?.name}</div>
      <button onClick={() => {
          user.name = 'z';
          setUser(user)
      }}>change</button>
    </React.Fragment>
  );
};

export default Counter;
