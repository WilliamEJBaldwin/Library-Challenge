const { findBookById } = require("./books");

function findAccountById(accounts, id) {
  /*Take in the list of all accounts and find the
    account object that has the id parameter that 
    matches, and return that account.*/ 

    const correctAccount = accounts.find((account) => account.id === id); {
    return correctAccount
  } 
}


function sortAccountsByLastName(accounts) {
  //Take in the accounts and sort them by last name.

  return accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last.toLowerCase();
    const lastNameB = accountB.name.last.toLowerCase();
    return lastNameA > lastNameB ? 1 : -1;
  });
}


function getTotalNumberOfBorrows(account, books) {
  /*/Matches book borrower's ids to account id then adds up
     the borrows of the account id and returns that number.*/
  
let accumulator = 0;
  return books.reduce((total, book) => {
    let borrowed = 0;
    total += book.borrows.reduce((borrows, borrow) =>
    borrows += borrow.id === account.id ? 1 : 0, borrowed);
    return total;
  },accumulator)
}  
  

function getBooksPossessedByAccount(account, books, authors) {
  /*Checks one account id and returns all the book objects
    with author objects inserted in them that are 
    not returned by that account holder*/
 
  let borrower = account.id;
  let borrowedList = books.filter((book) => book.borrows[0].id === borrower);
    return borrowedList.map((borrow) => {
      author = authors.find ((author) => author.id === borrow.authorId);
        return {
         id: borrow.id,
         title: borrow.title,
         genre: borrow.genre,
         authorId: borrow.authorId,
         author: author,
         borrows: borrow.borrows
      }; 
    });
};
  



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
