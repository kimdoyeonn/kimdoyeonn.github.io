---
title: '[Java] MVC 패턴이란?'
date: 2021-05-28 00:02:22
category: Java
thumbnail: { thumbnailSrc }
draft: false
---

[참고](https://universitytomorrow.com/35)

## MVC(Model-View-Controller)

- 소프트웨어 디자인 패턴

  소프트웨어 디자인 패턴이란 어떠한 소프트웨어를 제작하고 유지보수할 때 필요한 부분들을 사전에 나눠놓고, 효율적으로 관리할 수 있도록 설계하는 것이다.

MVC패턴은 구조를 크게 Model, View, Controller로 나뉘는데, 간단히 말하면

- Model은 애플리케이션의 정보, 데이터를 말하고,
- View는 텍스트, 체크박스 등과 같은 사용자 인터페이스 요소 부분이고,
- Controller는 데이터와 비지니스 로직 사이의 상호작용을 관리하는 부분을 말한다.

![image](https://user-images.githubusercontent.com/53068706/120201975-ff408700-c260-11eb-8e57-ff50452b6a41.png)

- 파란선은 직접적인 관계, 빨간선은 간접적인 관계를 말한다.

### Model

- 모델의 상태에 변화가 있을 때 컨트롤러와 뷰에 모델에 변화가 있음을 통보한다. 이와 같은 과정을 통해서 뷰는 가장 최근의 결과를 보여줄 수 있고, 컨트롤러는 모델의 변화에 따른 적용 가능한 명령을 추가-수정할 수 있다.
- ex. 처리되는 알고리즘, DB와의 상호작용, 데이터 등

### View

- 사용자에게 보여지는 화면으로, 뷰는 사용자가 볼 결과물을 생성하기 위해 모델로부터 정보를 얻어온다.
- ex. UI

### Controller

- 모델에 명령을 보냄으로써 모델의 상태를 변경할 수 있다. (ex. 한글파일을 수정)
- 또한, 뷰에 명령을 보냄으로써 모델의 표시방법을 바꿀 수 있다. (ex. 한글 문서에서 스크롤하여 내리면 사용자에게 보여지는 화면이 변경됨)

### MVC 패턴의 장점(사용하는 이유)

간단히 말하면 효율적인 유지보수를 위해서 라고 할 수 있다.

사용자가 보는 페이지(view), 데이터처리(model) 그리고 이를 제어하는 컨트롤러(controller)로 각각 분리하여 프로그램을 개발하면, 중복 개발되는 부분을 방지할 수 있어 개발시 효율성이 증대될 뿐아니라, 추후 프로그램의 유연한 확장성을 기대할 수 있고, 어떠한 부분에서 문제가 발생하더라도 다른 부분에 최소한의 영향을 주며 변경할 수 있다.

### MVC 패턴의 단점

컨트롤러가 모델과 뷰에 대한 모든 처리를 담당하고 있기 때문에, 어느 선까지는 효율적인 괄니가 가능하지만 프로그램이 복잡하고 무거운 대규모 프로젝트에서는 컨트롤러에 업무가 과중될 수 있다.

개발과 유지보수가 용이하도록 설계된 모델이긴하지만 일정 수준 이상의 복잡한 프로젝트에서는 수정시 테스트가 힘들고, 하나의 수정이 다른 부분에 영향을 미치는 등 역효과가 날 가능성이 있다.

이러한 문제점을 개선할 수 있는 다양한 방법이 고안되었는데, MVP, MVVM 등이 그 예이다.
