멱등성: 모든 접속자에게 동일하게 서비스됨

# JavaScript

- 1996년에 brendan Eich가 제작하여 발표한 Script언어
- C언어로 만들어진 언어
- Web browser에서 JavaScript Engine을 사용하여 실행되는 언어
- inline, embed, external file 방식 3가지로 사용
- 동적 데이터형/동적할당 ( 값이 할당될 때 변수의 데이터형이 설정되는 것 )
- JavaScript를 기반으로한 다양한 library들이 제공 ( JQuery Angular.js, Node.js, View.js, React 등 )

- inline: 태그에 직접 정의하여 사용하는 방식

  ```javascript
  <태그명 onXXX="javascript코드">
  ```

- embed: HTML `<head>`태그의 자식태그로 등록

  ```html
  <head>
    <script type="text/javascript">
      javascript code
    </script>
  </head>
  ```

- external file 방식

  확장자는 .js

  필요한 HTML에서 `<script src="xxx.js" type="text/javascript"></script>`

- 작성방법, 변수, 연산자, 제어문, function, JavaScript 객체들, HTML, Form Control 처리, closure, prototype

### 코딩 주의

- 대소문자를 구분
- 괄호는 짝으로
- ;은 생략할 수 있다.

### 출력

```javascript
//HTML <body> 태그 출력: 이전의 <body> 내용을 삭제하고 출력
document.write(출력할 내용);
//경고창 출력: 코드의 실행을 멈춤
alert(출력내용);
//console 출력 (debug 시)
console.log(출력내용);

```

### Variable

- 필요한 값을 일시적으로 저장하기 위해

- 가독성 향상

- 데이터형을 개발자가 설정할 수 없다.(값 할당 시에 데이터형이 설정된다)

- 지역변수와 전역변수가 지원 -> 변수 작성하는 문법 구분

  ```javascript
  지역변수
  1. 선언)
  	var 변수명; 변수를 재선언, 값 재할당
  	let 변수명; 변수를 재선언 할 수 없다. 값 재할당 가능
  	const 변수명; 변수를 재선언 할 ㅜ 없다. 값을 재할당 할 수 없다.( 배열, new 생성하는 변수 예외적 가능 )
  2. 값할당 (데이터형이 결정됨)
  	변수명 = 값;
  3. 값 사용
  	출력, 연산, 재할당

  ```

  ```javascript
  전역변수
  1. 선언): var를 사용하지 않고 변수를 선언하면서 값 할당
  	변수명 = 값;
  위치에 따라서 var를 붙여서 선언해도 전역변수로 사용할 수 있다.

  ```

### 변수에 할당할 수 있는 값의 종류

- 문자가 없음

  ```javascript
  //String
  var a = "문자열...";
  var a = "문자열...";
  ```

- 숫자는 정수, 실수를 모두 포함한다

  ```javascript
  //Number
  a = 6;
  a = 6.4;
  ```

### 연산자

- 최단산쉬 관리 삼대 콤마

  1. 단항

     ~ ! + - \*

     ~ : 1의 보수연산

     ! : not

  2. 산술

  3. 쉬프트 `<<` ` >>` `>>>`

  4. 관계 `<` `>` `<=` `>=` `==` `===` `!=` `!==`

     `==`: 값이 같은지 비교

     `===`: 값과 데이터형이 모두 같은지 비교

  5. 논리

     여러개의 관계연산자를 묶을때

     - 일반 논리

       && : 모두 참일 때 참

       ||: 모두 거짓일 때 거짓

     - 비트 논리

       & | ^

  6. 삼항

  7. 대입

### 제어문

- 프로그램의 순차적인 흐름을 변경해줄 수 있는 문장

  #### 조건문

  - if 다중if
  - if~ else
  - switch~ case: 값이 같은지 비교하여 실행할 때

  ```javascript
  switch(){
         case 상수:수행문장들; break;
         case 상수:
         default: 일치하는 상수가 없을때 수행할 문장들;
         }
  ```

  #### 반복문

  - for문: 시작과 끝을 알 때

    ```javascript
    for(var i=0;~~){
    }
    ```

  - while문: 시작과 끝을 모를 때

    - do ~ while문:
    - break;
    - continue;

