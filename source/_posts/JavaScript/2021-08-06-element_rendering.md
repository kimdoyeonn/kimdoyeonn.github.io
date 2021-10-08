---
title: "엘리먼트 렌더링"
excerpt: ""
category:
  - React
tags: [React]
---

엘리먼트는 React 앱의 가장 작은 단위

브라우저 DOM엘리먼트와 달리 React 엘리먼트는 일반 객체(plain object) 이며 쉽게 생성할 수 있다. React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트 한다.

엘리먼트와 컴포넌트를 혼동하지 않도록 주의

**엘리먼트는 컴포넌트의 구성요소이다.**

### DOM에 엘리먼트 렌더링하기

```jsx
<div id="root"></div>
```

React 기본 파일에 있는 div이다. 이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이것을 root DOM 노드 라고 부른다.

React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있습니다. React를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노드가 있을 수 있습니다.

React 엘리먼트를 루트 DOM 노트에 렌더링하려면 `ReactDOM.render()`로 전달하면 됩니다.

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById("root"));
```

### 렌더링 된 엘리먼트 업데이트하기

React 엘리먼트는 불변객체입니다. 엘리먼트를 생성한 이후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없슴다. 엘리먼트는 영화에서 하나의 프레임과 같이 특정 시점의 UI를 보여줍니다.

따라서 UI를 업데이트하는 유일한 방법은 새로운 엘리먼트를 생성하고 이를 `ReactDOM.render()`로 전달하는 것입니다.

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById("root"));
}

setInterval(tick, 1000);
```

`setInterval()` 콜백을 이용해 초마다 `ReactDOM.render()`를 호출하는 예시입니다.

실제로 대부분의 React 앱은 `ReactDOM.render()`를 한 번만 호출합니다.

### 변경된 부분만 업데이트하기

React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트합니다.

위 예시 코드는 매초 전체 UI를 다시 그리도록 만들었지만 React DOM은 내용이 변경된 텍스느 노드만 업데이트합니다.

출처: [엘리먼트 렌더링](https://ko.reactjs.org/docs/rendering-elements.html)
