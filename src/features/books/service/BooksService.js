import ApiGateway from "../../../shared/ApiGateway";

class BooksService {
  constructor() {
    this.http = new ApiGateway();
  }

  getAll = () => this.http.get("/");
  getPrivate = () => this.http.get("/private");
  add = (book) => this.http.post("/", book);
  reset = () => this.http.put("/reset");
}

export const booksService = new BooksService();
