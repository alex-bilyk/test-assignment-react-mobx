import { API_BASE } from "./config";
import { getJsonSafe, checkRequest } from "./utils";

export default class ApiGateway {
  request = async (method, path, payload) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: payload ? JSON.stringify(payload) : null
    }).then(checkRequest);

    return getJsonSafe(res);
  };

  get = (path) => this.request("GET", path);
  post = (path, payload) => this.request("POST", path, payload);
  put = (path, payload = null) => this.request("PUT", path, payload);
}