#### javascript의 proposal 기능사용하기 위한 plugin: Tern

## Array

- 일괄처리에 사용

- 일차원 배열만 지원

- 가변길이형( 값을 추가하면 방의 갯수가 증가한다. )

  ```javascript
  1. 배열생성
  var 배열명=new Array();
  2. 값할당
  배열명[인덱스]=값;
  3. 방의  개수
  배열명.length
  4. 값얻기
  배열명[인덱스]
  모든 방의 값 출력
  for(let i = 0;i<배열명.length;i++){
      배열명[i];
  }
  배열의 초기화
  let 배열명=[값,,,];
  ```

### 함수 ( function )

- 일을 구분하여 만들 때

- 중복코드를 최소화

- 호출하여 사용한다. ( 사용자 동작에 의해 )

  ```javascript
  function 함수명(매개변수,,,){
      코드작성

      return 값;
  }
  ```

- 호출 다른함수 호출: `함수명(값,,,);`

| 동작                                        | 속성                         | 주적용태그                                        | 사용예                                                                                                                                                                                         |
| ------------------------------------------- | ---------------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 클릭                                        | onclick                      | `<input type="button">` <br/>`<img>` <br/>`<td>`  | `<input type="button"onclick="함수명(값,,,)">`                                                                                                                                                 |
| body 로딩                                   | onload                       | `<body>`                                          | `<body onload="함수명(값,,,)">`                                                                                                                                                                |
| 마우스포인터가 <br/>특정위치에 들어갔을 때  | onmouseover<br/>onmouseenter | 모든 태그                                         | `<img onmouseover="함수명(값,,,)">`                                                                                                                                                            |
| 마우스포인터가 <br/>특정 위치에서 나갔을 때 | onmouseout                   | 모든 태그                                         | `<img onmouseout="함수명(값,,,)">`                                                                                                                                                             |
| 포인터가 <br/>움직였을 때                   | onmousemove                  | 모든 태그                                         | `<img onmousemove="함수명(값,,,)">`                                                                                                                                                            |
| 키가 눌릴 때                                | onkeydown                    | `<input type="text, password">` <br/>`<textarea>` | `<input type="text" onkeydown="함수명(값,,,)">`                                                                                                                                                |
| 키가 올라올 때                              | onkeyup                      | `<input type="text, password">`<br/> `<textarea>` | `<input type="text" onkeyup="함수명(값,,,)">`                                                                                                                                                  |
| 값이 변경될 때                              | onchange                     | `<select>`<br/> `<input type="text, password">`   | `<select onchange="함수명(값,,,)">`: 다른 옵션이 선택되었을 때 함수가 호출<br> `<input type="text" onchange="함수명(값,,,)">`: 커서가 들어갔을 때의 값과 커서가 나갔을 때의 값이 다르다면 호출 |
| 커서가 <br/>빠져나갔을 때                   | onblur                       | 커서를 가지는 모든 태그                           | `<input type="text" onblur="함수명(값,,,)">`                                                                                                                                                   |
| 더블클릭                                    | ondblclick                   | 모든 클릭                                         | `<input type="button" ondblclick="함수명(값,,,)">`                                                                                                                                             |

### 이차원 배열

- 일차원 배열 방안에 일차원 배열이 정의

  ```javascript
  //작성법)
  //1. 일차원 배열 생성
  	var arr2=new Array();
  //2. 일차원 배열 방에 일차원 배열 생성
  	arr[0]=new Array();
  	arr[1]=new Array();
  	arr[2]=new Array();
  	arr[3]=new Array();
  //3. 값 할당
  	배열명[바깥배열 인덱스][안쪽배열인덱스] = 값;
  	arr[0][0]=10;
  	arr[0][1]=20;
  	arr[0][2]=30;
  	arr[0][3]=40;


  ```

### 내장함수

