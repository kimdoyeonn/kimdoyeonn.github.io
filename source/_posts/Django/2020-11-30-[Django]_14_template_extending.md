---
title: "[django]14. 템플릿 확장하기"
excerpt: ""
category:
  - django
tags: [python, django]
---

- 참고: [장고걸스](https://tutorial.djangogirls.org/ko/template_extending/)



### 템플릿 확장(template extending)

- 웹사이트 안의 서로 다른 페이지에서 HTML의 일부를 동이랗게 재사용 할 수 있다.
- 동일한 정보/레이아웃을 사용하고자 할 때, 모든 파일마다 같은 내용을 반복해서 입력할 필요가 없게된다.
- 뭔가 수정할 부분이 생겼을 때 모든 파일을 수정할 필요 없이 한번만 수정하면 된다.

{% raw %}

#### 기본 템플릿 생성하기

- 웹사이트 내 모든 페이지에 확장되어 사용되는 가장 기본적인 템플릿 생성

`blog/templates/blog/base.html`파일 만들기

```
blog
└───templates
    └───blog
            base.html
            post_list.html
```

`base.html`에 `post_list.html`의 내용을 복붙하고 `<body>`를 수정해준다.

```html
<body>
    <div class="page-header">
        <h1><a href="/">Django Girls Blog</a></h1>
    </div>
    <div class="content container">
        <div class="row">
            <div class="col-md-8">
            {% block content %}
            {% endblock %}
            </div>
        </div>
    </div>
</body>
```

`{% block %}`으로 HTML 내에 들어갈 수 있는 공간을 만든 것이다. `base.html`을 확장해 다른 템플릿에도 가져다 쓸 수 있게 한 것

- 동작 방법

  `post_list.html`에서 `{% for post in posts %}`부터 `{% endfor %}`를 제외하고 모두 지운다. 그리고 이 코드는 컨텐츠 블록에 대한 템플릿의 일부로 쓰이게 된다.

  ```html
  {% extends 'blog/base.html' %}
  {% block content %}
  {% for post in posts %}
      <div class='post'>
          <div class='date'>
              <p>published: {{post.published_date}}</p>
          </div>
          <h1><a href="">{{post.title}}</a></h1>
          <p>{{post.text|linebreaksbr}}</p>
      </div>
  {% endfor %}
  {% endblock %}
  ```

  `{% extends 'blog/base.html' %}`는 파일에 제일 첫줄에 작성해야한다. 실행해보면 잘 되는 것을 확인할 수 있음{% endraw %}

