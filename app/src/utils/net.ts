const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

const base = "/";

class HTTPError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const fetchJSON = async (url, method = GET, data = {}) => {
  const params = {
    method,
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (method !== GET && data) {
    params["body"] = JSON.stringify(data);
  }
  const response = await fetch(url, params);
  const json = await response.json();
  if (response.status >= 300) {
    throw new HTTPError(
      json.message || `Error making call ${url}`,
      response.status
    );
  }
  return json;
};

const create = (base) => {
  return {
    httpGet: (url) => {
      return fetchJSON(base + url, GET);
    },
    httpDelete: (url) => {
      return fetchJSON(base + url, DELETE);
    },
    httpPost: (url, data = {}) => {
      return fetchJSON(base + url, POST, data);
    },
    httpPut: (url, data) => {
      return fetchJSON(base + url, PUT, data);
    },
  };
};

const parseQuery = (search) => {
  const query = {};
  if (search.length) {
    search = search.substring(1);
    const parts = search.split("&");
    parts.forEach((p) => {
      const pair = p.split("=");
      query[pair[0]] = pair[1];
    });
  }
  return query;
};

const { httpGet, httpDelete, httpPost, httpPut } = create("/");

export { httpGet, httpDelete, httpPost, httpPut, create, parseQuery };
