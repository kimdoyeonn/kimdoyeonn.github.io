---
title: "[django]2. 장고란?"
excerpt: ""
category:
  - django
tags: [python, django]
---

참고: [장고걸스](https://tutorial.djangogirls.org/ko/django/)

- Django는 파이썬으로 만들어진 무료 오픈소스 웹 애플리케이션 프레임워크(web application framework)이다.
- 쉽고 빠르게 웹 사이트를 개발할 수 있도록 돕는 구성요소로 이루어진 웹 프레임워크

#### urlresolver

- 웹서버에 요청이 오면 장고로 전달되고 장고 urlresolver는 웹페이지의 주소를 가져와 무엇을 할지 확인한다.
- urlresolver는 패턴 목록을 가져와 URL과 맞는지 처음부터 하나씩 대조해 식별하고 맞는 패턴이 있으면 장고는 해당 요청을 관련된 함수(view)에 넘겨준다.
- 주소와 번지가 일치하면 그곳에 편지를 배달하는 집배원과 같은 역할

#### view 함수

- 특정 정보를 데이터베이스에서 찾을 수 있다. 
- 수정: 수정권한이 있는지 확인 후, 수정, 알림
- 장고는 그 알림을 받아서 사용자의 웹 브라우저로 보내주는 역할을 한다.

