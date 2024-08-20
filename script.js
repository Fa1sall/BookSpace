const myLibrary = [
  {
    name: `Harry Potter and the philosopher's stone`,
    author: 'J.K. Rowling',
    pages: 250,
    readStatus: true,
    bookurl: "https://i2-prod.walesonline.co.uk/incoming/article6890072.ece/ALTERNATES/s615b/hp1.jpg",
  },
  {
    name: 'It Ends With Us',
    author: 'Colleen Hoover',
    pages: 381,
    readStatus: false,
    bookurl: "https://th.bing.com/th/id/OIP.QEXFbbWxQDT9BPUDq3qC_gAAAA?rs=1&pid=ImgDetMain",
  },
  {
    name: 'The Perks of Being a WallFlower',
    author: 'Stephen Chbosky',
    pages: 150,
    readStatus: false,
    bookurl: "https://th.bing.com/th/id/OIP.R9b1ML6HlpWfNlXX6Iq9tAAAAA?rs=1&pid=ImgDetMain",
  }
];

indexCounter = 0;
function generateIndex(){
  return indexCounter++;
}

function Book(name,author,pages,readStatus,bookurl){
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.bookurl = bookurl;
}

function addBookToLibrary(book){
  myLibrary.push(book);
}

const booksGrid = document.getElementById('books-grid');
function createBookCard(book){
  //Creating DOM Variables
  const bookCard = document.createElement('div');
  const bookName = document.createElement('h1');
  const authorName = document.createElement('p');
  const bookCover = document.createElement('img');
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
  bookCover.classList.add('book-cover');
  controls.classList.add('controls');
  ctrlbutton.classList.add('ctrl-button');
  pages.classList.add('pages');
  readSection.classList.add('read-section');
  readToggle.classList.add('read-toggle');
  readText.classList.add('readStatus');

  //Adding Content
  bookName.textContent = book.name;
  authorName.textContent = book.author;
  bookCover.src = book.bookurl;
  removeImg.src="./assets/delete.svg";
  pages.textContent = 'Pages: ' + book.pages;
  readToggle.setAttribute("type", "checkbox");

  //Adding BookID Data Attribute
  const bookIndex = generateIndex();
  bookCard.dataset.bookId = bookIndex;
  ctrlbutton.dataset.bookId = bookIndex;
  
  //Checkbox Toggle Logic
  if(book.readStatus==false){
    readText.textContent = 'Unread';
    readToggle.checked=false;
  } else {
    readText.textContent = 'Read';
    readToggle.checked=true;
  }

  readToggle.addEventListener('click',()=>{
    if(readToggle.checked==true){
      book.readStatus=true;
      readText.textContent = 'Read';
    } else {
      book.readStatus=false;
      readText.textContent = 'Unread';
    }
   });

  //Appending Child Elements
  readSection.appendChild(readToggle);
  readSection.appendChild(readText);
  ctrlbutton.appendChild(removeImg);
  controls.appendChild(ctrlbutton);
  controls.appendChild(pages);
  controls.appendChild(readSection);
  bookCard.appendChild(bookName);
  bookCard.appendChild(bookCover);
  bookCard.appendChild(authorName);

  bookCard.appendChild(controls);

  //Appending Book Card to Grid
  booksGrid.appendChild(bookCard);
  updateBookId();

  //Event listener to remove Book 
  ctrlbutton.addEventListener('click',function removeBook(){
    //Remove book from Library array
    myLibrary.splice(Number(bookCard.dataset.bookId),1);
    console.log(`book-${Number(bookCard.dataset.bookId)} removed`);

    //Remove book from DOM
    const targetBook = document.querySelector(`div[data-book-id="${bookIndex}"]`);
    if(targetBook){
      targetBook.remove();
    }

    for(book of myLibrary){
      console.log(book);
    }
    updateBookId();
    createBooks(myLibrary,0);
  });
}

//Update bookId Data Attribute
function updateBookId(){
  const books = document.querySelectorAll('div[data-book-id]');
  const buttons = document.querySelectorAll('button[data-book-id]');
  indexBooks = 0;
  indexButtons = 0;
  for(x of books){
    x.dataset.bookId = indexBooks;
    indexBooks++;
  }
  for(x of buttons){
    x.dataset.bookId = indexButtons;
    indexButtons++;
  }
}

function createBooks(myLibrary,index){
  booksGrid.innerHTML='';
  for(i=index;i<myLibrary.length;i++){
    createBookCard(myLibrary[i]);
  }
}

createBooks(myLibrary,0); //Initial Display
console.log('Library Initialized');

/////////////////////////////
/// Dialog Box Functions////
///////////////////////////
const dialogBox = document.getElementById('bookDialog');
const bookForm = document.getElementById('bookForm');
const cancelBtn = document.getElementById('cancel-btn'); 

//Toggle Dialogbox
function toggleDialog(){
  dialogBox.showModal();
}

//Close Dialogbox & Reset Form
cancelBtn.addEventListener('click',e=>{
  e.preventDefault();
  dialogBox.close();
  bookForm.reset();
});

//Close on click on the outside
dialogBox.addEventListener("click", e => {
  const dialogDimensions = dialogBox.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialogBox.close();
  }
})

//Form Submission Handling
bookForm.addEventListener('submit', function(event) {
  event.preventDefault(); //prevent default http send request & refresh
  
  //Form Data
  const bookName = document.getElementById('bookName').value;
  const authorName = document.getElementById('authorName').value;
  const pages = document.getElementById('pages').value;
  const bookUrl = document.getElementById('book-url');
  const urlValue = (bookUrl.value=="") ? './assets/sample-book.png': bookUrl.value;
  const isRead = document.getElementById('readStatus').checked;

  //Creating New Book
  const book = new Book(bookName,authorName,pages,isRead,urlValue);
  addBookToLibrary(book);

  //Display added books
  createBooks(myLibrary,0);

  console.log(JSON.stringify(book));
  
  dialogBox.close();
  bookForm.reset();
});

