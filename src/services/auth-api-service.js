import { API_ENDPOINT } from "../config";

const AuthApiService = {
  async postLogin(credentials) {
    const res = await fetch(`${API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },
  async postUser(user) {
    const res = await fetch(`${API_ENDPOINT}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },
};

export default AuthApiService;
