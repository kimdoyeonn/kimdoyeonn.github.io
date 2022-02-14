---
title: "[TIL] `:root` 가상 선택자와 CSS 변수"
excerpt: ""
category:
  - TIL
tags: [TIL, CSS]
---

## `:root`

가상 클래스 중 하나로 문서 트리의 루트 요소를 선택한다. 모든 HTML 문서의 루트 요소는 `<html>` 이므로 `html` 선택자와 동일한 역할을 한다. 하지만 동시에 사용할 경우 `:root`의 [명시도](https://www.notion.so/df311992f2e94bafb201026873ab2f8e)가 더 낮기 때문에 `html` 선택자가 적용된다.
css에서 사용할 변수를 선언할 때 많이 사용한다.

## 1. 가상 선택자

### 가상 클래스

- 선택한 요소가 **특별한 상태**일 때를 위해 사용하는 선택자
- `:hover` `:focus` `:active` `:visited` 등 여러가지가 있다.

### 가상 요소

- 선택한 요소의 **일부분**만 사용하기 위한 선택자
- 가상 클래스와 가상 요소를 구분하기 위해 CSS3부터 `::` 를 도입했다. 하지만 브라우저는 이전 버전을 지원하기 때문에 CSS2의 문법인 `:` 도 지원한다.
- `::first-line` `::first-letter`
- `::before` `::after`
- CSS로 생성한 콘텐츠는 DOM이 포함하지 않고 접근성 트리에도 들어가지 않는다. 콘텐츠가 포함한 정보가 페이지의 목적을 이해하는데 중요하다면 문서로 포함시키는 것이 좋다.

1. `::before` `::after`

   - 선택한 요소의 첫 자식, 맨 마지막 자식을 선택한다
   - 보통 `[content](https://developer.mozilla.org/ko/docs/Web/CSS/content)` 속성과 함께 짝지어, 요소에 장식용 콘텐츠를 추가할 때 사용한다.
   - 기본 값은 인라인이다.
   - `conent` 속성

     - normal
     - string
     - image
     - counter

       ```css
       h3::before {
         counter-increment: section;
         content: "Section " counter(section) ": ";
       }
       ```

     - none
     - `attr` 속성을 사용할 수 있음

## 2. CSS 변수

- CSS 작성자가 정의하는 개체
- 문서 전반적으로 재사용할 값을 담는데 사용한다.
- 전용 표기법을 이용해서 담고 (`--` 으로 시작하는 이름)
- `var()` 함수를 사용해 접근할 수 있다.

### css 변수의 장점

CSS를 작성하다 보면 종종 같은 값을 반복해서 사용해야 하는 경우가 많다. 웹 사이트에서 사용하는 포인트 색상이 그 대표적인 예이다. 한두 곳에서 색상코드로 사용했다면 별 문제가 되지 않겠지만, 만약 수백 곳에서 색상코드를 사용했다면 문제가 발생한다. 만약 이 색상코드를 모두 수정해야하는 경우가 생겼다고 생각해보자. 상상만 해도 아찔하다.

이럴 때 사용하는 것이 CSS 변수이다. 값을 한군데에 저장해놓고 참조하는 방식으로 사용하면 **값을 수정해야하는 상황이 발생하더라도 한군데에 저장된 값만 수정하면 되므로 편리하다.**

또, 사용자 지정 이름으로 사용하기 때문에 **어디에 사용하는 값인지 이해하기 쉽다**는 장점도 있다.

### 선언 방법

`--` 로 시작하는 속성 이름과 함께, 유효한 CSS 값이라면 어떤 값이든 지정하여 사용할 수 있다.

부모 요소의 변수만 사용할 수 있기 때문에 전역에서 사용할 경우에는 흔히 `:root` 가상 선택자에 선언하여 HTML 문서 어디서든 접근할 수 있도록 한다.

```css
:root {
  --main-color: red;
  --Main-color: yellow; // 대소문자를 구분한다.
}
```

### 사용 방법

사용하야 할 상황에서 `var()` 함수를 사용하고 괄호 내에 변수를 입력해준다.

```css
div {
  background-color: var(--main-color);
}
```

`**var(<custom-property-name>, <declaration-value>)**`

- 첫 번째 인자로는 사용자 지정 속성이름을 입력한다.
- 두 번째 인자로는 첫번째 인자로 들어간 속성이 정의되지 않았을 경우 적용할 값이 들어간다.
- 중첩하여 사용하는 것도 가능하다.

  ```css
  color: var(--main-color, var(--sub-color, red));
  // --main-color 와 --sub-color 가 지정되지 않았을 경우 red를 적용
  ```

### 주의점

브라우저는 변수에 저장된 값들이 어디에 사용될지 모르기 때문에 거의 모든 값을 유효한 것으로 간주한다. 때문에 `var()` 함수를 통해진 값이 유효하지 않은 문맥에서 사용될 수 있다.

브라우저는 유효하지 않은 `var()` 구문을 만나게 된다면, 그 속성의 초기값이나 상속된 값을 사용한다.

```html
<div>내일 새벽에 비온대요</div>
```

```css
:root {
  --text-weight: red;
}
div {
  font-weight: 700;
}
div {
  font-weight: var(--text-weight);
}
```

예시를 브라우저가 읽을 때 브라우저는 `--text-weight`의 값을 대체하지만, red는 font-weight에 유효한 값이 아니므로 적용하지 못한다. 그리고 두 단계를 통해서 이 상황을 처리한다.

1. **font-weight 속성이 상속되었는지를 확인**

   이 경우에는 `<div>` 가 font-weigth 속성과 관련된 부모 엘리먼트가 없다. 그러면 다음 단계로 넘어간다.

2. **값을 default initial value로 처리한다. (초기 설정 기본값)**

   이 경우 font-weight의 기본값인 400으로 처리된다.

⚠️ **전에 선언된 `div` 는 적용되지 않는다.**

만일 사용자가 변수 없이 `font-weight: red` 라고 입력했을 경우에 발생된 문법 에러일 경우에 전에 지정된 선언이 사용된다.

### JavaScript에서 사용하기

속성을 사용하는 것과 같다.

```css
element.style.setPropertoy("--text-weight", 700);
```

참고

- [:root](https://developer.mozilla.org/ko/docs/Web/CSS/:root)
- [사용자 지정 CSS 속성 사용하기 (변수)](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [의사 클래스](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes)
- [::before(:before)](https://developer.mozilla.org/ko/docs/Web/CSS/::before) / [::after (:after)](https://developer.mozilla.org/ko/docs/Web/CSS/::after)
- [CSS 카운터 사용하기](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters)