```javascript
//수학함수
Math.round(실수); //반올림
Math.ceil(실수); //올림
Math.floor(실수); //내림
parseInt(값); //문자열,실수 -> 정수
Math.random(); //난수 0.000000...1~ 0.999999999 중 하나
Math.abs(); //절댓값 음수 -> 양수
```

```javascript
//문자열 함수
문자열변수.toUpperCase()//대문자로
문자열변수.toLowerCase()//소문자로
문자열.length//길이 함수가 아니므로 ()를 붙이지 않는다.
문자열.indexOf(찾을 문자열);//문자열의 인덱스
문자열.charAt(인덱스)//특정 인덱스의 문자
자를 문자열.substring(시작인덱스, 보고싶은 문자 끝인덱스+1)//문자열 자르기
문자열.replace(찾을문자,바꿀문자); //문자열 찾아서 바꾸기
문자열.trim(); //앞뒤공백제거
문자열.concat("붙일문자열");//문자열 붙이기
자를문자열.split('기준');//문자열 잘라서 배열에 넣기
```

### 날짜정보얻기

- 객체를 생성 ( Date )
- 접속자 컴퓨터의 날짜 정보가 얻어진다. ( 동일날짜 x )

```javascript
//1. 생성
var date = new Date();
//2. 함수 호출
//년:
date.getFullYear();
date.getYear() + 1900;
//월:
date.getMonth() + 1; //0월부터 나옴으로 +1을 해주어야한다.
//일
date.getDate();
//시
date.getHour();
//분
date.getMinute();
```

## HTML Form Control의 값 받기

HTML Form Control: 사용자가 입력한 값을 받기위한 HTML

- id 로 받기 (form 태그가 없어도 된다.)

  - id만 존재하는 경우에는 back-end로 값이 전달되지 않는다.

  ```html
  //1. Form Control에 id를 부여
  <input type="text" id="name" />
  //2. script에서 id에 해당하는 control얻기
  <script type="text/javascript">
    function test() {
      //2-1. id에 해당하는 Control얻기
      var input = document.getElementById("id명");
      //2-2. 얻어낸 HTML Form Control에서 값 얻기(value속성 사용)
      var val = 변수명.value(); //사용자가 입력한 값
    }
  </script>
  ```

- `<form>`태그 사용

  1. form 태그에 name 설정

     ```php+HTML
     <form name = "frm">
     ```

  2. control에 name 설정

     ```php+HTML
     <input type="text" name="name">
     .
     .
     </form>
     ```

  3. javascript에서 값을 얻는다.

     3-1. form태그를 name 속성을 사용하여 얻는다.

     ```javascript
     var obj = window.document.form이름;
     ```

     3-2. 얻어진 form객체를 사용하여 Control에 접근

     ```javascript
     obj.접근할 control명;
     obj.name;
     obj.id;
     ```

     3-3. 값얻기

     - 이름 속성이 유일할 때 `폼 이름.control이름.value;`

     - 이름 속성이 중복될 때 ( 배열 ) `폼이름.control이름[인덱스].value;`

       - 인덱스는 control이 정의된 순서

  - radio, checkbox 는 사용자가 확인한 값만 얻는다.
    - 폼이름.control명[인덱스].checked -> true/false
  - select는 사용자가 선택한 값만 얻는다.
    - 선택한 옵션의 인덱스 얻기
      - 폼이름.control명.selectedIndex
    - 옵션이 선택된 상태인지?
      - 폼이름.control명[인덱스].selected

#### div에 HTML을 설정

- 동적으로 화면 변경

  ```javascript
  //1. div 얻기(div 속성)
  var divNode=document.getElementById("id명");
  //2. HTML 생성
  <b>
  //3. 생성 HTML 을 div 객체 생성
      divNode.innerHTML = ;
                  //HTML을 생성하며 설정
  ```

#### HTML Form Control에 값 설정

- 이름 유일

  ```javascript
  document.폼이름.control이름.value = 값;
  ```

- 이름 중복( 배열 )

  ```javascript
  document.폼이름.control이름[인덱스].value = 값;
  ```

- check 상태변경 ( radio, checkbox )

  ```javascript
  document.폼이름.control이름[인덱스].checked = true / false;
  ```

