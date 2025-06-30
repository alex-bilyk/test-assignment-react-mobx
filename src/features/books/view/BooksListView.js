import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";

import { MODE } from "../../../shared/constants";
import { StoreCtx } from "../../../providers/StoreProvider";

export const BooksListView = observer(() => {
  const { booksCtrl } = useContext(StoreCtx);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    booksCtrl.fetchAll();
  }, [booksCtrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    booksCtrl.add({ name, author });
    setName("");
    setAuthor("");
  };

  if (booksCtrl.loading) return <p>Loading…</p>;

  return (
    <div style={{ padding: 16 }}>
      {/* mode switch */}
      <div style={{ marginBottom: 12 }}>
        <button
          disabled={booksCtrl.mode === MODE.ALL}
          onClick={() => booksCtrl.setMode(MODE.ALL)}
        >
          All books
        </button>
        <button
          style={{ marginLeft: 8 }}
          disabled={booksCtrl.mode === MODE.PRIVATE}
          onClick={() => booksCtrl.setMode(MODE.PRIVATE)}
        >
          Private books
        </button>
      </div>

      {booksCtrl.error && (
        <div style={{ color: "red", marginBottom: 8 }}>
          {booksCtrl.error}
        </div>
      )}

      {/* list */}
      {booksCtrl.books.map((b, i) => (
        <div key={i}>
          {b.author}: {b.name}
        </div>
      ))}

      {/* form */}
      <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
        <input
          placeholder="Book name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: 8 }}>
          Add book
        </button>
      </form>
    </div>
  );
});
