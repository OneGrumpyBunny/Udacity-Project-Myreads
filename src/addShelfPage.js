import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class searchPage extends Component {
  state = {
    toggleButton: false
  }
  
  
  toggleButton=(e) => {
    const { value } = e.target;
    const { shelfChange } = this.props;

    this.setState(() => ({
      toggleButton: (value === "") ? false : true
    }));

    shelfChange(e);

  }

    render() {
    const { turnPage, shelves, shelfDelete, shelfAdd, tmpShelf} = this.props;
    const { toggleButton } = this.state;
    const shelfList = shelves.map((shelf, index) => (
    <li key={shelf.rawName}><span>{shelf.prettyName}</span>
      {index <= 2 ? <button className="shelf-list-disabled" title="Cannot remove" disabled/> : <button value={shelf.prettyName} onClick={shelfDelete}>Remove</button>}
      </li>
    ));
        return(
            <div className="search-books">
              <form onSubmit={shelfAdd}>
                <div className="add-shelf-bar">
                  <Link to='/' className="close-search" onClick={turnPage}/>
                    <div className="add-shelf-input-wrapper">                
                      <input type="text" onChange={this.toggleButton} value={tmpShelf} placeholder="Type new shelf name"/>
                    </div>
                    {toggleButton && <button className="add-shelf-save">Add Shelf</button>}
                </div>
                <div className="add-shelf-results">
                  <ol className="shelf-list">{shelfList}</ol>
                </div>
              </form>
          </div>
        )
    }
}

export default searchPage;