- selected 상태변경(select)

  ```javascript
  document.폼이름.control이름[인덱스].selected = true / false;
  ```

## 함수

- 기명함수

  ```javascript
  function 함수명() {}
  ```

- 무기명함수: 자동호출(이벤트 처리)

  ```javascript
  //문법)
  var 변수명=function(매개변수){
      코딩,,,
  }

  //호출
  변수명(값,,,);
  ```

#### 이벤트 처리

1. HTML Tag에 속성으로 처리

   - `<태그명 onXXX="이벤트처리할함수명(...)">`

2. 무기명 함수를 이용하여 처리 ( 자동호출 )

   - 코드의 재사용성이 매우 떨어진다.

   1. 이벤트를 발생시킬 tag를 찾아

      `document.getElementById("id명")`

   2. 이벤트 속성에

      `.onxxx`

   3. 무기명 함수로 처리

      `= function(){ 이벤트가 발생했을 때 처리할 코드 }`

3. 이벤트에 등록하여 처리

   1. 이벤트를 발생시킬 tag를 찾아

      `document.getElementById("id명")`

   2. 이벤트에 등록시킬 이벤트 종류와 처리함수를 등록시켜 처리

      `.addEventListener("이벤트종류","처리할 함수명");`

      - 함수는 이벤트가 발생하명 자동호출됨으로 ()를 쓰면 안된다.

      - 이벤트 종류는 on을 제외하고 작성 ex) onclick이면 click으로

   ```javascript
   document.getElementById("a").addEventListener("click", test);
   ```

## 팝업창

- 정보제공용으로 사용

- 비모달

  ```javascript
  //window는 javascript 객체의 최상위 객체
  window.open(
    "팝업창에 넣을 HTML",
    "창id",
    "width:넓이,height:높이,top=x좌표,left=y좌표"
  );
  ```

  #### window

  - javascript객체의 최상위 객체
  - document
    - HTML문서에 접근
  - event
    - event 발생(키코드값)
  - location
    - 페이지 이동
    - browser 가 제공하는 Storage를 사용( HTML5 )
  - history
    - 브라우저에 로딩되었던 페이지들로 이동

## 값전달

```javascript
opner.window.document.폼이름.control이름.value=부모창으로 전달할 값;
```

## 이벤트(키이벤트)

- 키코드 얻기

  ```javascript
  window.event.keyCode;
  window.event.which;
  ```

## 페이지 이동(javascript)

- 단순 페이지 이동

  ```javascript
  window.location.href = "이동페이지url"; //HTML  jsp
  ```

- URL 치환(뒤로가기가 X)

  ```javascript
  window.location.replace("이동한페이지url");
  ```

- `<form>`태그의 전송 (submit()함수 사용)

  ```javascript
  document.폼이름.submit();
  ```

  - `<meta>`: HTML의 정보설정하는 일

    `<meta charset="UTF-8">` -> HTML page의 charset 설정

    `<meta name="description" content="페이지설명"/>`

    `<meta http-equiv="refresh" content="대기할초;이동할url">`

- confirm Dialog

  - 사용자의 의향을 물어볼 때 사용

    `confirm("메세지")`

- HTML

  ```html
  <a href="URL"></a>//다른 JSP, HTML 페이지와 연결
  <form action="JSPURL">
    <input type="submit" value="" />//
    <form>태그안에 HTML Form Control에 입력된 값들이 JSP로 전달</form>
  </form>
  ```

1. java.sql 패키지에서 디비연동하고 인터페이스 : 4.class

2. 로딩된 드라이버 Connection : 2

3. 쿼리문 생성하고 실행하는 : 3. createstatement

4. 객체는 쿼리문을 알수 없으면 쿼리문을 실행하는 단계 : statement sql

5. 오토커밋을 해제하기 위해 개발자가 호출해야하는 커넥션 : setAutoCommit(false)

6. java에서 여러개의 쿼리문으로 트랜잭션이 구성되어 있다면 method안에서 connection들의 연결을 끊는다.

7. 바인드 변수를 이용하여 값만 추후에 입력 : 2

