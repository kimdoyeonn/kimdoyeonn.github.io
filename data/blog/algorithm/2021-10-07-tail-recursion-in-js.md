---
title: 꼬리 재귀(Tail Recursion)
date: 2021-10-07 23:09:26
categories:
tags:
---

재귀 함수는 자기 자신을 호출하는 함수를 말한다. 코드가 간단하고 직관적이기 때문에 가독성이 좋아진다는 장점도 있지만, 함수를 많이 호출할 경우 스택을 많이 사용하기 때문에 스택오버플로우 에러가 발생할 수 있다는 단점도 있다.
이런 재귀의 단점을 해결하기 위해 꼬리 재귀라는 방법을 사용한다.

### 일반 재귀

```jsx
function recsum(x) {
  if (x === 0) {
    return 0
  } else {
    return x + recsum(x - 1)
  }
}
```

```jsx
recsum(5)
5 + recsum(4)
5 + (4 + recsum(3))
5 + (4 + (3 + recsum(2)))
5 + (4 + (3 + (2 + recsum(1))))
5 + (4 + (3 + (2 + (1 + recsum(0)))))
5 + (4 + (3 + (2 + (1 + 0))))
5 + (4 + (3 + (2 + 1)))
5 + (4 + (3 + 3))
5 + (4 + 6)
5 + 10
15
```

일반 재귀함수는 함수가 호출된 후 값을 받아 추가 연산을 진행하기 때문에 성능저하가 발생된다. 함수 호출이 끝난 후에 연산을 진행하기 때문에 모든 재귀 호출이 끝나야 최종 연산 결과를 알 수 있다. 때문에 재귀가 깊어지면 스택을 너무 많이 사용하는 문제가 발생한다.

### 꼬리 재귀

```jsx
function tailrecsum(x, running_total = 0) {
  if (x === 0) {
    return running_total
  } else {
    return tailrecsum(x - 1, running_total + x)
  }
}
```

```jsx
tailrecsum(5, 0)
tailrecsum(4, 5)
tailrecsum(3, 9)
tailrecsum(2, 12)
tailrecsum(1, 14)
tailrecsum(0, 15)
15
```

꼬리 재귀은 연산을 먼저 한 후에 함수에게 연산의 결과를 전달한다. 그리고 함수들이 값을 반환할 때는 이미 결과가 계산되어 있기 때문에 동일한 값을 전달하므로써 일반 재귀의 단점을 보완한다.

자바스크립트는 ECMAScript 6에서 Tail Call Optimization을 지원한다. 하지만 현재까지 Tail Call Optimization을 지원하는 브라우저가 거의 없어 최적화의 의미가 없다.

참고:

- [꼬리 재귀 - 위키백과](https://ko.wikipedia.org/wiki/%EA%BC%AC%EB%A6%AC_%EC%9E%AC%EA%B7%80)
- [What is tail recursion?](https://stackoverflow.com/questions/33923/what-is-tail-recursion)
- [재귀, 반복, Tail Recursion](https://homoefficio.github.io/2015/07/27/%EC%9E%AC%EA%B7%80-%EB%B0%98%EB%B3%B5-Tail-Recursion/)
