import { makeAutoObservable, runInAction } from "mobx";
import { booksService } from "../service/BooksService";

export class BooksController {
  books = [];
  privateCount = 0;
  loading = false;
  mode = "all"; // 'all' | 'private'

  constructor() {
    makeAutoObservable(this);
  }

  setMode = async (nextMode) => {
    if (this.mode === nextMode) return;
    this.mode = nextMode;
    await this.fetchAll();
  };

  fetchAll = async () => {
    this.loading = true;
    const data =
      this.mode === "private"
        ? await booksService.getPrivate()
        : await booksService.getAll();

    // when we have private list we also know its size
    const privateList =
      this.mode === "private" ? data : await booksService.getPrivate();

    runInAction(() => {
      this.books = data;
      this.privateCount = privateList.length;
      this.loading = false;
    });
  };

  add = async (book) => {
    await booksService.add(book);
    await this.fetchAll();
  };
}