8. DBMS의 프로시저 : 1

9. 조회 쿼리문을 수행한 테이블에 정보를 얻는 작업 1.ResultSet

10. 다음중 DB 벤더사가 제공하는 것 : Driver

11. 이해관계자들에게 서비스 품질에 대한 정보를 제공하기 위한 : 소프트웨어 테스트

12. 테스팅 개념으로 올바른것 : 1 - 일반적으로 작업이 끝난 후 처음에 요구된것과 현재 상태의 차이

13. 자바에서 가장 많이 사용하는 : 4. JUnit

14. 단위 테스트의 단위 : method

15. equal : 예상값과 실제값이 같은

16. 2 : Test

17. Junit에서 제공하는 ~ : 4번.

18. 제이유닛에서 제공하는 테으스 메소드로 ㅂ로 수 없는것 : 1. 5번 반복하여 테스트 진행

19. 제이유닛에서 지원하는 테스트메소드로 볼수 없는것 : 4. assertInnull

20. enableOnjre

### history

- web browser가 가동된 후 방문했던 site의 기록을 사용하는 객체

- 서버에서 변경된 내용을 확인할 수 없다.

- 웹 브라우저가 종료되면 history는 사라진다.

  ```javascript
  window.hisotry.go()나 back()사용
  ```

- 생성된 history의 수는 history.length로 얻을 수 있다.

```javascript
//사용법>
//뒤로
history.back()
//앞으로
history.go(이동할 단계)//1,2,3, -1 (back과 같음)

```

## Storage

- HTML5에서 제공되는 browser 내 저장공간

- Cookie 의 대체기술

- Cookie

  - 접속자정보를 접속자의 HDD에 File로 생성하여 저장하는 기술
  - 문자열만 저장가능
  - 키와 값의 쌍으로 이루어진 데이터
  - 최대 1Mbyte정보

- localStorage, sesssionStorage 두가지 제공

  - localStorage
    - 웹서버와 접속이 끊어져도 정보를 사용할 수 있는 storage
  - sessionStorage
    - 웹 서버에 연결되어있을 때에만 정보를 저장하고 사용할 수 있는 Storage
    - session: 컴퓨터끼리의 연결

- window에서 제공

- 문자열, 다른 데이터형을 저장할 수 있다

- 5Mbyte 정보를 저장할 수 있다.

- 접속자의 정보를 저장할 떄 사용( ID저장, 팝업창 제어 )

- 웹 비연결성(웹서버는 접속자에게 정보를 제공항 후 연결을 끊는다)

  1. 서버의 자원소모가 적다(H/W가 고사양X)

     - 서버는 접속자의 상태를 알 수 없다.(연결유지 기술: session, cookie)
     - 실시간으로 변경된 정보를 모든 접속자에게 반영할 수 없다.( client pull로 해결 )-> 실시간 정보반영이 어렵다

     #### session

     접속자의 정보를 웹서버의 memory에 저장(해킹안전)

     #### cookie

     접속자의 정보를 접속자의 HDD에 저장 ( 해킹위험 )

- 사용법)

  1. 값 설정

     - 서버에 연결되어 있을 때에만 사용

       window.sessionStorage

     - 서버와 연결을 끊었을 떄에도 유지

       window.localStorage

     ```javascript
     var ss = window.sessionStorage;
     var ls = window.localStorage;

     ls.setItem("키", 값);
     ss.setItem("키", 값);
     ```

  2. 값 얻기

     ```javascript
     ls.getItem("키");
     ```

  3. 값 삭제

     ```javascript
     ls.removeItem("키");
     ```

  4. 모든 Stotage

     ```javascript
     ls.clear();
     ```

# JSON

javascript object notation

- 이름과 값의 쌍으로 데이터를 사용할 때
- 간단한 형태로 값을 저장하고, 전달하는 객체

```javascript
//문법
{ 이름: 값,이름: 값 }//값: 문자열 숫자 boolean function

//사용법
//1. 값을 가진 JSON을 변수에 담는다
//문자열
var data="{이름:값,이름 값,,,}"
//2. JSON Object으로 생성
var json_obj=eval("("+data+")");
//3. 값얻기
json객체명.이름
//4. 값 삭제
delete json객체명.이름;
```

