import React, { Component } from "react";
import { getBooksQuery } from "../queries/queries";
import { graphql } from "react-apollo";
import { bookData } from "../../src/data";
import { BookDetails } from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }
  displayBooks() {
    console.log(this.props);
    if (this.props.loading) {
      return <div>Loading Books</div>;
    } else {
      return bookData.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(e) => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">
          <li>{this.displayBooks()}</li>
        </ul>
        <BookDetails bookId={this.book.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
