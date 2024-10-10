//전역변수 
let books = [];
//1. booksLoad() fetch -> book.json 
booksLoad()
function booksLoad() {
  fetch("books.json")
  .then(result => result.json())
  .then(result => {
    books.push(...result),
    makeTag()
  })
}

//2. click deleteBtn -> in array -> deleteAttribute -> call booksLoad()
document.querySelector('#list').addEventListener('click',function() {
  if(event.target.tagName=='BUTTON') {
    let idx = books.indexOf(event.target.closest('tr').children[2].innerHTML);
    books.splice(idx,1);
    makeTag();
  }
})
//3. makeTag() -> repeat array -> create tr tag 
function makeTag() {
  document.querySelector('#list').innerHTML = '';
  books.forEach(element => {
      document.querySelector('#list').insertAdjacentHTML('beforeend',layout(element))
    }   
  );
  document.querySelector('#totalPrice').innerHTML = totalSum();
}
function layout(element) {
  return `   <tr>
        <td><input type="checkbox"></td>
        <td>${element.no}</td>
        <td>${element.title}</td>
        <td>${element.writer}</td>
        <td class="price">${element.price}</td>
        <td><button>삭제</button></td>
      </tr>
    `
}
//4. 합계계산
function totalSum() {
  let totalSum = 0;
  books.forEach(book => {
    totalSum = Number(totalSum) + Number(book.price)
  })
  return totalSum
}
//5. 추가
document.querySelector('#btnAdd').addEventListener('click',function() {
  let no = document.querySelector('#no').value;
  let title = document.querySelector('#title').value;
  let writer = document.querySelector('#writer').value;
  let price = document.querySelector('#price').value;
  let addBook = new Object();
  addBook.no = no;
  addBook.title = title;
  addBook.writer = writer;
  addBook.price = Number(price);
  
  books.push(addBook);
  makeTag();
})