import { BooksController } from "../features/books/controller/BooksController";

export class RootStore {
  constructor() {
    this.booksCtrl = new BooksController();
  }
}

export const rootStore = new RootStore();
