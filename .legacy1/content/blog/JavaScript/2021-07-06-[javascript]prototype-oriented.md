---
title: '[javascript]프로토타입 기반 언어'
tags: [javascript]
---

위키피디아에 따르면 다음과 같이 정의되어 있다.

> 프로토타입 기반 언어는 클래스 기반 언어에서 상속을 사용하는 것과는 다르게, 객체를 원형(프로토타입)으로 하는 복제 과정을 통해 객체의 동작 방식을 재사용 할 수 있게 한다.

![](https://cloud.githubusercontent.com/assets/2888775/15846032/1de7ec4a-2cb4-11e6-9cb2-32ecd69bc2a9.png)

프로토타입 기반 언어는 원형 객체를 복제하여 새로운 객체를 생성하는 언어를 말한다.

하지만 자바스크립트는 약간 다른 방식으로 동작하는데, 복제가 아닌 프로토타입 링크를 통해 원형을 참조한다.

### 자바스크립트 객체의 프로토타입 링크

> 자바스크립트에서 단순 원시 타입(simple primitive)인 문자열, 숫자, 불리언, null, undefined를 제외한 모든 타입은 객체다.

자바스크립트에서는 배열도 객체고 함수도 객체이다.

![](https://miro.medium.com/max/1400/1*PZe_YnLftVZwT1dNs1Iu0A.png)

자바스크립트에서 객체는 원형 객체로부터 생성되며, 생성된 객체는 원형에 대한 프로토타입 링크(`__proto__`)를 가지게 된다.

> `__proto__`는 원형에 대한 참조 정보를 갖고 있는 객체의 내부 속성으로, ES6부터는 표준으로 제정되었다.

생성된 객체는 `prototype`이라는 속성을 통해 Prototype Object에 접근할 수 있다. Prototype Object는 일반적인 객체와 같으며 기본적인 속성으로 `constructor`와`__proto__`를 가지고 있다.

- `constructor`는 Prototype Object와 같이 생성되었던 함수를 가리키고 있다.
- `__proto__`는 Prototype Link이다.

원형 또한 객체이기 때문에 원형은 또 다른 원형을 참조하게 되고, 다음 그림과 같은 연속된 프로토타입 링크를 통해 자바스크립트 객체의 최종 원형인 `Object.prototype`까지 연결된다.

![](https://cloud.githubusercontent.com/assets/2888775/15841811/f14b233e-2c8e-11e6-988d-6ea081b4c984.png)

> Object.prototype 객체에는 toString, hasOwnProperty 함수 등과 같이 자바스크립트 객체에서 흔히 사용하던 속성들이 정의되어 있고, 그로 인해 모든 객체에서 해당 속성들을 사용할 수 있다.

그림과 같이 객체 간에 형성되어있는 일련의 링크를 **프로토타입 체인**이라고 부른다.

**프로토타입 체인**

우선 foo라는 객체에 다음과 같이 속성을 정의한다.

![](https://cloud.githubusercontent.com/assets/2888775/15841819/ff4e643c-2c8e-11e6-9e3d-ea0df8075206.png)

`foo.a`는 1을, `foo.b`는 2를 반환한다. 그렇다면 `foo` 객체에 정의되지 않은 `foo.c`를 호출하게 되면 어떤 값을 반환할까? undefined를 반환할까?

`foo` 객체의 프로토타입 체인을 보기 전까지 알 수 없다.

![](https://cloud.githubusercontent.com/assets/2888775/15841859/401afff2-2c8f-11e6-81e7-63cc13fc6977.png)

이것이 `foo` 객체의 프로토타입 체인이다. 이 체인에서 `foo.c`는 무엇을 반환할까?

`foo` 객체의 속성에 접근하게 되면 프로토타입 체인은 호출한 `foo` 객체의 속성부터 `Object.prototype`까지 프로토타입 링크를 따라 차례차례 탐색하기 시작한다. 위 그림에서는 '원형객체2'에 `c`가 정의되어 있기 때문에 `foo.c`는 `undefined`가 아닌 7을 반환한다.

만약, 체인 상의 어떤 객체에도 존재하지 않는 `foo.d`에 접근하게 된다면 프로토타입 체인의 최종 원형인 `Object.prototype`까지 탐색한 후 값이 없음을 확인하고 `undefined`를 반환한다.

자바스크립트에서는 객체 속성에 접근하게 되면 해당 객체의 속성들만 탐색한 후 결과를 반환하는 것이 아니라, 최종 원형인 `Object.prototype`까지 탐색한 후 결과를 반환한다는 것을 기억하자

### `Object.create` 함수로 자바스크립트의 프로토타입 체인 구현하기

ES5 이전에는 프로토타입 체인을 구현하려면 무조건 생성자 함수와 `new` 연산자를 사용해야 했다.

> new 연산자 사용은 ES5 이전의 유일한 객체 생성 방법이며 리터럴(literal) 방식도 내부적으로는 new 연산자를 사용한다.

그러나 클래스 기반 언어를 따라 한 `new` 연산자는 프로토타입 체인을 복잡하게 만들어, 사용자로 하여금 프로토타입 체인에 대한 구현을 어렵게 했다.

![](https://cloud.githubusercontent.com/assets/2888775/15843258/a6c97614-2c9b-11e6-8771-15de4f7ed58b.png)

다행스럽게도 ES5부터는 `Object.create`라는 프로토타입 언어의 특징을 잘 살려 객체를 생성할 수 있는 새로운 방법을 제공한다.

> Object.create 함수는 ES5부터 지원하는 함수이며, 인자로 전달된 객체를 원형으로 하는 새로운 객체를 생성하는 기능을 한다.

ES5를 지원하지 않는 브라우저에서 `Object.create`를 사용하려면 MDN에서 제공하는 폴리필을 추가하면 된다.

**출처**

[https://ui.toast.com/weekly-pick/ko_20160603](https://ui.toast.com/weekly-pick/ko_20160603)
