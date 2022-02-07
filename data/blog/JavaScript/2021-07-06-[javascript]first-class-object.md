---
title: '[javascript]일급 함수'
excerpt: ''
category:
  - javascript
tags: [javascript]
---

함수를 다른 변수와 동일하게 다루는 언어를 일급함수를 가졌다고 표현합니다. 예를 들어, 일급 함수를 가진 언어에서는 함수를 다른 함수에 매개변수로 제공하거나, 함수가 함수를 반환할 수 있으며, 변수에도 할당할 수 있습니다.

---

### 변수에 함수 할당

```js
const foo = function () {
  console.log('foobar')
}
// 변수를 사용해 호출
foo()
```

- 익명 함수를 변수에 할당 한 다음, 그 변수를 사용하여 끝에 괄호 `()`를 추가하여 함수를 호출했습니다.
- 함수가 이름을 가지고 있더라도 할당한 변수 이름을 사용해 함수를 호출할 수 있습니다. 이름을 지정하면 코드를 디버깅할 때 유용합니다. 하지만 호출하는 방식에는 영향을 미치지 않습니다.

---

### 함수를 인자로 전달

```js
function sayHello() {
  return 'Hello '
}
function greeting(helloMessage, name) {
  console.log(helloMessage() + name)
}

greeting(sayHello, 'JavaScript!')
```

- `sayHello()` 함수를 `greeting()` 함수의 인자로 전달했습니다. 이것이 함수를 어떻게 변수처럼 다루는지 보여주는 예시입니다.
- 여기서 다른 함수에 인자로 전달된 함수를 **콜백함수** 라고 합니다. 즉, `sayHello`는 콜백함수입니다.

---

### 함수 반환

```js
function sayHello() {
  return function () {
    console.log('Hello!')
  }
}
```

- 함수가 함수를 반환하는 예제입니다. JavaScript에서는 함수를 변수처럼 취급하기 때문에 함수를 반환할 수 있습니다.
- 함수를 반환하는 함수를 **고차함수**라고 부릅니다.
- 다시 예제로 돌아가서, `sayHello` 함수를 호출했을 때 반환하는 익명함수를 호출하려면 두 가지 방법이 있습니다.

1. 변수 사용

   ```js
   const sayHello = function () {
     return function () {
       console.log('Hello!')
     }
   }
   const myFunc = sayHello()
   myFunc() // "Hello!"
   ```

   - 만약 `sayHello` 함수를 직접 호출하면, 반환된 함수를 호출하지 않고 함수 자체를 반환합니다. 그러므로 반환된 함수를 다른 변수에 저장하여 사용해야 합니다.

2. 이중 괄호 사용

   ```js
   function sayHello() {
     return function () {
       console.log('Hello!')
     }
   }
   sayHello()()
   ```

   - 이중괄호 `()()`을 사용해 반환함 함수를 호출할 수 있습니다.
