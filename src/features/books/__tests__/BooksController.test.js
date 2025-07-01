import { BooksController } from "../controller/BooksController";
import { booksService }   from "../service/BooksService";

jest.mock("../service/BooksService");

const ALL = [{ name: "<A>", author: "X>" }];
const PRIVATE = [{ name: "B<", author: "<Y" }];

beforeEach(() => {
  jest.resetAllMocks();
  booksService.getAll.mockResolvedValue(ALL);
  booksService.getPrivate.mockResolvedValue(PRIVATE);
  booksService.add.mockResolvedValue(true);
  booksService.reset.mockResolvedValue(null);
});

describe("BooksController logic", () => {
  test("fetchData() in ALL mode populates list and privateCount", async () => {
    const ctrl = new BooksController();
    await ctrl.fetchData();

    expect(ctrl.books).toEqual([{ name: "A", author: "X" }]);
    expect(ctrl.privateCount).toBe(PRIVATE.length);

    expect(booksService.getAll).toHaveBeenCalledTimes(1);
    expect(booksService.getPrivate).toHaveBeenCalledTimes(1);
  });

  test("switching to PRIVATE mode calls only getPrivate()", async () => {
    const ctrl = new BooksController();

    await ctrl.setMode("private");

    expect(ctrl.mode).toBe("private");
    expect(ctrl.books[0].name).toBe("B");
    expect(booksService.getPrivate).toHaveBeenCalledTimes(1);
    expect(booksService.getAll).not.toHaveBeenCalled();
  });

  test("add() calls service.add and refreshes list", async () => {
    const ctrl = new BooksController();
    await ctrl.add({ name: "Introduction to Algorithms", author: "Thomas H. Cormen" });

    expect(booksService.add).toHaveBeenCalledWith({ name: "Introduction to Algorithms", author: "Thomas H. Cormen" });
    expect(booksService.getAll).toHaveBeenCalledTimes(1);
  });

  test("reset() hits the reset endpoint and refreshes", async () => {
    const ctrl = new BooksController();
    await ctrl.reset();

    expect(booksService.reset).toHaveBeenCalledTimes(1);
    expect(booksService.getAll).toHaveBeenCalledTimes(1);
  });

  test("network failure sets an error and clears loading", async () => {
    booksService.getAll.mockRejectedValueOnce(new Error("Something went wrong!"));

    const ctrl = new BooksController();
    await ctrl.fetchData();

    expect(ctrl.error).toBe("Something went wrong!");
    expect(ctrl.loading).toBe(false);
  });
});
