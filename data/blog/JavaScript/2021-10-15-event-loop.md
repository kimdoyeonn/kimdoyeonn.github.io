---
title: '이벤트 루프(Event Loop)'
date: 2021-10-15 16:08:23
categories:
tags:
---

자바스크립트는 싱글 스레드 기반 언어이다. 즉, 한 번에 하나의 작업만 처리할 수 있다. 하지만 실제로 자바스크립트를 사용해보면 많은 작업을 동시에 처리할 수 있다는 것을 알 수 있다. 예를 들어 HTML 요소가 애니메이션 효과를 통해 움직이면서 마우스 이벤트를 받아 처리하기도 하고, 웹 서버에서는 동시에 여러 개의 HTTP 요청을 처리하기도 한다. 어떻게 스레드가 하나인데 이런 일을 할 수 있을까?

일단 이렇게 한 번에 여러 개의 작업을 할 수 있는 것을 동시성(Concurrency)라고 한다. 자바스크립트는 동시성을 지원하기 위해 이벤트 루프(Event Loop)를 사용한다. 이벤트 루프는 브라우저에 내장된 기능으로, V8 같은 자바스크립트 엔진에는 없는 기능이다.

## 자바스크립트 엔진

![https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-structure.png](https://joshua1988.github.io/images/posts/web/translation/how-js-works/js-engine-structure.png)

자바스크립트 엔진은 크게 힙 영역과 콜스택 영역 두 가지로 구분할 수 있다.

### 콜 스택(Call Stack)

함수를 호출하면 순차적으로 콜 스택에 푸시되어 순차적으로 실행된다. 자바스크립트는 단일 콜스택을 사용하기 때문에 최상위 실행 함수가 종료되어 스택에서 제거되기 전까지 다른 함수를 실행할 수 없다.

### 힙(Memory Heap)

객체가 저장되는 메모리 공간이다. 콜스택의 요소인 실행 컨텍스트가 힙에 저장된 객체를 참조한다.

## 자바스크립트 런타임

위에 콜 스택의 특징에서 확인할 수 있듯이 자바스크립트 엔진은 실행된 작업을 순차적으로 실행하기 때문에 자바스크립트 엔진 만으로는 비동기 처리를 할 수 없다. 때문에 소스코드의 평가와 실행을 제외한 모든 비동기 처리는 자바스크립트 런타임 즉, 브라우저나 Node.js에서 담당한다.

![https://miro.medium.com/max/700/1*4lHHyfEhVB0LnQ3HlhSs8g.png](https://miro.medium.com/max/700/1*4lHHyfEhVB0LnQ3HlhSs8g.png)

우리가 사용하는 AJAX나 setTimeout 같은 비동기 함수들은 자바스크립트 엔진이 아닌 Web API에 정의되어 있다. 그러니까 실제 비동기 함수들이 실행되면 자바스크립트 엔진이 아닌 브라우저나 Node.js에서 실행되는 것이다. 또, 그림을 살펴보면 Event Loop와 Callback Queue(Task Queue) 같은 장치도 자바스크립트 외부에 구현되어 있는 것을 볼 수 있다.

```jsx
setTimeout(function cb() {
  console.log('Hi')
}, 5000)

console.log('Hi Hi')
```

위 코드를 실행하여 setTimeout을 호출하면 setTimeout은 자바스크립트 엔진의 콜스택에 담긴다. 그리고 setTimeout은 자바스크립트 런타임에 존재하는 API이므로 브라우저가 타이머를 실행시키고 카운트 다운을 시작한다. 그러면 setTimeout의 호출은 완료되었다는 의미이므로 콜스택에서 지워진다. 코드가 이어서 실행되면 console.log가 콜스택에 들어가고, 'Hi Hi'를 출력한 후 다시 지워진다.

이제 브라우저에서 실행되고 있는 타이머가 종료되고 콜백이 실행된다. **만약 타이머가 다른 코드가 실행되고 있는 중간에 종료됐다고 하더라도 콜백이 바로 코드 사이에 끼어들 수는 없다.** 콜백이 콜 스택으로 들어가려면 우선 콜백 큐에 푸시되어야 하고, 이벤트 루프가 콜백큐에서 콜스택으로 옮겨주길 기다려야 하기 때문이다.

Web API가 종료되면 콜백 함수는 콜백 큐로 푸시된다. 콜스택과 콜백 큐를 지켜보고 있던 이벤트 루프는 콜 스택이 비어있고, 콜백 큐에 실행시킬 콜백이 있는 것을 확인하면 콜백 큐의 콜백을 순차적으로 콜 스택에게 푸시해준다. 그럼 이제 자바스크립트 엔진에 의해 콜백이 실행된다. (위 코드에서는 'Hi' 출력) 여기서 중요한 것은 **콜스택이 비어있어야 이벤트루프가 콜백을 이동시킨다**는 것이다.

```jsx
setTimeout(function cb() {
  console.log('Hi')
}, 0)

console.log('Hi Hi')
```

단순히 코드만 봤을 때는 그럼 setTimeout 대기 시간에 0을 넣으면 코드가 적힌 순서대로 실행되나? 하고 생각할 수도 있지만 그렇지 않다. setTimeout의 대기 시간은 최소 대기시간일뿐 언제 실행될지는 보장하지 않는다. 그리고 브라우저에서 실행되어 콜백 큐로 들어간 콜백은 이벤트 루프가 옮겨주어야 콜 스택으로 푸시될 수 있고, 이벤트 루프는 콜 스택이 완전히 비는 것을 기다리기 때문에 대기 시간을 0으로 넣어도 콜백은 바로 실행되지 않고 뒤로 밀리게 된다.

## 정리

자바스크립트는 싱글 스레드 기반 언어라 한 번에 하나의 작업만 수행할 수 있다. 하지만 Web API, 콜백큐, 이벤트 루프 덕분에 멀티 스레드의 동작도 할 수 있다.

참고:

- [How JavaScript works: an overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
- 모던 자바스크립트 Deep Dive
- [어쨌든 이벤트 루프는 무엇입니까? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [자바스크립트와 이벤트 루프](https://meetup.toast.com/posts/89)
