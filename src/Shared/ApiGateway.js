import { API_BASE } from "./config";

function asJsonSafe(res) {
  return res.status === 204 ? null : res.json();
};

function check(res) {
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} - ${res.statusText}`);
    err.status = res.status;

    throw err;
  }

  return res;
};

export default class ApiGateway {
  request = async (method, path, payload) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: payload ? JSON.stringify(payload) : null
    }).then(check);

    return asJsonSafe(res);
  };

  get = (path) => this.request("GET", path);
  post = (path, payload) => this.request("POST", path, payload);
  put = (path, payload = null) => this.request("PUT", path, payload);
}
