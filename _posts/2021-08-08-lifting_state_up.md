---
title: "State 끌어올리기"
excerpt: ""
category:
  - React
tags: [React]
---

동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있습니다. 이럴 때는 가장 가까운 공통 조상으로 state를 끌어올리는 것이 좋습니다.

이번 섹션에서는 주어진 온도에서 물이 끓는 여부를 추정하는 온도 계산기를 만들어 볼 것

먼저 `BoilingVerdict`라는 이름의 컴포넌트부터 만들어봅시다. 이 컴포넌트는 섭씨를 의미하는 `celsius` prop를 받아서 이 온도가 물이 끓기에 충분한지 여부를 출력합니다.

```js
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```

그 다음으로는 `Calculator` 라는 컴포넌트를 만들어봅시다. 이 컴포넌트는 온도를 입력할 수 있는 `<input>`을 렌더링하고 그 값을 `this.state.temperature`에 저장합니다.
또한, 현재 입력값에 대한 `BoilingVerdict` 컴포넌트를 렌더링합니다.

```js
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

---

### 두 번째 input 추가하기

새 요구사항으로써 섭씨 입력 필드뿐만 아니라 화씨 입력 필드를 추가하고 두 필드 간에 동기화 상태를 유지하도록 해봅니다.

`Calculator`에서 `TemperatureInput` 컴포넌트를 빼내는 작업부터 시작해봅시다. 또한 `c` 또는 `f` 의 값을 가질 수 있는 `scale` prop을 추가합니다.

```js
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

```js
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

이제 `Calculator`가 분리된 두 개의 온도 입력 필드를 렌더링하도록 변경할 수 있습니다.

이제 두 개의 입력 필드를 갖게 되었습니다. 하지만 둘 중 하나에 온도를 입력하더라도 다른 하나는 갱신되지 않는 문제가 있습니다. 이것은 두 입력 필드 간에 동기화 상태를 유지하고자 했던 원래 요구사항과는 맞지 않습니다.
또한 `BoilingVerdict` 도 역시 보여줄 수 없는 상황입니다.
현재 입력된 온도 정보가 `TemperatureInput` 안에 숨겨져 있으므로 `Calculator`는 그 값을 알 수 없기 때문입니다.

### 변환 함수 작성하기

섭씨를 화씨로, 화씨를 섭씨로 변환해주는 함수를 작성해보겠습니다.

```js
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}
```

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

온도와 변환함수를 인수로 받아서 문자열을 반환하는 함수입니다.

온도가 잘못된 형태의 값일 경우 빈 문자열을 반환하고 올바른 값일 경우 `convert` 함수로 변환된 값을 반환합니다.

### State 끌어올리기

현재 두 `TemperatureInput` 컴포넌트가 각각의 입력값을 각자의 state에 독립적으로 저장하고 있습니다.

```js
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...
```

하지만 우리가 원하는 것은 두 입력값이 서로의 것과 동기화된 상태입니다. 섭씨 온도 입력값을 변경할 경우 화씨온도 입력값 역시 변환된 온도를 반영할 수 있어야 하며 그 반대의 경우에도 마찬가지여야 합니다.

React에서 state를 공유하는 일은 그 값을 필요로하는 컴포넌트 간의 가장 가까운 공통 조상으로 state를 끌어올림으로써 구현할 수 있스빈다. 이렇게 하는 방법을 state 끌어올리기라고 부릅니다.

이제 `TemperatureInput`이 개별적으로 가지고 있던 지역 state를 지우는 대신 `Calculator`로 그 값을 옮겨놓습니다.
`Calculator`가 공유될 state를 소유하고 있으면 이 컴포넌트는 두 입력 필드의 현재 온도에 대한 "진리의 원천(source of truth)"이 됩니다. 이를 통해 두 입력 필드가 서로 간에 일관된 값을 유지하도록 만들 수 있습니다. 두 `TemperatureInput` 컴포넌트의 props가 같은 부모인 `Calculator`로부터 전달되기 때문에, 두 입력 필드는 항상 도익화된 상태를 유지할 수 있습니다.

1. `TemperatureInput` 컴포넌트에서 `this.state.temperature`를 `this.props.temperature`로 대체할 것입니다. 지금은 `this.props.temperature`가 이미 존재한다고 가정해봅시다. 나중에는 이 값을 `Calculator`로부터 건네야 할 것입니다.

```js
 render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

props는 읽기전용입니다. temperature가 local state였을 때는 그 값을 변경하기 위해 setState를 호출하면 충분했지만 이제 temperature가 부모로부터 prop로 전달되기 때문에 TemperatureInput은 그 값을 제어할 능력이 없습니다.
