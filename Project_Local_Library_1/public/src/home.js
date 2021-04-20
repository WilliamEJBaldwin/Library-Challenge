const {findAuthorById} = require('./books');

function getTotalBooksCount(books) {
  //Counts and returns the total books.
 
  return books.length;
};


function getTotalAccountsCount(accounts) {
  //Counts and returns the total accounts.

  return accounts.length;
};


function getBooksBorrowedCount(books) {
  //Counts and returns the total books currently lent out.
 
  let counter = 0;
    books.forEach((book) => {
      let lent = book.borrows[0].returned;
      if (!lent) counter ++;
      })
      return counter;
};


function sortHelper(objectToBeFormatted){
  /*Takes in an object and format it to satisfy
    the last three functions desired format.*/
 
    const keys = Object.keys(objectToBeFormatted);
    const sortedKeys = keys.sort((itemA, itemB) => {
      if(objectToBeFormatted[itemA] > objectToBeFormatted[itemB]) {
        return -1
      } else if (objectToBeFormatted[itemA] < objectToBeFormatted[itemB]) {
        return 1;
      } else {
        return 0;
      }
  });
  return sortedKeys;
}


function objectMaker(name, count) {
  //Helps format to the desired result.

  return {
    name: name,
    count: count
  }
};


function getMostCommonGenres(books) {
  /*Goes through the booklist and tallies genres and returns an array
    of 5 or less objects. Each object has 2 keys: name and count*/
  //Check each book's genre.
  let counter = books.reduce((book, {genre}) => {
    //If the genre is new, add it and start it's count at 1. Otherwise, add 1.
    (book[genre]) ? book[genre] += 1 : book[genre] = 1
    //Return the function output stored in book.
    return book
  }, {});
  //Sort the object with our helper function.  
  var sorted = sortHelper(counter);
  //Return the top 5 genres formatted as expected.
  return sorted.map((name) =>
    ({name, count: counter[name]})).slice(0, 5);
}
 

function getMostPopularBooks(books) {
  /*Return a sorted array of up to 5 books that have been 
  borrowed the most times*/
 
  //Set an array for the top books.
  const topBooks = [];
  //Go through all the books.
  books.forEach((book) => {
    //Set a count variable for the number of borrows.
    const borrowCount = book.borrows.length;
    //Create the formatted object and push into the array.
    topBooks.push(objectMaker(book.title, borrowCount));
  });
  //Sort because our sort helper doesn't want arrays!
  topBooks.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  //Create the top 5 and return it in the format desired.
  return topBooks.slice(0,5);
}


function getMostPopularAuthors(books, authors) {
  /*Search the books for the most popular authors and return an
  array of author names and count of number of time borrowed */
  
  //Set a variable for the final solution.
  var topAuthors = [];
  //Set up a forEach loop to go through all books.
  books.forEach((book) => {
    //Set a variable to get the author's name through findAuthorById function.
    let authorObj = findAuthorById(authors, book.authorId);
    //Format the author's name to the desired output.
    let authorName = `${authorObj.name.first} ${authorObj.name.last}`
    //Get the number of borrows through .length and assign it to a variable.
    borrowCount = book.borrows.length;
    //Set a default of false in case the author is not listed.
    let authorCheck = false;
    //Check to see if the author is already added.
    topAuthors.forEach((author) => {
    console.log (author.name)
      if (author.name === authorName) {
      //If author is added, increase the borrowCount.
      author.count += borrowCount;
      console.log(author.count)
      //And mark the check as true.
      authorCheck = true;
      //And return from the forEach author loop.
      return;
      }
    });
    //If the author is not listed, add the formatted author information.
    if (!authorCheck) {
      topAuthors.push(
      objectMaker(authorName, borrowCount)
        );
    };
  });
  /*Sort by the top authors. My sort helper doesn't take arrays and 
    I couldn't figure out how to get the correct object for it!*/
  topAuthors.sort((authorA, authorB) =>
  (authorA.count > authorB.count ? -1 : 1));
  //Keep only the top 5 authors and return them.
  return topAuthors.slice(0, 5);   
};


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  sortHelper,
  objectMaker,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
