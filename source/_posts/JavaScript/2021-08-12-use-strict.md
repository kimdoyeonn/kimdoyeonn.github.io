---
title: "[javascript] use strict란?"
excerpt: ""
category:
  - javascript
tags: [javascript]
---

일부 기능을 제한한다는 의미, 오류 방지 목적을 가지며 단점보다는 장점이 많음

전체 코드나 함수에 strict mode를 적용하기 위해 사용한다. strict 모드의 선언은 자바스크립트 변형의 제한에 동의한다는 것이다.

### 장점

- 의도하지 않은 전역 변수가 선언되지 못하도록 한다.
- 삭제할 수 없는 속성(property)를 삭제하려고 시도하면 오류를 발생시킨다.
- 함수의 파라미터 이름은 서로 달라야한다.
- `this`는 전역 컨텍스트에서 `undefined`이다.
- 몇몇 일반적인 코딩 실수를 잡아서 예외 처리시킨다. (ex, 전역 객체에 접근하려는 것)
- 자바스크립트에서 개발자에게 혼란을 주거나, 잘못 만든 것으로 보이는 여러 기능의 사용을 금지한다.

### 단점

- 못쓰게 되는 많은 기능들이 어떤 개발자에게는 필요한 기능일 수 있다.
- `function.caller` 그리고 `function.arguments`에 접근할 수 없다.
- 서로 다른 strict mode로 작성된 코드를 연결했을 때 오류가 발생할 수 있다.

[프론트엔드 면접 질문](https://blog.rhostem.com/posts/2020-04-13-fe-interview-handbook-js-2)