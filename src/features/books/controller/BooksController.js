import { makeAutoObservable, runInAction } from "mobx";

import { MODE } from "../../../shared/constants";
import { booksService } from "../service/BooksService";

const cleanXSS = (str) => str.replace(/[<>]/g, "");

export class BooksController {
  books = [];
  privateCount = 0;
  loading = false;
  error = null;
  mode = MODE.ALL; // 'all' | 'private'

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
      const dataPromise = this.mode === MODE.PRIVATE
        ? booksService.getPrivate()
        : booksService.getAll();
      const privatePromise = booksService.getPrivate();

      const [data, privateList] = await Promise.all([
        dataPromise,
        privatePromise
      ]);

      runInAction(() => {
        this.books = data.map((b) => ({
          name: cleanXSS(b.name),
          author: cleanXSS(b.author)
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
      await booksService.add({ name: cleanXSS(name), author: cleanXSS(author) });
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
