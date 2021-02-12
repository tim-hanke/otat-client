import TokenService from "./token-service";
import { API_ENDPOINT } from "../config";

const ArticleApiService = {
  async getArticles() {
    const res = await fetch(`${API_ENDPOINT}/articles`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    });
    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },
  async postArticle(articleUrl) {
    const res = await fetch(`${API_ENDPOINT}/articles/`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ target_url: articleUrl }),
    });
    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },
  async deleteUserArticle(articleId) {
    const res = await fetch(`${API_ENDPOINT}/user_articles`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ article_id: articleId }),
    });
    return await (!res.ok
      ? res.json().then((e) => Promise.reject(e))
      : res.json());
  },
};

export default ArticleApiService;
