---
title: React - exhaustive-deps 원인과 해결 방법
date: 2021-11-05 00:08:58
categories:
tags:
---

> React Hook useEffect has a missing dependency: ***. Either include it or remove the dependency array.

React.js에서 Hooks를 사용하다보면 위와 같은 warning를 자주 만나게 된다. 대부분의 warning들과 동일하게 고치지 않는다고 리액트가 멈추거나 제대로 된 동작을 하지 않는건 아니었다.

## 원인

> This is a new ESLint rule that verifies the list of dependencies for Hooks like useEffect and similar, protecting against the stale closure pitfalls.

react repo에 따르면 이 waring은 useEffect 같은 Hooks에 대한 종속성 목록을 확인하여 오래된 클로저 함정에 빠지지 않도록 방지하기 위한 ESLINT 규칙에 의해 발생한다고 한다. 

### 오래된 클로저 (the stale closure)
다음은 1초 마다 count의 값을 콘솔에 기록하는 컴포넌트이다. 버튼을 클릭하면 count의 값을 증가시킬 수 있다.
```jsx
  const counter = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
      const id = setInterval(() => {
          console.log(`Count is: ${count}`);
      }, 1000);
      return () => {
        clearInterval(id);
      }
    }, []);
    
    return (
      <div>
          {count}
          <button onClick={() => setCount(count + 1);}>
              Increment
          </button>
      </div>
    );
  } 
```
이 컴포넌트의 클로저로 인해 useEffect는 처음 실행될 때의 count만 기억하고 있다. count의 값이 변화해도 최신 count의 값은 사용하지 않고 처음 값만을 가지고 있다. 이것이 오래된 클로저이다. 
오래된 클로저를 해결하기 위해서는 useEffect의 종속성 목록에 count를 추가하면 된다.

정말 경고에서 말하는 그대로 useEffect의 종속성 목록에 있어야 할 값이 없어서 발생하는 경고인 것이다. 그런데 문제는 이 경고가 상수, 함수, dispatch 같은 변경될 일이 없는 값을 사용했을 경우에도 발생한다는 것이다. 작성하는 우리야 이 값들이 변경될 일이 없다는 것을 알고 있지만 lint는 이를 모르기 때문에 '어! 이거 외부 스코프에서 오는 값인데 종속성에서 누락됐네!' 하는 것이다.

## 해결 방법
> Either include it or remove the dependency array.

해결 방법은 간단하다. warning에 적혀있는 말 그대로 *** 자리에 있는 값을 종속성 배열에 넣어주거나 종속성 배열을 아예 지워주면 된다. 만약 문제가 발생한 값이 함수이고 그 함수가 useEffect 내부에서만 사용된다면 useEffect 내부에서 정의를 해주어도 warning은 사라진다.


참고:
- [[ESLint] Feedback for 'exhaustive-deps' lint rule](https://github.com/facebook/react/issues/14920)
- [UseEffect And Stale Closures](https://medium.com/edonec/useeffect-and-stale-closures-ea74df7ac452)
- [[React] 리액트 훅이 실패한 설계인 이유 네가지](https://jong-hui.github.io/devlog/2021/01/08/(React)%ED%9B%85%EC%9D%B4-%EC%8B%A4%ED%8C%A8%ED%95%9C-%EC%84%A4%EA%B3%84%EC%9D%B8-%EC%9D%B4%EC%9C%A0-4%EA%B0%80%EC%A7%80/)