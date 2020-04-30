import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';

class searchPage extends Component {
  state = {
    query: ''
  }
    
  clearQuery = () => {
    this.updateQuery('')
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  render() {      
    const { query } = this.state;
    const { books, turnPage, handleShelfChange, shelves } = this.props;
    const showingBooks = query === ''
    ? books
    : books.filter((book) => (
        book.title.toLowerCase().includes(query.toLowerCase())
    ))

      return(
          <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search" onClick={turnPage}/>
            {/* <button className="close-search" onClick={turnPage}>Close</button> */}
            <div className="search-books-input-wrapper">                
              <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
            </div>
          </div>
          
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                  {query.length > 0 && shelves.map((shelf) => (  // iterate through shelves
                    <BookShelf 
                      key={shelf.rawName}  
                      currentShelfRaw={shelf.rawName}                            
                      books={showingBooks}
                      currentShelfPretty={shelf.prettyName}
                      shelves={shelves}
                      handleShelfChange={handleShelfChange}/>                
                  ))}
              </div>
            </div>
        </div>
        
      )
    }
}

export default searchPage;
//           <div className="search-books-results">
//             <ol className="books-grid">
//             {query.length > 0 && showingBooks.map((book) => (
                    
//                   <li key = {book.id}>
//                   <Book     
//                       bookIndex = {book.id}                       
//                       book = {book}
//                       shelves = {shelves}
//                       handleShelfChange = {handleShelfChange}
//                   />
//               </li>
//               ))}
//             </ol>
//           </div>