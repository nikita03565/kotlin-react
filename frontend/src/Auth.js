export function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}

export function withAuthHeader(headers) {
  const newHeaders = { ...headers };
  const token = localStorage.getItem("token");
  if (token) {
    newHeaders.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return newHeaders;
}
