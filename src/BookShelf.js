import React, { Component } from 'react';
import Book from './Book';

/*  allowAnonLogging: true
    authors: ["William E. Shotts, Jr."]
    averageRating: 4
    categories: ["COMPUTERS"]
    description: "You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus: file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. In addition to that practical knowledge, author William Shotts reveals the philosophy behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. As you make your way through the book's short, easily-digestible chapters, you'll learn how to: * Create and delete files, directories, and symlinks * Administer your system, including networking, package installation, and process management * Use standard input and output, redirection, and pipelines * Edit files with Vi, the world’s most popular text editor * Write shell scripts to automate common or boring tasks * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial "shell shock," you'll find that the command line is a natural and expressive way to communicate with your computer. Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's "Evolution of a SysAdmin""
    id: "nggnmAEACAAJ"
    imageLinks: {
        smallThumbnail: "http://books.google.com/books/content?id=nggnmAEAC…J&printsec=frontcover&img=1&zoom=5&source=gbs_api", 
        thumbnail: "http://books.google.com/books/content?id=nggnmAEAC…J&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    }
    
    industryIdentifiers: Array(2)
        [0: {
                identifier: "1786462494"
                type: "ISBN_10"
            }
        ,
        1:  {
                identifier: "9781786462497"
                type: "ISBN_13"
            }
        ]

    infoLink: "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api"
    pageCount: 480
    previewLink: "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api"
    printType: "BOOK"
    publishedDate: "2012"
    publisher: "No Starch Press"
    ratingsCount: 2
    shelf: "currentlyReading"
    subtitle: "A Complete Introduction"
    title: "The Linux Command Line"
    */

class BookShelf extends Component {
    render() {
    const { handleShelfChange, currentShelfRaw, books, currentShelfPretty, shelves  } = this.props;
    const numBooks = books.filter((b) => b.shelf === currentShelfRaw);
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">{currentShelfPretty}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {numBooks.length > 0 
                    ? books.map((book) => (
                        book.shelf === currentShelfRaw && 
                        <li key = {book.id}>
                            <Book     
                                bookIndex = {book.id}                       
                                book = {book}
                                shelves = {shelves}
                                handleShelfChange = {handleShelfChange}
                            />
                        </li>
                    ))
                : <p>No books returned</p>
                }      
                </ol>
                </div>
            </div>
        )        
    }
}
export default BookShelf;