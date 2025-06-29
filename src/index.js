import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { StoreProvider } from "./providers/StoreProvider";
import { BooksListView } from "./features/books/view/BooksListView";
import { Header } from "./components/Header";

ReactDOM.render(
  <StoreProvider>
    <Header />
    <BooksListView />
  </StoreProvider>,
  document.getElementById("root")
);
