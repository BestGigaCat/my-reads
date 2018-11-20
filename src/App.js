mport React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { ListBooks } from './ListBooks.js'
import { SearchBooks } from './SearchBooks.js'

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBooks/>
                )}/>
                <Route exact path='/search' render={({history}) => (
                    <SearchBooks/>
                )}/>
            </div>
        )
    }
}

export default BooksApp

