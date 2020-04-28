import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.scss'
import BookShelf from './BookShelf';
import AddCatPage from './addCatPage';
import AddBookPage from './addBookPage';
import SearchPage from './searchPage';

class BooksApp extends Component {
  state = {
    books:[],
    showSearchPage: false,
    showAddCatPage: false,
    showAddBookPage: false,
    shelves: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
            books
        }))  
      })
  }

  handleShelfChange = (e) => {
    e.preventDefault();
    const { books } = this.state;
    const { value, id }  = e.target;
    this.setState((prevState) => {
      var booksUpdated = prevState.books
      books[id].shelf = value
      return {books: booksUpdated}
    })
  }

  buildShelves() {
    const { books, shelves } = this.state;
    const shelvesArr = [];
    // create array of unique values from the dataset
    books.forEach((book) => { if (shelvesArr.indexOf(book.shelf) < 0) shelvesArr.push(book.shelf) }) 
    // create objects within array containing raw name and add a "pretty name"
    shelvesArr.forEach((shelf) => { shelves.push( {rawName:shelf,prettyName:this.prettyName(shelf) } ) })
  }
  
  // Generate a "pretty" name from the raw shelf data.
  // This presumes the shelf value is in camel case.
  prettyName(name) {
    let thisChar = "";
    let tempStr = ""

    for (var i=1 ; i <=name.length; i++) {    
        if (name.charAt(i) === name.charAt(i).toUpperCase()) {
            thisChar = " "+name.charAt(i);
        } else {
            thisChar = name.charAt(i);
        }
    tempStr+=thisChar;
    } 
    return name[0].toUpperCase()+tempStr
  }

  turnPage = (e) => {
    this.setState({
       showSearchPage: false,
       showAddCatPage: false,
       showAddBookPage: false
    })
  }

  render() {
    const { books, shelves, showSearchPage, showAddCatPage, showAddBookPage } = this.state;    
    if (shelves.length == 0 ) this.buildShelves();
    return (
      <div className="app">
        {showSearchPage ? 
          <SearchPage turnPage={this.turnPage}/>
         : showAddCatPage ? 
            <AddCatPage turnPage={this.turnPage}/> 
          : showAddBookPage ?
              <AddBookPage turnPage={this.turnPage}/>
            : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  {shelves.map((shelf) => (  // iterate through shelves
                    <BookShelf 
                      key={shelf.rawName}  
                      currentShelfRaw={shelf.rawName}                            
                      books={books}
                      currentShelfPretty={shelf.prettyName}
                      shelves={shelves}
                      handleShelfChange={this.handleShelfChange}/>                
                  ))}
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Search</button>
              </div>
              
              <div className="open-addCat">
                <button onClick={() => this.setState({ showAddCatPage: true })}>Add Category</button>
              </div>
              
              <div className="open-addBook">
                <button onClick={() => this.setState({ showAddBookPage: true })}>Add Book</button>
                  </div>
            </div>
        )}
      </div>
    )
  }
}

export default BooksApp
/*<searchPage turnPage={this.turnPage}/>
 showAddCatPage ? 
            <addCatPage turnPage={this.turnPage}/> 
          : showAddBookPage ?
              <addBookPage turnPage={this.turnPage}/>
            : */