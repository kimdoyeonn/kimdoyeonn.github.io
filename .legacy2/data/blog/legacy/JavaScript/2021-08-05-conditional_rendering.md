---
title: '조건부 렌더링'
date: 2021-08-05
tags: [React]
---

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
)
```

- `isLoggedIn`의 값에 따라 다른 컴포넌트를 렌더링함

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.state = { isLoggedIn: false }
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    let button
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

ReactDOM.render(<LoginControl />, document.getElementById('root'))
```

- 로그인 상태: 인사말과 로그아웃버튼을 렌더링 (`isLoggedIn`이 `true`)
- 로그아웃 상태: 가입안내와 로그인버튼을 렌더링(`isLoggedIn`이 `false`)

### 논리 연산자 &&로 if를 인라인으로 표현하기

JSX 안에는 중괄호를 이용해서 표현식을 사용할 수 있다.

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  )
}

const messages = ['React', 'Re: React', 'Re:Re: React']
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
)
```

- JavaScript에서 `true && expression`은 항상 `expression`으로 평가되고 `false && expression`은 항상 `false`로 평가된다.
- 따라서 `&&` 뒤의 엘리먼트는 조건이 `true`일 때 출력됨 (조건이 `false`라면 무시)

```jsx
render() {
  const count = 0;
  return (
    <div>
      { count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

- `false`로 평가될 수 있는 표현식을 반환하면 `&&` 뒤에 있는 표현식은 건너뛰지만 false로 평가될 수 있는 표현식이 반환된다는 것에 주의해야 한다. 위의 예시에서는 `<div>0</div>`이 render 메서드에서 반환된다.

### 조건부 연산자로 If-Else 구문 인라인으로 표현하기

- JavaScript의 삼항연산자를 사용한다. `condition ? true : false`

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

- 가독성은 좀 떨어지지만 더 큰 표현식에도 이 구문을 사용할 수 있다.

조건이 너무 복잡하다면 컴포넌트를 분리하기 좋은 때 일 수도 있다;

### 컴포넌트가 렌더링하는 것을 막기

다른 컴포넌트에 의해 렌더링 될 때 컴포넌트 자체를 숨기고 싶을 때가 있을 수 있다. 이때는 렌더링 결과를 출력하는 대신 `null`을 반환하면 해결할 수 있다.

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null
  }

  return <div className="warning">Warning!</div>
}

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showWarning: true }
    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning,
    }))
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}

ReactDOM.render(<Page />, document.getElementById('root'))
```

위의 예시는 `<WarningBanner />` 가 prop의 `warn` 값에 의해 렌더링됩니다. ( `false`일 경우 렌더링되지 않음)

출처 : [조건부 렌더링](https://ko.reactjs.org/docs/conditional-rendering.html)
