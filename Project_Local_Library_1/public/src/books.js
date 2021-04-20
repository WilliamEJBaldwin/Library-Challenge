const { findAccountById } = require("./accounts")

function findAuthorById(authors, id) {
  //Takes in one author's id and all authors. Returns the correct author's object.
 
  return authors.find((author) => author.id === id)
}


function findBookById(books, id) {
  //Looks through the array of books and returns the id of a single book.
 
  return books.find((book) => book.id ===id)
}


function partitionBooksByBorrowedStatus(books) {
  /*Return an array that contains 2 arrays: books that are out
   and books that are returned.*/
  
  let outbooks = books.filter((book) => !book.borrows[0].returned)
  let inbooks = books.filter((book) => book.borrows[0].returned)
  return [outbooks, inbooks]
}


function getBorrowersForBook(book, accounts) {
  /*Search the given book's transaction history and list the account
  in an array.*/ 
  
  let lentHistory = book.borrows.map((borrow) => {
  let totalAccounts = accounts.find((account) => account.id === borrow.id); 
    return {
      id: borrow.id,
      returned: borrow.returned,
      ...totalAccounts
    }
  }) 
  
  if (lentHistory.length > 10) {
    lentHistory.pop();
  }
  return lentHistory;
}
 


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
