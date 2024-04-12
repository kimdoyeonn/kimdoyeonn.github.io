# jQuery

- 2006년 John Resig가 발표한 Javascript Library
- jQuery.com 배포
- 적게쓰고 많은 일을 하도록 만들어진 library
- library
  - 자주 사용될 기능을 미리 구현해놓은 것
  - animation, event, effect, Ajax 등 기능 구현
- 모든 브라우저에 동작하도록 웹 표준을 준수하여 구현 -> cross browser
- plugin 지원
- jQueryObject 최상위객체 ( \$ )
- 간결한 문법을 지원

- 2가지 종류의 파일 배포 ( 확장자.js )

  1. compressed version( 서비스용 ):enter, whitespace, comment 을 없애버려 파일크기의 크기를 줄인 배포판( 파일명에 min이 붙어있다. )
  2. uncompressed version( 개발용 ):enter, whitespace, comment가 들어있는 배포판

- selector를 사용한다.

  - selector: 태그를 찾아가기 위해 작성하는 문자열
  - behavior selector / class selector / id selector / sub selector / name selector 지원

  ```javascript
  $(selector).함수(function(){
      작성하는 코드;//javascript 문법
  				//jQuery 문법
  });
  ```

  ```html
  //1.
  <script type="text/javascript" src="JS"></script>
  //2.
  <script type="text/javascript">
    $(function () {});
  </script>
  ```

##### CDN: contents delivery network, [https://cdn.hosting.kr/cdn%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94/](https://cdn.hosting.kr/cdn이란-무엇인가요/)
