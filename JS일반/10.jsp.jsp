<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import = "java.io.*,java.util.*,java.sql.*"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c"%>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/sql" prefix = "sql"%>

<html>
   <head>
      <title>exam1</title>
      <style>
      	th { min-width: 130px;}
      </style>
     <!-- <script src="./scripts/jquery-3.2.1.min.js"></script>  -->
      <script>    
        var price = {'g1': 500, 'g2':100, 'g3':1000};
        
        document.addEventListener("DOMContentLoaded", function(){
        	//상품 선택시 단가 입력 및 체크 상태 변경
	        let tb = document.querySelector("table");
	        tb.addEventListener("change", function(){
	        	if(event.target.tagName == 'SELECT'){
	        		let sel = event.target;
		        	//단가출력
		        	let price2 = sel.value; //
		        	let tr = sel.closest('tr');
		        	let priceOut =  sel.closest("tr").children[4]; //
		        	priceOut.innerHTML = price[price2]; 
		        	//체크박스 체크 / .setAttribute('checked', 'checked')
		        	
		        	let tdCnt = tr.children[4]
		        	let checkBox = tr.querySelector('input[name="selId"]')
		        	//이 밑으로배꼈음 
		        	if(price2 == ""){
		        		tdCnt.innerText = " ";
		        		//checkBox.checked = false; //dom 객체의 property 변경
		        		checkBox.removeAttribute('checked'); // html 태그의 속성 변경
		        		//sel.closest("tr").children[0].children[0].property('checked' , true)
		        	} else {
		        		tdCnt.innerText = price[sel.value]; //price['g-1'] , price.g-1 
		        		//checkBox.checked = true;
		        		checkBox.setAttribute("checked","checked");
		        		
		        	}
	        	}
	        })
        })
		/*
		- propertiy : DOM 속성 / .연산자로 접근 / 객체타입도 지정할 수 있음 / element.className = 'value'
		- attribute : HTML tag 속성 / setAttribute() 함수로 접근 / 스트링값만 지정할 수 있음 / element.setAttribute('class', 'value')
		*/
        
        
      	function makeData(){
      		let list = [];
      		
			//체크한 행만 전송할 데이터 만들기.
      		let checked = document.getElementsByName('selId'); 
			
			
      		//반복문 -체크박스의 tr 조상의 두번째 td 태그의 값을 list 배열에 push
			for(let item of checked){
				if(item.checked == true){
					let tds = item.closest("tr").children
					let empid = tds[1].innerText;
					let cnt = tds[5].children[0].value;
				  		//let cnt = tds[5].querySelector('input[name="cnt"]').value; 도 가능
					let ename= tds[2].innerText.split(" ")[0];
					let product = tds[3].children[0].value
				 		 //let product = tds[3].querySelector('select[name="goods"].value')도 가능
					list.push({empid,cnt,ename,product});
				}
			}
			console.log(list);
      	}
      </script>
   </head>

   <body>
	<!-- 데이터조회 시작 -->
      <sql:setDataSource var = "snapshot" driver = "oracle.jdbc.OracleDriver"
         url = "jdbc:oracle:thin:@localhost:1521:xe"
         user = "hr"  password = "hr"/>

         <sql:query dataSource = "${snapshot}" var = "result">
            SELECT e.*, round(salary*commission_pct, 2) as commission, d.department_name 
              FROM Employees e, departments d 
             WHERE e.department_id =d.department_id 
             ORDER BY first_name  
         </sql:query>
	<!-- 데이터조회 끝--> 
	
      <button type="button" id="" onclick="makeData()">상품신청</button>
      <!-- 목록 시작  -->
      <table border = "1" style="width:40%">
         <tr>
         	<th><input type="checkbox" id="chkAll"></th>
            <th>사번</th>
            <th>이름</th>
            <th>상품</th>
            <th>단가</th>            
            <th>수량</th>
            <th>합계</th>
         </tr>
         
         <c:forEach var = "row" items = "${result.rows}"> 
            <tr>
               <td align="center"><input type="checkbox" name="selId"></td>
               <td align="center"><c:out value = "${row.employee_id}"/></td>
               <td><c:out value = "${row.first_name} ${row.last_name}"/></td>
               <td align="center"><select name="goods"><option value="">선택</option>
                                 <option value="g1">상품1</option>
                                 <option value="g2">상품2</option>
                                 <option value="g3">상품3</option></select></td>
               <td align="right"></td>
               <td align="right"><input type="text" name="cnt"></td>
               <td></td>
            </tr>
         </c:forEach>
      </table>
      <!-- 목록 끝  -->
   </body>
</html>