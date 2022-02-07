---
title: '[servlet]post로 값 넘기기'
excerpt: ''
category:
  - review
tags: [review, servlet, post]
---

#### post를 사용하여 HTML에서 Servlet으로 값 넘기기

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Insert title here</title>
    <link
      rel="stylesheet"
      type="text/css"
      href="http://211.238.142.33/servlet_prj/common/css/main.css"
    />
    <!-- Google CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script type="text/javascript">
      $(function () {
        //버튼(id='btn')이 클릭됐을 때
        $('#btn').click(function () {
          //Form(id='frm')의 값을 back-end로 보내줌
          $('#frm').submit()
        })
      }) //ready
    </script>
  </head>
  <body>
    <!-- 
		back-end로 값을 보내주기 위해서는 보내려는 값을 입력받는 form control들을 form으로 감싸고 submit을 해주어야한다.
		action 속성은 form data를 서버로 보낼 때 그 데이터가 도착할 최종 URL을 명시한다.
		method 속성의 기본 값은 get이고 post방식을 사용하려면 속성 값을 "post"로 변경해주어야한다. 
		post 방식 폼 데이터를 HTTP POST 메소드로 전송함 별도로 첨부하여 서버로 전송
		get 방식 폼 데이터를 HTTP GET 메소드로 전송함 url에 쿼리 문자열으로 추가되어 전송
	-->
    <form action="../use_post_0716" id="frm" method="post">
      <label>이름 </label>
      <input type="text" name="name" class="inputBox" />
      <label>나이 </label>
      <input type="text" name="age" class="inputBox" />

      <label>도메인</label>
      <select name="domain">
        <option value="google">구글</option>
        <option value="naver">네이버</option>
        <option value="nate">네이트</option>
        <option value="daum">다음</option></select
      ><br />
      <input type="button" id="btn" value="입력" class="btn" />
    </form>
  </body>
</html>
```

```java
package test;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class UsePost0716 extends HttpServlet {
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//MIME-Type 설정
        //응답방식 설정
        //https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types
        //클라이언트에게 전송된 문서의 다양성을 알려주기 위한 메커니즘
        //웹에서는 파일의 확장자가 별 의미가 없기 때문에 각 문서와 함께 올바른 MIME 타입을 전송하도록 서버가 정확하게 설정하는 것이 중요하다.
        //브라우저들은 리소스를 내려받았을 때 해야할 기본 동작이 무엇인지를 결정하기 위해 대게 MIME타입을 사용한다.
        //일반적인 구조는 'type/subtype'
        //type은 카테고리
        //subtype은 각각의 타입에 한정
        response.setContentType("text/html;charset=UTF-8");

        //접속자에게 응답할 수 있는 출력 스트림 얻기
        //PrintWriter
        //https://dream-space.tistory.com/4
		PrintWriter out = response.getWriter();

        //POST 방식은 한글이 encoding되어 전송되기 떄문에 값을 받기전에 decoding하는 코드를 넣어주어야 한글이 깨지지 않고 잘 나온다.
		request.setCharacterEncoding("utf-8");

	      out.write("<!DOCTYPE html>\r\n");
	      out.write("<html>\r\n");
	      out.write("<head>\r\n");
	      out.write("<meta charset=\"UTF-8\">\r\n");
	      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"http://211.238.142.33/servlet_prj/common/css/main.css\">\r\n");
	      out.write("<title>Insert title here</title>\r\n");
	      out.write("<!-- Google CDN -->\r\n");
	      out.write("<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js\"></script>\r\n");
	      out.write("<script type=\"text/javascript\">\r\n");
	      out.write("$(function(){\r\n");
	      out.write("\t\r\n");
	      out.write("});//ready\r\n");
	      out.write("</script>\r\n");
	      out.write("</head>\r\n");
	      out.write("<body>\r\n");

        //front-end에서 back-end로 값을 받아옴
        //이 때 form control은 name 속성을 가지고 있어야 서버로 값을 넘겨줄 수 있다.
	      String name = request.getParameter("name");
	      String age = request.getParameter("age");
	      String domain = request.getParameter("domain");


	      out.print(name);
	      out.println("님");
	      out.print(age);
	      out.println("살<br/>");
	      out.println("<img src='http://localhost/servlet_prj/common/images/");
	      out.print(domain);
	      out.println(".png'>");


	      out.write("\t</div>\r\n");
	      out.write("\t<div id=\"footer\">\r\n");
	      out.write("\t\t<div id=\"footerLogo\"></div>\r\n");
	      out.write("\t\t<div id=\"footerContent\">\r\n");
	      out.write("\t\t\t&copy; CopyRight. All Right Reserved. Class A \r\n");
	      out.write("\t\t</div>\r\n");
	      out.write("\t</div>\r\n");
	      out.write("\r\n");
	      out.write("</div>\r\n");
	      out.write("</body>\r\n");
	      out.write("</html>");
	}

}

```
