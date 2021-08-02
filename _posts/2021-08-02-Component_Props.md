---
title: "JavaScript 기본 타입"
excerpt: ""
category:
  - JavaScript
tags: [JavaScript]
---

개념적으로 컴포넌트는 JavaScript 함수와 유사합니다. "props"라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환합니다.

### 함수 컴포넌트

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

위 함수는 데이터를 가진 하나의 "props"(속성을 나타내는 데이터) 객체 인자를 받은 후 React 앨리먼트를 반환하므로 유효한 React 컴포넌트 입니다.

Arrow Function을 사용하여 컴포넌트를 정의할 수 있습니다.

### 클래스 컴포넌트

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

render함수에서 React 엘리먼트를 리턴해준다. state를 사용하여 값을 관리할 수 있다.

### 컴포넌트 렌더랑

이전까지는 React 엘리먼트를 DOM 태그로 나타냈습니다. 또. React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있습니다.

```jsx
const element = <div />;
const element = <Welcome name="Sara" />;
```

React는 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달합니다. 이 객체를 "props"라고 합니다.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById("root"));
```

"Hello, Sara"를 렌더링하는 예시입니다.

1. `<Welcome name="Sara" />` 엘리먼트로 `ReactDOM.render()`를 호출합니다.
2. React는 `{name: 'Sara'}`를 props로 하여 `Welcom` 컴포넌트로 호출합니다.
3. `Welcom` 컴포넌트는 결과적으로 `<h1>Hello, Sara</h1>` 엘리먼트를 반환합니다.
4. ReactDOM은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트 합니다.

React는 소문자로 시작하는 컴포넌트를 DOM 태그로 처리합니다. 때문에 [컴포넌트의 이름은 항상 대문자로 시작해야합니다.](https://ko.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)
예를 들어, `<div />`는 HTML div 태그로 나타내지만, `<Welcome />`은 컴포넌트를 나타내며 범위 안에 `Welcom`이 있어야 합니다.

---

### 컴포넌트 추출

컴포넌트를 여러 개의 작은 컴포넌트로 나누는 것을 두려워하지 마세요

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

이 컴포넌트를 `author`(객체), `text`(문자열), `date`(날짜)를 props로 받은 후 소셜 미디어 웹 사이트의 코멘트로 나타냅니다.

이 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어서 변경하기 어려울 수 있으며, 각 구성요소를 개별적으로 재사용하기도 힘듭니다.

이것을 해결하기 위해 컴포넌트에서 몇 가지 컴포넌트를 추출해봅시다.

```jsx
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
```

`Avatar`는 자신이 `Comment` 내에서 렌더링 된다는 것을 알 필요가 없습니다. 따라서 props의 이름을 `author`에서 더욱 일반화된 `user`로 변경하였습니다.

props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장합니다.

이렇게 하면 `Comment`가 살짝 단순해집니다.

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

다음은 `UserInfo`

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}
```

`Comment`가 더욱 단순해집니다.

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

처음에는 컴포넌트를 추출하는 작업이 지루해 보일 수 있습니다. 하지만 재사용 가능한 컴포넌트를 만들어 놓는 것은 더 큰 앱에서 작업할 때 두각을 나타냅니다. UI 일부가 여러 번 사용되거나 (`Button`, `Panel`, `Avatar`), UI 일부가 자체적으로 복잡한 (`App`, `FeedStory`, `Comment`) 경우에는 별도의 컴포넌트로 만드는 게 좋습니다.

---

### props는 읽기 전용

함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됩니다.

```jsx
function sum(a, b) {
  return a + b;
}
```

이런 함수들은 순수 함수라고 호칭합니다. 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문입니다.

반면에 다음 함수는 자신의 입력값을 변경하기 때문에 순수 함수가 아닙니다.

```jsx
function withdraw(account, amount) {
  account.total -= amount;
}
```

React는 매우 유연하지만 한 가지의 업격한 규칙이 있습니다.

**모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 한다.**

물론 애플리케이션 UI는 동적이며 시간에 따라 변합니다. React 컴포넌트는 state를 통해 위 규칙을 위반하지 않고 사용자 액션, 네트워크 응답 및 다른 요소에 대한 응답으로 시간에 따라 자신의 출력값을 변경할 수 있습니다.

출처: [Component와 Props](https://ko.reactjs.org/docs/components-and-props.html)
