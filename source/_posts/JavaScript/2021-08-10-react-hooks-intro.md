---
title: "Hook이 만들어진 이유"
excerpt: ""
category:
  - React
tags: [React]
---

Hook은 React 버전 16.8부터 React 요소로 새로 추가되었습니다. Hook을 이용하여 기존 Class 바탕의 코드를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있습니다.

```jsx
import React, { useState } from "react";

function Example() {
  // "count"라는 새로운 상태 값을 정의합니다.
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- 컴포넌트 사이에서 상태 로직을 재사용하기 어려움
  - render props 같은 패턴들의 사용은 컴포넌트의 재구성을 강요하여 코드의 추적을 어렵게 만듦 → wrapper hell
  - Hook은 계층의 변화 없이 상태 관련 로직을 재사용할 수 있도록 도와줌 → 많은 컴포넌트 혹은 커뮤니티 사이에서 Hook을 공유하기 쉽게 만듦
- 복잡한 컴포넌트들은 이해하기 어려움
  - 생명주기 메서드에 관련 없는 로직이 자주 섞여들어감
  - 상태 관련 로직은 한 공간 안에 묶여 있기 때문에 컴포넌트들을 작게 분리하는 것은 불가능하고, 테스트도 어렵다. 때문에 사용자들은 React를 별도의 관리 라이브러리와 함께 결합하여 사용해왔음 → 너무 많은 추상화, 서로 다른 파일들 사이에서 건너뛰기 요구,,, 컴포넌트 재사용을 더욱 어렵게 만듦
  - Hook을 통해 서로 비슷한 것을 하는 작은 함수의 묶음으로 컴포넌트를 나누는 방법을 사용할 수 있다.
- Class은 사람과 기계를 혼동시킴
  - React에서 Class 사용을 위해서는 JavaScript의 this 키워드를 알아야하는데 다른 언어들의 this와 다르게 동작하므로 사용자에게 혼란 → 코드의 재사용성과 구성을 어렵게 만듦
  - class의 사용을 위해서 이벤트 핸들러가 등록되는 방법을 정확히 파악해야 함 → 코드를 장황하게 만듦
  - Hook은 class없이 React 기능들을 사용하는 방법을 제시

출처 : [Hook의 소개](https://ko.reactjs.org/docs/hooks-intro.html)
