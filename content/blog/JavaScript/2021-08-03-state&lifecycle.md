---
title: 'State와 Lifecycle'
tags: [React]
---

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000)
```

위 방법은 렌더링된 출력값을 변경하기 위해 `ReactDOM.render()`를 호출함

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  )
}

function tick() {
  ReactDOM.render(<Clock />, document.getElementById('root'))
}

setInterval(tick, 1000)
```

state를 추가하여 캡슐화하면 한 번만 코드를 작성하고 Clock이 스스로 업데이트하도록 만들 수 있음

1. `React.Component`를 확장하는 동일한 이름의 ES6 class를 생성
2. `render()`빈 메서드를 추가
3. 함수의 내용을 `render()`안으로 옮김
4. `render()` 내용 안에 있는 `props`를 `this.props`로 변경
5. 남아있는 빈 함수 선언을 삭제

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
```

`Clock`은 함수가 아닌 클래스로 정의됨

`render` 메서드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM 노드로 `<Clock />`을 렌더링하는 경우 `Clock` 클래스의 단일 인스턴스만 사용됩니다. 이것은 로컬 state와 생명주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해줍니다.

### 클래스에 로컬 state 추가하기

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'))
```

- 클래스 컴포넌트는 항상 `props`로 기본 constructor를 호출해야 합니다.

### 생명주기 메서드를 클래스에 추가하기

`Clock`이 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 합니다. 이것을 React에서 "마운팅"이라고 합니다.

또한 Clock에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제하려고 합니다.

컴포넌트 클래스에서 특별한 메서드를 선언하여 컴포넌트가 마운트되거나 언마운트 될 때 일부 코드를 작동할 수 있습니다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
```

**componentDidMount()**

컴포넌트 출력물이 DOM에 렌더링 된 후에 실행됩니다.

\*타이머를 설정하기에 좋은 장소임

```jsx
componentDidMount() {
	this.timerID = setInterval(
		() => this.tick(),
		1000
	)
}
```

`this.props` 가 React에 의해 스스로 설정되고 `this.state` 가 특수한 의미가 있지만, 타이머 ID와 같이 데이터 흐름에 포함되지 않는 어떤 항목을 보관할 필요가 있다면 자유롭게 클래스에 수동을 부가적인 필드를 추가해도 됩니다.

**componenetWillUnmount()**

\*생명주기 메서드 안에 있는 타이머를 분해

```jsx
componentWillUnmount() {
	clearInterval(this.timerID);
}
```

Clock 컴포넌트가 매초 작동하도록 하는 메서드 구현

```jsx
tick() {
  this.setState({
    date: new Date()
  });
}
```

`setState()`를 상요하여 로컬 state를 업데이트

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date(),
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'))
```

1. `<Clock />`가 `ReactDOM.render()`로 전달되었을 때 React는 `Clock` 컴포넌트의 constructor를 호출합니다. `Clock`이 현재 시각을 표시해야 하기 때문에 현재 시각이 포함된 객체로 `this.state`를 초기화합니다. 나중에 이 state를 업데이트할 것입니다.
2. React는 `Clock` 컴포넌트의 `render()` 메서드를 호출합니다. 이를 통해 React는 화면에 표시되어야 할 내용을 알게 됩니다. 그 다음 React는 `Clock`의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트합니다.
3. `Clock` 출력값이 DOM에 삽입되면, React는 `componentDidMount()` 생명주기 메서드를 호출합니다. 그 안에 `Clock` 컴포넌트는 메초 컴포넌트의 `tick()` 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청합니다.
4. 매초 브라우저가 `tick()` 메서드를 호출합니다. 그 안에서 `Clock` 컴포넌트는 `setState()`에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행합니다. `setState()` 호출 덕분에 React는 state 변경된 것을 인지하고 화면에 표시될 내용을 알아내기 위해 `render()` 메서드를 다시 호출합니다. 이 때 `render()` 메서드 안의 `this.state.date`가 달라지고 렌더링 출력값은 업데이트된 시각이 됩니다
   React는 이에 따라 DOM을 업데이트합니다.
5. `Clock` 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 React는 타이머를멈추기 위해 `componentWillUnmount()` 생명주기 메서드를 호출합니다.

### State를 올바르게 사용하기

`setState()`에 대해 알아야 할 세 가지

1. 직접 State를 수정하지 마세요

   ```jsx
   // Wrong
   this.state.comment = 'Hello'

   // Correct
   this.setState({ comment: 'Hello' })
   ```

2. State 업데이트는 비동기적일 수도 있습니다.

   React는 성능을 위해 여러 `setState()` 호출을 단일 업데이트로 한꺼번에 처리할 수 있습니다.

   ```jsx
   // Wrong
   this.setState({
     counter: this.state.counter + this.props.increment,
   })

   // Correct
   this.setState((state, props) => ({
     counter: state.counter + props.increment,
   }))

   // Correct
   this.setState(function(state, props) {
     return {
       counter: state.counter + props.increment,
     }
   })
   ```

3. State 업데이트는 변합됩니다.

   변수들을 독립적으로 업데이트 할 수 있다.

---

### 데이터는 아래로 흐릅니다.

부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 어떤 상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해 알아야 할 필요도 없습니다.

때문에 state는 종종 로컬 또는 캡슐화라고 불립니다. state를 소유하고 설정한 컴포넌트 이외에는 어떤한 컴포넌트에서도 접근 할 수 없습니다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있습니다.

```jsx
<FormattedDate date={this.state.date} />
```

`FormattedDate` 컴포넌트는 `date`를 자신의 props로 받을 것이고 이것이 `Clock`의 어디서 왔는지 `FormattedDate`는 알지 못합니다.

```jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>
}
```

이를 하향식(top-down) 또는 단방향식 데이터 흐름이라고 합니다.

모든 state는 항상 특정한 컴포넌트가 소유하고 있으며 그 state로부터 파생딘 UI 또는 데이터는 오직 트리구조에서 자신의 아래에 잇는 컴포넌트에만 영향을 미칩니다.

트리구조가 props들의 폭포라고 상상하면 각 컴포넌트의 state는 임의의 점에서 만나지만 동시에 아래로 흐르는 부가적인 물이라고 할 수 있습니다.

모든 컴포넌트가 완전히 독립적이라는 것을 보여주기 위해 `App`에서 렌더링하는 세 개의 `<Clock>`을 만들었습니다.

```jsx
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

각 `Clock`은 자신만의 타이머를 설정하고 독립적으로 업데이트를 합니다.

React 앱에서 컴포넌트의 유, 무 상태에 대한 것은 시간이 지남에 따라 변경될 수 있는 구현 세부 사항으로 간주됩니다. 유 상태 컴포넌트 안에서 무 상태 컴포넌트를 사용할 수 있으며, 그 반대 경우도 마찬가지로 사용할 수 있습니다.

출처 : [State and Lifecycle](https://ko.reactjs.org/docs/state-and-lifecycle.html)
