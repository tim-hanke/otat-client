import React, { Component } from "react";

const ArticleListContext = React.createContext({
  entryList: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setEntryList: () => {},
});
export default ArticleListContext;

export class ArticleListProvider extends Component {
  state = {
    entryList: [],
    error: null,
  };

  setEntryList = (entryList) => {
    this.setState({ entryList });
  };

  setError = (error) => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      entryList: this.state.entryList,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setEntryList: this.setEntryList,
    };
    return (
      <ArticleListContext.Provider value={value}>
        {this.props.children}
      </ArticleListContext.Provider>
    );
  }
}
