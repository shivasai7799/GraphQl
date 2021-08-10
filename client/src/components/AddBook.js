import React, { Component } from "react";
import { graphql,compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";
import { bookData } from "../../src/data";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }
  displayAuthors() {
    console.log(bookData, "BookList");
    console.log(this.props);
    if (this.props.loading) {
      return <div>Loading Books</div>;
    } else {
      return bookData.map((book) => {
        return (
          <option key={book.id} value={book.id}>
            {book.authors}
          </option>
        );
      });
    }
  }

  submitForm(e) {
      e.preventDefault();
      this.props.addBookMutation({
          variables: {
              name: this.state.name,
              genre: this.state.genre,
              authorId : this.state.authorId
          },
          refetchQueries:[{ query: getBooksQuery}]
      })
  }
  render() {
    return (
      <form id="add-book" onSubmit = {this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={(e) => this.setState({
              name: e.target.value
          })}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({
              genre: e.target.value
          })}/>
        </div>
        <div className="field">
          <label>Author</label>
          <select onChange={(e) => this.setState({
              authors : e.target.value
          })}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
graphql(addBookMutation,{name: "addBookMutation"})(AddBook));
