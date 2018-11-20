import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Dropdown } from './Dropdown.js'

export class SearchBooks extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.fetchBook = this.fetchBook.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    }

    state = {
        currentValue: "",
        allBooks: [],
        found: true,
    }
    render() {
        let bookResults;
        if (this.state.found) {
            bookResults = this.state.allBooks.map((book, index) => this.renderBook(book));
        } else {
            bookResults = "Books not found";
        }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" href="/">
                    </a>
                    <div className="search-books-input-wrapper">
                        <input type="text" onChange={this.onInputChange} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {bookResults}
                    </ol>
                </div>
            </div>
        )
    }

    renderBook(book) {
        if (this.state.currentValue !== "") {
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
                    <div className="book">
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

    onDropdownSelected(target, book) {
        BooksAPI.update(book, target);
    }

    onInputChange(e) {
        e.preventDefault();
        const searchKeyWords = ['android', 'art', 'artificial intelligence', 'astronomy', 'austen', 'baseball', 'basketball', 'bhagat', 'biography', 'brief', 'business', 'camus', 'cervantes', 'christie', 'classics', 'comics', 'cook', 'cricket', 'cycling', 'desai', 'design', 'development', 'digital Marketing', 'drama', 'drawing', 'dumas', 'education', 'everything', 'fantasy', 'film', 'finance', 'first', 'fitness', 'football', 'future', 'games', 'gandhi', 'homer', 'horror', 'hugo', 'ibsen', 'journey', 'kafka', 'king', 'lahiri', 'larsson', 'learn', 'literary fiction', 'make', 'manage', 'marquez', 'money', 'mystery', 'negotiate', 'painting', 'philosophy', 'photography', 'poetry', 'production', 'programming', 'react', 'redux', 'river', 'robotics', 'rowling', 'satire', 'science fiction', 'shakespeare', 'singh', 'swimming', 'tale', 'thrun', 'time', 'tolstoy', 'travel', 'ultimate', 'virtual reality', 'web development', 'ios'];
        const bookKeyword = (e.target.value).toLowerCase();
        if (bookKeyword === "") {
            this.setState({allBooks: [], currentValue: "", found: true});
            return;
        }
        for(let i = 0; i < searchKeyWords.length; i ++) {
            if(searchKeyWords[i].startsWith(bookKeyword)) {
                let bs = [];
                this.setState({currentValue: bookKeyword, found: true});
                BooksAPI.search(bookKeyword, 100).then((books) => {
                    if (books) {
                        books.map((book, index) => {
                            this.fetchBook(book.id)
                                .then(data => {
                                    bs.push(data);
                                    this.setState({allBooks: bs});
                                })
                            return book;
                        });
                    } else {
                        this.setState({allBooks: [], currentValue: "", found: false});
                    }
                }).catch(this.setState({found: true}));
                break;
            } else {
                this.setState({allBooks: [], currentValue: "", found: false});
            }
        }
    }

    async fetchBook(id) {
        let response = await BooksAPI.get(id);
        return response;
    }
}

