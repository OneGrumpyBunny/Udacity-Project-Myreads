import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import  { Route, Link } from 'react-router-dom'
import './App.scss'
import BookShelf from './BookShelf';
import AddShelfPage from './addShelfPage';
import AddBookPage from './addBookPage';
import SearchPage from './searchPage';

class BooksApp extends Component {
  state = {
    books:[],
    shelves: [],
    tmpShelf: "",
    page: 'bookshelf'
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
            books
        }))  
    })
  }

  componentDidUpdate(){
    window.onpopstate  = (e) => {
      this.setState(() => ({
        page:'bookshelf'
      }))
    }  
  }

  /* Book management */

  handleShelfChange = (book) => {
    book.preventDefault();    
    const { books } = this.state;
    const { value, id }  = book.target;
    let ind = -1;

    //finds the index of the book being updated
    books.filter((b, index) => {
    //sets shelf value of the book at that index
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
       page: 'bookshelf'
    })
  }

  /* shelf management */

  shelfDelete = (shelf) => {
    shelf.preventDefault();  
    const { value } = shelf.target;
    this.setState((prevState) => ({
      shelves: prevState.shelves.filter((s) => {
        return s.rawName !== value
      })
    }))
  }

  shelfAdd = (shelf) => {  
    shelf.preventDefault();    
    const { tmpShelf } = this.state;
    let newObj = {"prettyName":tmpShelf,"rawName":tmpShelf};
    this.setState((prevState) => ({
      shelves: [...prevState.shelves, newObj],
      showAddCatPage: true,
      tmpShelf: ""
    }));
  }

  shelfChange = (shelf) => {
    shelf.preventDefault();
    const { value } = shelf.target;
    this.setState({
        tmpShelf: value        
    });
  };

  render() {
    const { books, shelves, tmpShelf, page } = this.state;    
    if (shelves.length === 0 ) this.buildShelves();
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
          
         : page === 'addShelf' ? 
         <Route path='/addShelf' render={() => (
          <AddShelfPage 
              turnPage={this.turnPage} 
              shelves={shelves} 
              shelfDelete={this.shelfDelete}
              shelfAdd={this.shelfAdd}
              shelfChange={this.shelfChange}
              tmpShelf={tmpShelf}/> 
            )}
            />
          : page === 'addBook' ?
          <Route path='/addBook' render={() => (
            <AddBookPage turnPage={this.turnPage} books={books}/>
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
                           
            
              <div className="open-addCat">
                <Link to='/addShelf' className="addShelfBtn" onClick={() => this.setState({ page: 'addShelf' })}/>
              </div>
              
              <div className="open-addBook">
                <Link to='/addBook' className="addBookBtn" onClick={() => this.setState({ page: 'addBook' })}/>
              </div>
            </div>
        )}
        
      </div>
    )
  }
}

export default BooksApp