import React, { Component } from "react";
import EntryApiService from "../../services/entry-api-service";
import { Button, Input } from "../Utils/Utils";

export default class AddArticleForm extends Component {
  static defaultProps = {
    onAddSuccess: () => {},
  };

  state = { error: null, isFetching: false };

  handleSubmitUrl = (ev) => {
    ev.preventDefault();
    this.setState({ error: null, isFetching: true });
    const { url } = ev.target;

    EntryApiService.postArticle(url.value)
      .then((_res) => {
        url.value = "";
        this.props.onAddSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error, isFetching: false });
      });
  };

  render() {
    const { error, isFetching } = this.state;
    return (
      <form className="AddArticleForm" onSubmit={this.handleSubmitUrl}>
        <div className="url">
          <label htmlFor="AddArticleForm__url">URL</label>
          <Input required name="url" id="AddArticleForm__url"></Input>
        </div>
        {error && (
          <div role="alert">
            <p className="red">{error}</p>
          </div>
        )}
        <Button type="submit">
          {isFetching ? "Getting URL" : "Submit URL"}
        </Button>
      </form>
    );
  }
}
