import ApiGateway from "../../../Shared/ApiGateway";

class BooksService {
  constructor() {
    this.http = new ApiGateway();
  }

  getAll = async () => this.http.get("/");
  add = async (book) => this.http.post("/books", book);
}

export const booksService = new BooksService();
