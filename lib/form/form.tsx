import React, { FC } from "react";

interface Props {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Layout: FC<Props> = function ({onSubmit}) {
  const onSubmitHandle: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      onSubmit(e);
  };
  return <form onSubmit={onSubmitHandle}>

  </form>;
};
export default Layout;
