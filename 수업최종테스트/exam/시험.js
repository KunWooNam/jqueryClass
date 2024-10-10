let books = []; //전역변수 : 

//1. booksLoad()
(
function booksLoad(){
  fetch("books.json")
  .then(result=> result.json())
  .then((result)=> {books.push(result),
                 makeTag(result)
  })  
})()

//2. makeTag()
function makeTag(Arr) {
  let tbody = document.querySelector("#list");
  
  for(book of Arr){
    let tag = `<tr>
              <td><input type="checkbox"></td>
              <td>${book.no}</td>
              <td>${book.title}</td>
              <td>${book.writer}</td>
              <td class="price">${book.price}</td>
              <td><button>삭제</button></td>
              </tr>`;
    tbody.insertAdjacentHTML("beforeend", tag);   
  }
  deleteRow();
  sumPrice();
}

//3. 삭제버튼
function deleteRow() {
  let deleteBtn = document.querySelector("tbody");
  deleteBtn.addEventListener("click", function(){
    let target = event.target;
    if(target.tagName == "BUTTON"){
      let no = target.closest("tr").querySelector("td:nth-child(2)").innerHTML;

      //console.log(books);

      books[0].forEach((obj,index) =>{
        if(obj.no == no){
          books[0].splice(index, 1)
          target.closest("tr").remove();
        }
      })
      //deleteBtn.innerHTML = " ";
      //makeTag(books); //모르겠습니다.
      
    }
    sumPrice();
  })
  
}

//4. 합계 계산 함수

function sumPrice(){
  let priceList = document.querySelectorAll(".price")
  let sum = 0;
  let totalPrice = document.querySelector("#totalPrice");
  for(price of priceList){
    sum += Number(price.innerHTML);
  }
  totalPrice.innerHTML = sum;
}

//5. 추가 버튼 -> 배열추가 및 makeTag()
let btn = document.querySelector("#btnAdd")
btn.addEventListener("click", () =>{
  let no = document.querySelector("#no");
  let title = document.querySelector("#title");
  let writer = document.querySelector("#writer");
  let price = document.querySelector("#price");
  let newOne = {};
  newOne.no = no.value;
  newOne.title = title.value;
  newOne.writer = writer.value;
  newOne.price = price.value;
  books[0].push(newOne);
  console.log(books);
  let tbody = document.querySelector("#list");
  let tag = `<tr>
              <td><input type="checkbox"></td>
              <td>${newOne.no}</td>
              <td>${newOne.title}</td>
              <td>${newOne.writer}</td>
              <td class="price">${newOne.price}</td>
              <td><button>삭제</button></td>
              </tr>`;
  tbody.insertAdjacentHTML("beforeend", tag);
  sumPrice();
})