## JSON Array

- JSON으로 배열을 만드는 것

  1. JSON Object을 배열에 넣는다.

     ```javascript
     var d = "[{이름: 값,,,},{이름: 값,,,},,]";
     ```

  2. JSON Array 객체를 만든다.

     ```javascript
     var jsonArr = eval("(" + d + ")");
     ```

  3. 반복

     ```javascript
     for (var i = 0; i < jsonArr.length; i++) {
       jsonArr[i].이름;
     }
     ```

## 복합JSON

- JSON Object 안에 JSON Array를 가진 경우

  "{이름:값,이름:[{이름:값,,,},{이름:값,,,},,,,],,,,,}"
  정보--- 데이터-----------------------------

  ```javascript
  var data =
    "{writer:'송유빈',pubData:'2020-07-06',data:[{img:'daram.jpg',desc:'설명'},,,]}";
  var JSONObj = eval("(" + data + ")");

  var jsonArr = jsonObj.data;
  jsonArr.writer = "송유빈";
  jsonArr.pubData = "2020-07-06";
  for (var i = 0; i < jsonArr.length; i++) {
    jsonArr[i].img;
    jsonArr[i].desc;
  }
  ```

### 재귀호출함수

- 일정시간마다 함수를 호출하는 함수

  ```javascript
  setTimeout(호출할함수명, ms);
  ```

### Closure

- 접근권한 변경

- 함수안에 함수 정의

  - 세부업무를 묶어 하나의 업무를 구현할 수 있다.

  ```javascript
  //형식)
  //무기명함수형식: 처리해야할 일이 많은 경우
  //() 형식: 처리해야할 일이 적은 경우

  var 변수명 = (function () {
    var 변수명;
    function 함수명() {} //업무를 위한 세부업무
  })(); //하나의 업무
  ```

- 객체생성없이 사용할 수 있다. new없이 직접호출이 가능하다

- 내부함수는 함수 밖에서 호출할 수 없다.

  - closure를 사용하면 가능

    ```javascript
    //작성법

    //무기명함수형식: 처리해야할 일이 많은 경우
    return {외부에서 호출할 이름: 내부함수, 외부호출이름: 내부함수,,,}
    //호출
    변수명.이름;
    변수명.이름();


    //() 형식: 처리해야할 일이 적은 경우
    var 변수명=({이름:값,이름:fucntion(){...}...});
    //호출
    변수명.이름;
    변수명.이름();
    ```

## Class 작성

- 업무를 구분하여 만들기 위해 사용
- 참조형 데이터형: new 사용하여 객치를 생성한 후 사용
- 사용자정의 자료형: 제공되는 데이터형을 묶어 사용하는 것

```javascript
//작성법
function 생성자(매개변수,,,){
    var 변수명;
    .
    .
    function 함수명(매개변수,,){

    }//closure가 필요

    this.변수명;
    this.변수명=function(){

    }//closure가 필요없음
}

//사용
//1. 생성
var 객체명=new 생성자(값,,,);
//2. 변수호출
객체명.변수명;
//3. 함수호출
객체명.무기명함수저장변수명();
```

## 상속

- 코드의 재사용성 향상

```javascript
function 부모(){
    ..
}
function 자식(){
    ..
}
```

- 상속의 문법

  ```javascript
  자식.prototype = new 부모();
  ```

- 자식클래스 생성

  ```javascript
  var 변수명 = new 자식();
  ```

## 정규식

- 많은 문자열에서 원하는 문자열이 있는지 찾기 위한 식
- replace사용, match 사용

```javascript
//순환 /[  범위  ]/g
var test = "AbaZt10~가나하Te!";
alert(test.replace(/[a-zA-Z0-9]/g, ""));
```

- 범위(시작-끝)
  - 한글 ㄱ-힣
  - 영어 A-Z a-z
  - 숫자 0-9
  - 특수문자는 범위가 없다. 없애고 싶은 문자를 모두 입력해주어야함
