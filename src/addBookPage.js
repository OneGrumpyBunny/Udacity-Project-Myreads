import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class searchPage extends Component {
  state = {
    toggleButton: false
  }

  toggleButton=(e) => {
    const { value } = e.target;
    this.setState(() => ({
      toggleButton: (value === "") ? false : true
    }));
  }

    render() {
    const { turnPage } = this.props;
    const { toggleButton } = this.state;
        return(
            <div className="search-books">
            <div className="add-shelf-bar">
                  <Link to='/' className="close-search" onClick={turnPage}/>
              <div className="add-shelf-input-wrapper">                
                <input type="text" onChange={this.toggleButton} placeholder="Type new book name"/>
              </div>
              {toggleButton && <button class="add-shelf-save">Add Book</button>}
            </div>
            <div className="add-shelf-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
}

export default searchPage;