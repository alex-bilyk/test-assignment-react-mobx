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

    const booksPromise =
      this.mode === "private"
        ? booksService.getPrivate()
        : booksService.getAll();

    const privateListPromise = booksService.getPrivate();

    const [data, privateList] = await Promise.all([
      booksPromise,
      privateListPromise
    ]);

    runInAction(() => {
      this.books = data;
      this.privateCount = privateList.length;
      this.loading = false;
    });
  };

  add = async ({ name, author }) => {
    if (!name.trim() || !author.trim()) {
      alert("Name and author are required");
      return;
    }

    await booksService.add({ name, author });
    await this.fetchAll();
  };
}
