export const cleanXSS = (str) => str.replace(/[<>]/g, "");

export const sanitizeBooks = (books) =>
  books.map((b) => ({
    name: cleanXSS(b.name),
    author: cleanXSS(b.author),
  }));

export const getJsonSafe = (res) => {
  return res.status === 204 ? null : res.json();
};

export const checkRequest = (res) => {
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} - ${res.statusText}`);
    err.status = res.status;

    throw err;
  }

  return res;
};
