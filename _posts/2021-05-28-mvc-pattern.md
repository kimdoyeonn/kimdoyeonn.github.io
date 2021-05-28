---
title: "[Java]MVC 패턴이란?"
excerpt: ""
category:
  - Java
tags: [Java]
---

[참고](https://universitytomorrow.com/35)

### MVC(Model-View-Controller)

- 소프트웨어 디자인 패턴

  소프트웨어 디자인 패턴이란 어떠한 소프트웨어를 제작하고 유지보수할 때 필요한 부분들을 사전에 나눠놓고, 효율적으로 관리할 수 있도록 설계하는 것이다.

MVC패턴은 구조를 크게 Model, View, Controller로 나뉘는데, 간단히 말하면

- Model은 애플리케이션의 정보, 데이터를 말하고,
- View는 텍스트, 체크박스 등과 같은 사용자 인터페이스 요소 부분이고,
- Controller는 데이터와 비지니스 로직 사이의 상호작용을 관리하는 부분을 말한다.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4501c303-d417-4e55-9bd1-6a231dbbfeb1/Untitled.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210528%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210528T132105Z&X-Amz-Expires=86400&X-Amz-Signature=6783793c3678de9d0cebcbd7f4b46157458cc7c5c7d593e1953345242b5fdebd&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.jpeg%22)

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
