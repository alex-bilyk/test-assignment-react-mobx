import React, { useContext } from "react";
import { observer } from "mobx-react";

import { StoreCtx } from "../providers/StoreProvider";
import "./Header.css";

export const Header = observer(() => {
  const { booksCtrl } = useContext(StoreCtx);

  return (
    <header className="Header Header--sticky">
      <strong>Your books: {booksCtrl.privateCount}</strong>

      <button
        onClick={booksCtrl.reset}
        disabled={booksCtrl.loading}
      >
        Reset All
      </button>
    </header>
  );
});
