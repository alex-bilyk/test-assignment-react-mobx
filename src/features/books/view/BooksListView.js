import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { BooksController } from "../controller/BooksController";

const ctrl = new BooksController();

export const BooksListView = observer(() => {
  useEffect(() => {
    ctrl.fetchAll();
  }, []);

  if (ctrl.loading) return <p>Loading…</p>;

  return (
    <div>
      {ctrl.books.map((b, i) => (
        <div key={i}>{b.author}: {b.name}</div>
      ))}
      <button
        onClick={() =>
          ctrl.add({ name: "My Test Book", author: "Me" })
        }
      >
        Add
      </button>
    </div>
  );
});
