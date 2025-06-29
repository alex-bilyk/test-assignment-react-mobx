import React, { useContext } from "react";
import { observer } from "mobx-react";
import { StoreCtx } from "../providers/StoreProvider";
import "./Header.css";

export const Header = observer(() => {
  const { booksCtrl } = useContext(StoreCtx);
  return (
    <header className="sticky">
      <strong>Your books: {booksCtrl.privateCount}</strong>
    </header>
  );
});
