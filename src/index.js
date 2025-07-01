import ReactDOM from "react-dom/client";

import "./styles.css";

import { StoreProvider } from "./providers/StoreProvider";
import { BooksListView } from "./features/books/view/BooksListView";
import { Header } from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StoreProvider>
    <Header />
    <BooksListView />
  </StoreProvider>
);
