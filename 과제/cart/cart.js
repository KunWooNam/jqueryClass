let basket = {
  changePNum : function(){
    //부모안의 input태그의 value값을 1증가
    let various = "";
    let up = event.target.classList.contains("up"); //이벤트전파때문에 span이 아니라 아이콘이 눌려서 이벤트함수 실행되는거임
    let down = event.target.classList.contains("down");
    console.log(up + "," + down);
    if(up){
      various = "up";
    } else if(down){
      various = "down";
    }

    let input = event.target.closest("div").querySelector(".p_num")
    switch(various) {
      case "up": input.value++;
      break;
      case "down" : if(input.value < 1){
                    alert("음수입력불가합니다!")
                    break;
                    }
                    input.value--;
      break;
    }
    //수량, 금액합계 계산
    let price = event.target.closest(".subdiv").querySelector('input[name=p_price]').value; //closest로 사촌은 못찾아감, 예를들어 할배의 아들은 못찾음
    let count = event.target.closest("div").querySelector(".p_num").value
    let total = price * count;
    //합계 자리에 출력
    let totalCnt = event.target.closest(".subdiv").querySelector(".sum"); 
    totalCnt.innerHTML = total + "원";

    this.reCalc();
  },
  //합계 계산
  reCalc: function(){
    //합계금액 자리에 출력
    let checkboxes = document.querySelectorAll("input[name=buy]");
    let checked = [];
    checkes = Array.from(checkboxes);
    let totalCount = 
    console.log(checkboxes);

    let totalCountVal = document.querySelector("sum_p_num");
    let totalAmountVal = document.querySelector("#sum_p_price");
    
  }

}