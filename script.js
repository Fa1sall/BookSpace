const myLibrary = [];

function Book(name,author,pages){
  this.name = name;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(){
  const name = prompt("Enter name of the book:");
  const author = prompt("Enter author name:");
  const pages = prompt("Enter number of pages: ");
  const book = new Book(name,author,pages);
  myLibrary.push(book);
}


