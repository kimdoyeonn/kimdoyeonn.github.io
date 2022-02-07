---
title: '이벤트 처리하기'
excerpt: ''
category:
  - React
tags: [React]
---

DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사하고, 문법에 몇 가지 차이가 있습니다.

- React의 이벤트는 소문자 대신 camelCase를 사용합니다.
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.

```jsx
<button onClick={activateLasers}>Activate Lasers</button>
```

- React에서는 `false`를 반환해도 기본 동작을 방지할 수 없습니다. 반드시 `preventDefault`를 명시적으로 호출해야 합니다.

  에를 들어 일반 HTML에서 폼을 제출할 때 가지고 있는 기본 동작을 방지하기 위해 다음과 같은 코드를 작성할 수 있습니다.

  ```html
  <form onsubmit="console.log('You clicked submit.'); return false">
    <button type="submit">Submit</button>
  </form>
  ```

  하지만 React에서는 다음과 같이 작성할 수 있습니다.

  ```jsx
  function Form() {
    function handleSubmit(e) {
      e.preventDefault()
      console.log('You clicked submit.')
    }

    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    )
  }
  ```

  여기서 `e`는 합성 이벤트입니다. React는 W3C 명세에 따라 합성 이벤트를 정의하기 때문에 브라우저 호환성을 고려하지 않아도 됩니다. [React 이벤트는 브라우저 고유 이벤트와 정확히 동일하게 작동하지는 않습니다.](https://ko.reactjs.org/docs/events.html)

  React에서는 DOM 앨리먼트가 생성된 후 리스너를 추가하기 위해 `addEventListener`를 호출하는 대신 엘리먼트가 처음 렌더링 될 때 리스너를 제공합니다.

  ES6 클래스를 사용하여 컴포넌트를 정의할 때, 일반적으로 이벤트 핸들러를 클래스의 메서드로 만듭니다.

  ```jsx
  class Toggle extends React.Component {
    constructor(props) {
      super(props)
      this.state = { isToggleOn: true }

      // callback에서 this가 작동하도록 하려면 다음과 같이 바인딩해줘야함
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.setState((prevState) => ({
        isToggleOn: !prevState.isToggleOn,
      }))
    }

    render() {
      return <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
    }
  }

  ReactDOM.render(<Toggle />, document.getElementById('root'))
  ```

  - JSX 콜백 안에서 `this`의 의미에 대해 주의해야함! JS에서 클래스 메서드는 기본적으로 [바인딩](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 되어 있지 않다. `this.handelClick`을 바인딩하지 않고 onClick에 전달하였다면, 함수가 실제 호출될 때 this는 undefined가 됨

    JavaScript에서 함수가 작동하는 방식의 일부임. 일반적으로 `onClick={this.handleClick}`과 같이 뒤에 `()`을 사용하지 않고 메서드를 참조할 경우, 해당 메서드를 바인딩 해야 함

  - `bind`를 호출하는 것이 불편하다면, 해결할 수 있는 두 가지 방법이 있음

    1. 퍼블릭 클래스 필드 문법에서 클래스 필드를 사용하여 콜백을 올바르게 바인딩 하는 방법

       이 방법은 `Create React App`에 기본적으로 설정되어 있음

       ```jsx
       class LoggingButton extends React.Component {
         // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
         // 주의: 이 문법은 *실험적인* 문법입니다.
         handleClick = () => {
           console.log('this is:', this)
         }

         render() {
           return <button onClick={this.handleClick}>Click me</button>
         }
       }
       ```

    2. 클래스 필드 문법을 사용하고 있지 않다면, 콜백에 화살표 함수를 사용하는 방법

       문제점: class가 렌더링될 때마다 다른 콜백이 생성된다는 것, 대부분의 경우에는 문제가 되지 않지만, 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있다. → 성능 문제 발생

       이러한 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장

       ```jsx
       class LoggingButton extends React.Component {
         handleClick() {
           console.log('this is:', this)
         }

         render() {
           // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
           return <button onClick={() => this.handleClick()}>Click me</button>
         }
       }
       ```

### 이벤트 핸들러에 인자 전달하기

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

`화살표함수`를 사용하는 방법, `Funtions.prototype.bind`를 사용하는 방법이 있는데, 두 경우의 결과는 동일하다.

두 경우 모두 React 이벤트를 나타내는 인자 `e` 가 id 뒤에 두번째 인자로 전달된다.

차이점이 있다면, 화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 bind를 사용할 경우 명시하지 않아도 자동으로 전달한다는 것이다.

출처: [이벤트 처리하기](https://ko.reactjs.org/docs/handling-events.html)
