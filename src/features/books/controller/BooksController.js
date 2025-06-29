import { makeAutoObservable, runInAction } from "mobx";
import { booksService } from "../service/BooksService";

export class BooksController {
  books = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchAll = async () => {
    this.loading = true;
    const result = await booksService.getAll();
    runInAction(() => {
      this.books = result;
      this.loading = false;
    });
  };

  add = async (book) => {
    await booksService.add(book);
    await this.fetchAll();
  };
}
