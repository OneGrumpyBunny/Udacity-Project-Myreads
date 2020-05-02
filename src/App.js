import React, { Component } from 'react'
import * as BooksAPI from './data/BooksAPI'
import  { Route, Link } from 'react-router-dom'
import './App.scss'
import BookShelf from './BookShelf';
import SearchPage from './searchPage';

class BooksApp extends Component {
  state = {
    books:[],
    shelves: [
      {"rawName":"currentlyReading","prettyName":"Currently Reading"},
      {"rawName":"wantToRead","prettyName":"Want To Read"},
      {"rawName":"read","prettyName":"Read"},
      {"rawName":"none","prettyName":"None"}
    ],
    page: 'bookshelf'
  }

  /* this grabs the dataset from the API */
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
            books
      }))  
    })
  }

  /* this allows the browser's back button 
   to return user to the previous "page" */
  componentDidUpdate(){
    window.onpopstate  = (e) => {
      this.setState(() => ({
        page:'bookshelf'
      }))
    }   
  }

  /* this manages shelf reassignment */
  /* BooksAPI uses the book's ID as reference point */
  handleShelfChange = (book) => {
    book.preventDefault();    
    const { books } = this.state;
    const { value, id }  = book.target;
    let ind = -1;
    books.filter((b, index) => {
      if (b.id === id) { ind = index      
        BooksAPI.update(b, value)
        .then((b) => {
          this.setState((prevState) => {
            var booksUpdated = prevState.books
            books[ind].shelf = value
            return {books: booksUpdated}
          }) 
        }) 
      } 
      return ind;
    })     
  } 

  /* this facilitates navigation */
  turnPage = (e) => {
    this.setState({
       page: 'bookshelf'
    })
  }

/*  shelfChange = (shelf) => {
    shelf.preventDefault();
    const { value } = shelf.target;
    this.setState({
        tmpShelf: value        
    });
  };
*/
  render() {
    const { books, shelves, page } = this.state; 
    return (
      <div className="app">
        {page === 'search' ? 
          <Route path='/search' render={() => (
          <SearchPage 
            turnPage={this.turnPage}
            books={books}
            shelves={shelves}
            handleShelfChange={this.handleShelfChange}
            />            
          )}
          />          
         : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
               {page === 'bookshelf' && shelves.map((shelf) => (  // iterate through shelves                    
                  <Route key={shelf.rawName} path='/' render={() => (
                    <BookShelf                      
                    currentShelfRaw={shelf.rawName}                            
                    books={books}
                    currentShelfPretty={shelf.prettyName}
                    shelves={shelves}
                    handleShelfChange={this.handleShelfChange}
                    onNavigate= {() => {              // sets up which "page" to show
                        this.setState(() => ({
                            screen: 'create'
                        }))
                    }}
                  />    
                  )}
                  />      
                ))}
              </div>        
               
              <div className="open-search"> 
                <Link to='/search' className="searchBtn" onClick={() => this.setState({ page: 'search' })}/>
              </div>
            </div>
        )}
        
      </div>
    )
  }
}

export default BooksApp