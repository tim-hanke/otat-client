import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ArticleListProvider } from "./contexts/ArticleListContext";
import { ArticleProvider } from "./contexts/ArticleContext";
import App from "./components/App/App";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <ArticleListProvider>
      <ArticleProvider>
        <App />
      </ArticleProvider>
    </ArticleListProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
