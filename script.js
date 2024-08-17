const myLibrary = [
  {
    name: 'harry potter',
    author: 'j.k. rowling',
    pages: 250,
    readStatus: true
  },
  {
    name: 'it ends with us',
    author: 'colleen hoover',
    pages: 300,
    readStatus: false
  },
  {
    name: 'Wings of fire',
    author: 'abdul kalam',
    pages: 150,
    readStatus: false
  }
];

function Book(name,author,pages,readStatus){
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(){
  const name = prompt("Enter name of the book:");
  const author = prompt("Enter author name:");
  const pages = prompt("Enter number of pages: ");
  const readStatus = false;
  const book = new Book(name,author,pages,readStatus);
  myLibrary.push(book);
}



function createBook(book){
  const booksGrid = document.getElementById('books-grid');
  //Creating DOM Variables
  const bookCard = document.createElement('div');
  const bookName = document.createElement('h1');
  const authorName = document.createElement('p');
  const controls = document.createElement('div');
  const ctrlbutton = document.createElement('button');
  const removeImg = document.createElement('img');
  const pages = document.createElement('div');
  const readSection = document.createElement('div');
  const readToggle = document.createElement('input');
  const readText = document.createElement('div');

  //Adding Classes
  bookCard.classList.add('book');
  bookName.classList.add('book-name');
  authorName.classList.add('author-name');
  controls.classList.add('controls');
  ctrlbutton.classList.add('ctrl-button');
  pages.classList.add('pages');
  readSection.classList.add('read-section');
  readToggle.classList.add('read-toggle');
  readText.classList.add('readStatus');

  //Adding Content
  bookName.textContent = book.name;
  authorName.textContent = book.author;
  removeImg.src="./assets/delete.svg";
  pages.textContent = 'Pages: ' + book.pages;
  readToggle.setAttribute("type", "checkbox");
  readText.textContent = book.readStatus;

  //Appending Child Elements
  readSection.appendChild(readToggle);
  readSection.appendChild(readText);
  ctrlbutton.appendChild(removeImg);
  controls.appendChild(ctrlbutton);
  controls.appendChild(pages);
  controls.appendChild(readSection);
  bookCard.appendChild(bookName);
  bookCard.appendChild(authorName);
  bookCard.appendChild(controls);

  booksGrid.appendChild(bookCard);
}

function displayBooks(){
  for(i=0;i<myLibrary.length;i++){
    createBook(myLibrary[i]);
  }
}

displayBooks();

function toggleOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = (overlay.style.display === 'block') ? 'none' : 'block';
}