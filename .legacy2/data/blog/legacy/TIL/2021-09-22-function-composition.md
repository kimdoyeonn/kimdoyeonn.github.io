---
title: '[TIL] 함수 컴포지션(Function Composition)'
tags: [TIL, JavaScript]
---

함수 컴포지션은 말 그대로 함수를 조합하는 것으로, **한 함수의 결과를 다른 함수에 전달하는 식으로 동작하는 접근법**이다. 함수의 수는 정해져 있지 않고, **최종 실행된 함수의 결과값이 전체의 결과**가 된다.

![https://www.educative.io/api/edpresso/shot/5882797525827584/image/5346167031332864](https://www.educative.io/api/edpresso/shot/5882797525827584/image/5346167031332864)

```jsx
const A = x => x * x
const B = x => x * 4

let result = B(A(4))
// A(4) = 4 * 4 = 16
// B(16) = 16 * 4 = 64
// result = 64
```

`B(A(4))` 처럼 함수의 결과를 따로 변수에 담지 않고 다음 함수의 인자로 바로 전달하는 방법을 함수 컴포지션이라고 한다. 그런데 코드를 읽을 때 가장 안부터 계산해서 밖으로 코드를 읽어야하기 때문에 함수가 많아질수록 읽기 힘든 코드가 됩니다. 그래서 함수 컴포지션의 가독성을 높이기 위해 `compose` , `pipe` 를 만들어 활용합니다.

## `compose`

```jsx
const compose = (...fns) => x => fns.reduceRight((y, fn) => fn(y), x)

const A = x => x * x
const B = x => x * 4

let result = compose(B, A)(4) // 64
```

`compose` 를 사용하면 위와 같이 변경할 수 있다. compose함수에 실행할 함수의 목록을 넘겨주면 새로운 함수가 반환되고, 새로 받은 함수의 인자를 넘겨주면 함수 목록의 역순으로 함수를 실행해서 결과를 반환한다. 여기서 역순으로 실행되는 함수를 반대로 바꾼 것이 `pipe` 함수이다.

## `pipe`

```jsx
const pipe = (...fns) => x => fns.reduce((y, fn) => fn(y), x)

const A = x => x * x
const B = x => x * 4

let result = pipe(A, B)(4) // 64
```

`compose` 함수와는 반대로 reduce를 사용했기 때문에 인자로 넘겨받은 실행할 함수 목록을 앞에서부터 순서대로 실행시켜 값을 반환합니다.

참고 :

- [FP in JS (자바스크립트로 접해보는 함수형 프로그래밍) - 함수 컴포지션, 커링](https://velog.io/@nakta/FP-in-JS-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%A0%91%ED%95%B4%EB%B3%B4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%ED%95%A8%EC%88%98-%EC%BB%B4%ED%8F%AC%EC%A7%80%EC%85%98-%EC%BB%A4%EB%A7%81-s7k2z039vb)
- [Function composition in JavaScript](https://www.educative.io/edpresso/function-composition-in-javascript)
- [[JavaScript] 함수 합성(Function Composition)](https://velog.io/@nittre/JavaScript-%ED%95%A8%EC%88%98-%ED%95%A9%EC%84%B1Function-Composition)
