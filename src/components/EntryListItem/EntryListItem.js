import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import EntryApiService from "../../services/entry-api-service";
import "./EntryListItem.css";
import ArticleListContext from "../../contexts/ArticleListContext";

export default class EntryListItem extends Component {
  static contextType = ArticleListContext;

  state = { error: null };

  handleClickDelete = async () => {
    const { id } = this.props.entry;

    try {
      await EntryApiService.deleteUserArticle(id);
      EntryApiService.getEntries()
        .then(this.context.setEntryList)
        .catch(this.context.setError);
      this.setState({ error: null });
    } catch (res) {
      this.setState({ error: res.error });
    }
  };

  render() {
    const { entry } = this.props;
    const { error } = this.state;

    return (
      <div className="EntryListItem__container">
        <div className="EntryListItem">
          <div className="EntryListItem__details">
            <div className="EntryListItem__text">
              <h2 className="EntryListItem__title">{entry.date_created}</h2>
              <p className="EntryListItem__description">{entry.text}</p>
            </div>
          </div>
          {error && (
            <div role="alert">
              <p>{error}</p>
            </div>
          )}
        </div>
        <button
          className="EntryListItem__delete jiggly"
          onClick={this.handleClickDelete}
          aria-label="delete button"
          title="delete button"
        >
          <FontAwesomeIcon className="logo" icon={faTrashAlt} />
        </button>
      </div>
    );
  }
}

// function truncate(text) {
//   const words = text.split(" ");

//   if (words.length > 40) {
//     return words.slice(0, 40).join(" ") + " ...";
//   }

//   return text;
// }
