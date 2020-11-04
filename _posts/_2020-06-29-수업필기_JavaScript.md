---
title: "JavaScript"
excerpt: "JavaScript 수업 필기 (복습,정리필요)"

categories:
  - JavaScript
tags:
  - JavaScript
last_modified_at: 2020-06-29T08:06:00-05:00
---

- 정리되어 있지 않음

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
