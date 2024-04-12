---
title: '[javascript] this는 무엇인가?'
date: 2021-08-11
tags: [javascript]
---

`this` 키워드는 지금 동작하고 있는 코드를 가지고 있는 객체를 가리킵니다. 그럼 왜 직접 객체를 쓰지 않는걸까요?

```js
var person1 = {
  name: 'Chris',
  greeting: function() {
    alert("Hi! I'm " + this.name + '.')
  },
}

var person2 = {
  name: 'Brian',
  greeting: function() {
    alert("Hi! I'm " + this.name + '.')
  },
}
```

객체 멤버의 컨텍스트가 바뀌는 경우에도 언제나 정확한 값을 사용하게 해줍니다. 예시와 같이 두 개의 다른 객체가 각각 다른 이름으로 인스턴스로 생성된 상태에서 인사말을 출력하기 위해 객체의 name을 참조해야 할 때 사용합니다.
위의 예시에서 `person1.greeting()`은 "Hi! I'm Chris."를 출력하고 `person2.greeting()`은 "Hi! I'm Brian."을 출력합니다. this는 실행중인 코드가 속해있는 객체입니다. 객체 리터럴을 직접 지정해서 사용하는 경우라면 그리 유용하지 않겠지만, 동적으로 객체를 생성하는 경우(생성자를 사용하는 경우...)에는 매우 유용합니다.

대부분의 경우 this의 값은 함수를 호출하는 방법에 의해 결정됩니다. 실행중에는 할당으로 설정할 수 없고 함수를 호출할 때마다 다를 수 있습니다.

- ES5에서는 함수를 어떻게 호출했는지 상관하지 않고 this 값을 설정할 수 있는 `bind` 메서드가 도입됐고,
- ES2015는 스스로 this 바인딩을 제공하지 않는 화살표 함수가 추가되었습니다.(렉시컬 컨텍스트 안의 this 값을 유지함)
- 렉시컬 스코프: 함수가 선언되는 위치에 따라서 상위 스코프가 결정되는 스코프, 함수가 선언될 때 스코프가 생성된다.

- call, apply를 사용하면 실행된 함수의 this를 묶어줄 위치를 정해줄 수 있음

```js
// call 또는 apply의 첫 번째 인자로 객체가 전달될 수 있으며 this가 그 객체에 묶임
var obj = { a: 'Custom' }

// 변수를 선언하고 변수에 프로퍼티로 전역 window를 할당
var a = 'Global'

function whatsThis() {
  return this.a // 함수 호출 방식에 따라 값이 달라짐
}

whatsThis() // this는 'Global'. 함수 내에서 설정되지 않았으므로 global/window 객체로 초기값을 설정한다.
whatsThis.call(obj) // this는 'Custom'. 함수 내에서 obj로 설정한다.
whatsThis.apply(obj) // this는 'Custom'. 함수 내에서 obj로 설정한다.
```

- call과 apply의 차이

```js
function add(c, d) {
  return this.a + this.b + c + d
}

var o = { a: 1, b: 3 }

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 이어지는 인자들은 함수 호출에서 인수로 전달된다.
add.call(o, 5, 7) // 16

// 첫 번째 인자는 'this'로 사용할 객체이고,
// 두 번째 인자는 함수 호출에서 인수로 사용될 멤버들이 위치한 배열이다.
add.apply(o, [10, 20]) // 34
```

출처
[https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Basics](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Basics)
[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
