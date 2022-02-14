---
title: "[django]12. 장고 템플릿"
excerpt: ""
category:
  - django
tags: [python, django]
---

참고: [장고걸스](https://tutorial.djangogirls.org/ko/django_templates/)

데이터를 보여주기 위해 장고는 내장된 __템플릿 태그(template tags)__라는 기능을 사용한다.

브라우저는 정적인 HTML만 이해할 수 있고 동적인 파이썬 코드는 이해할 수 없다. 탬플릿 태그는 파이썬을 HTML로 바꿔주어 빠르고 쉽게 동적인 웹 사이트를 만들 수 있게 도와준다!



### post 목록 템플릿 보여주기

이전에 글 목록이 들어있는 `posts`변수를 템플릿에 넘겨주었다. 이제 넘겨진 `posts`변수를 받아 HTML에 나타나도록 해볼 차례이다. 

- 장고 템플릿 안에 있는 값을 출력하려면 변수 이름 안에 중괄호를 넣어 표시해야 한다.
`blog/templates/blog/post_list.html`
  
  ```python
  {% raw %}{{ posts }}{% endraw %} # <QuerySet [<Post: 신기하구만>, <Post: Sample title>]>
  ```
- 목록 보여주기 ( for )

  ```python
  {% raw %}{% for post in posts %}
  	{{ post }}
  {% endfor %}{% endraw %}
  ```

- HTML과 template tags를 섞어서 사용할 수 있다.

  ```python
  {% raw %}{% for post in posts %}
      <div>
          <p>published: {{post.published_date}}</p>
          <h1><a href="">{{post.title}}</a></h1>
          <p>{{post.text|linebreaksbr}}</p>
      </div>
  {% endfor %}{% endraw %}
  ```

  `{% raw %}{% for %}{% endraw %}`와 `{% raw %}{% endfor %}{% endraw %}` 사이에 넣은 모든 것은 목록의 모든 객체를 반복하게 된다.

  `Post`모델에서 정의한 각 필드의 데이터에 접근하기 위해 `{% raw %}{{ post.title }}{% endraw %}`, `{% raw %}{{ post.text }}{% endraw %}`와 같은 표기법을 사용한다. 또한 `|linebreaker`와 같은 파이프문자 (`|`)도 사용한다. `|linebreaker`는 블로그 글 텍스트에서 행이 바뀌면 문잔으로 변환하도록 하라는 의미이다. 행바뀜을 문단으로 변환하는 필터를 적용한다는 표현으로 쓰기도 합니다.

- 이제 github에 push하고 pythonanywhere에서 pull을 받고 web 탭에서 리로드후 변경이 적용되었는지 확인한다.

  - 로컬서버에서 확인한 게시물과 동일하지 않은 것이 정상임 로컬 컴퓨터와 파이썬에니웨어의 데이터베이스는 동기화 되지 않는다.
  - url에 `/admin`을 추가하여 관리자페이지로 이동 후 게시물을 추가하면 올바르게 작동하는 것을 볼 수 있다.

  

