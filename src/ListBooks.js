import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Dropdown } from './Dropdown.js'

export class ListBooks extends React.Component {
    constructor(props) {
        super(props);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }

    state = {
        allBooks: [],
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({allBooks: books})
        })
    }

    componentWillMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({allBooks: books})
        })
    }

    render() {
        const shelves = {
            currentlyReading: ['Currently Reading', 'currentlyReading'],
            wantToRead: ['Want to Read', 'wantToRead'],
            read: ['Read', 'read']
        }

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    { Object.keys(shelves).map((shelf) =>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{shelves[shelf][0]}</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.allBooks.map((book, index) => this.renderBook(book, shelves[shelf][1]))}
                                </ol>
                            </div>
                        </div>
                    )}
                </div>
                <div className="open-search">
                    <a href="/search">Add a book</a>
                </div>
            </div>

        )
    }

    onDropdownSelected(target, book) {
        BooksAPI.update(book, target).then(data => {
            let updatedBooks = this.state.allBooks;
            for(let i = 0; i < updatedBooks.length; i ++) {
                if(book.id === updatedBooks[i].id) {
                    updatedBooks[i].shelf = target;
                }
            }
            this.setState({
                allBooks: updatedBooks,
            })
        });
    }

    renderBook(book, status) {
        if (status === book.shelf) {
            let authors = [];
            if (book.authors) {
                authors = book.authors
            }
            let link = "";
            if (book.imageLinks && book.imageLinks.smallThumbnail) {
                link = book.imageLinks.smallThumbnail;
            }

            return (
                <li key={book.id}>
                    <div className="book" key={book.id}>
                        <div className="book-top">
                            <div className="book-cover" style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${link})`
                            }}>
                            </div>
                            <div className="book-shelf-changer">
                                <Dropdown selectedValue={book.shelf} book={book}
                                          onDropdownSelected={this.onDropdownSelected}/>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{authors}</div>
                    </div>
                </li>
            )
        }
    }
}

