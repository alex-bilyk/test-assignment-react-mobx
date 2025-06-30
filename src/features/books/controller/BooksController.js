import { makeAutoObservable, runInAction } from "mobx";
import { booksService } from "../service/BooksService";

const clean = (str) => str.replace(/[<>]/g, "");

export class BooksController {
  books = [];
  privateCount = 0;
  loading = false;
  error = null;
  mode = "all"; // 'all' | 'private'

  constructor() {
    makeAutoObservable(this);
  }

  setMode = async (newMode) => {
    if (this.mode === newMode) return;
    this.mode = newMode;

    await this.fetchAll();
  };

  fetchAll = async () => {
    this.loading = true;
    this.error = null;

    try {
      const dataPromise = this.mode === "private"
        ? booksService.getPrivate()
        : booksService.getAll();
      const privatePromise = booksService.getPrivate();

      const [data, privateList] = await Promise.all([
        dataPromise,
        privatePromise
      ]);

      runInAction(() => {
        this.books = data.map((b) => ({
          name: clean(b.name),
          author: clean(b.author)
        }));
        this.privateCount = privateList.length;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || "Network error";
        this.loading = false;
      });
    }
  };

  add = async ({ name, author }) => {
    if (!name.trim() || !author.trim()) {
      return alert("Name and author are required");
    }

    try {
      await booksService.add({ name: clean(name), author: clean(author) });
      await this.fetchAll();
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  };

  reset = async () => {
    this.loading = true;
    this.error = null;

    try {
      await booksService.reset();
      await this.fetchAll();
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  };
}
