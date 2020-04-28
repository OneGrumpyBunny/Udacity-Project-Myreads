import React, { Component } from 'react';

class searchPage extends Component {
    render() {
    const { turnPage } = this.props;
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={turnPage}>Close</button>
              <div className="search-books-input-wrapper">                
                <input type="text" placeholder="Type new book name"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
}

export default searchPage;