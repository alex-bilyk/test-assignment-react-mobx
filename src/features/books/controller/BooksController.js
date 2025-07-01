import { makeAutoObservable, runInAction } from "mobx";

import { MODE, NOTIFICATION_MESSAGES } from "../../../shared/constants";
import { cleanXSS, sanitizeBooks } from "../../../shared/utils";
import { booksService } from "../service/BooksService";

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

    await this.fetchData();
  };

  fetchData = async () => {
    switch (this.mode) {
      case MODE.PRIVATE:
        await this.fetchPrivate();
        break;
      default:
        await this.fetchAll();
    }
  };

  fetchPrivate = async () => {
    this.loading = true;
    this.error = null;

    try {
      const privateListData = await booksService.getPrivate();

      runInAction(() => {
        this.books = sanitizeBooks(privateListData);

        this.privateCount = privateListData.length;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || NOTIFICATION_MESSAGES.NETWORK_ERROR;
        this.loading = false;
      });
    }
  };

  fetchAll = async () => {
    this.loading = true;
    this.error = null;

    try {
      const generalPromisesList = [booksService.getAll(), booksService.getPrivate()];

      const [allListData, privateListData] = await Promise.all(generalPromisesList);

      runInAction(() => {
        this.books = sanitizeBooks(allListData);

        this.privateCount = privateListData.length;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || NOTIFICATION_MESSAGES.NETWORK_ERROR;
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
      await this.fetchData();
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
      await this.fetchData();
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  };
}
