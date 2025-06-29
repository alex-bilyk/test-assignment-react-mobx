import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { StoreCtx } from "../../../providers/StoreProvider";

export const BooksListView = observer(() => {
  const { booksCtrl } = useContext(StoreCtx);

  useEffect(() => {
    booksCtrl.fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (booksCtrl.loading) return <p>Loading…</p>;

  return (
    <div>
      {/* mode switch */}
      <div style={{ marginBottom: 12 }}>
        <button
          disabled={booksCtrl.mode === "all"}
          onClick={() => booksCtrl.setMode("all")}
        >
          All books
        </button>
        <button
          style={{ marginLeft: 8 }}
          disabled={booksCtrl.mode === "private"}
          onClick={() => booksCtrl.setMode("private")}
        >
          Private books
        </button>
      </div>

      {/* list */}
      {booksCtrl.books.map((b, i) => (
        <div key={i}>
          {b.author}: {b.name}
        </div>
      ))}

      {/* quick add (still mocked) */}
      <button
        style={{ marginTop: 12 }}
        onClick={() => booksCtrl.add({ name: "My Test Book", author: "Me" })}
      >
        Add
      </button>
    </div>
  );
});
