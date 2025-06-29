import ApiGateway from "../../../Shared/ApiGateway";

class BooksService {
  constructor() {
    this.http = new ApiGateway();
  }

  getAll = () => this.http.get("/"); // GET https://.../books/{user}/
  getPrivate = () => this.http.get("/private"); // GET https://.../books/{user}/private
  add = (book) => this.http.post("/", book); // POST https://.../books/{user}/
  reset = () => this.http.put("/reset"); // PUT https://.../books/{user}/reset
}

export const booksService = new BooksService();
