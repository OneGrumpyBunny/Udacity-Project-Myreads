import React, { Component }  from 'react'

class Book extends Component {


    render() {
        const { bookIndex, handleShelfChange, book, currentShelfRaw, shelves } = this.props;
        // const theseShelves = [{"rawName":"currentlyReading","prettyName":"Currently Reading "},{"rawName":"wantToRead","prettyName":"Want To Read "},{"rawName":"read","prettyName":"Read "}]
        return(
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf} id={bookIndex} onChange={handleShelfChange} >
                    <option value="move" disabled>Move to...</option>
                    {shelves.map((shelf) => (                        
                        <option key={shelf.rawName} value={shelf.rawName}>{shelf.prettyName}</option>
                    ))}
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.map((author) => (<span key={author}>{author}<br/></span>))}
                </div>
            </div>
        )
    }
}

export default Book;
