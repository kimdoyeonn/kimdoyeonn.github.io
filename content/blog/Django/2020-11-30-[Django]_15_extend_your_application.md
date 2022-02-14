---
title: '[django]15. 프로그램 애플리케이션 확장하기'
tags: [python, django]
---

- 참고: [장고걸스](https://tutorial.djangogirls.org/ko/extend_your_application/)

{% raw %}

- 지금까지 웹 사이트 제작단계를 모두 마쳤습니다. model, url, view, template을 만드는 방법을 알게 되었고 웹사이트를 꾸미는 방법도 알게 되었어요!
- 이제 블로그 게시글이 각 페이지마다 보이게 만들어 봅시다!
- 이미 앞에서 `Post`모델은 만들었으니 `models.py`에 새로 추가할 내용은 없어요

### Post에 템플릿 링크 만들기

`blog/templates/blog/post_list.html`파일에 링크를 추가한다. (제목부분)

```html
<h1><a href="{% url 'post_detail' pk=post.pk %}">{{ post.title }}</a></h1>
```

`{% url 'post_detail' pk=post.pk %}`에서 `{% %}`는 장고 탬플릿 태그를 말합니다.

`blog.views.post_detail`는 `post_detail` view의 경로입니다. 여기서 `blog`는 응용프로그램의 이름이고, `views`는 `views.py` 파일 명, `post_detail`은 view의 이름입니다.

`pk = post.pk`에서 `pk`는 데이터베이스의 각 레코드를 식별하는 기본키 (`Primary Key` )의 줄임말 입니다. Post 모델에서 기본 키를 지정하지 않았기 때문에 장고는 `pk`라는 필드를 추가해 새로운 게시글이 추가 될 때마다 그 값이 1,2,3,,, 으로 증가하게 됩니다. Post 객체의 다른 필드 (제목, 작성자 등)에 엑세스하는 것과 같은 방식으로 post.pk를 작성하여 기본 키에 엑세스 합니다. `post.pk`를 써서 기본키에 접근할 수 있고 같은 방법으로 다른 필드 (`title`, `auther`)에도 접근할 수 있다. (? 앞 문장이랑 같은 말?)

- 이대로 실행을 할 경우 `post_detail` view를 만들지 않았기 때문에 오류 메세지가 나옵니다.

### Post 상세 페이지 URL 만들기

`blog/urls.py` 파일에 URL을 만들어 장고가 `post_detail` view로 보내 게시글이 보일 수 있게 해봅시다. 파일 안에 `urlpatterns` 안에 아래 코드를 추가해준다. `views.post_detail`이라는 뷰를 `post_detail`이라 이름붙이도록 하는 코드, 이는 장고가 `post_detail`이라는 이름을 해석할 떄, `post/views.py` 파일 내부의 `post_detail`이라는 뷰 함수로 이해할 수 있도록 해준다.

```python
path('post/<int:pk>/', views.post_detail, name='post_detail')
```

`post/<int:pk>/`는 URL 패턴을 나타낸다.

- `post/`는 URL이 post 문자를 포함해야한다는 것을 말합니다.
- `<int:pk>`: 장고가 정수 값을 기대하고 이를 `pk`라는 변수로 뷰로 전송한다는 것을 의미함
- `/`는 다음에 /가 한 번 더 와야 한다는 의미

브라우저에 `http://127.0.0.1:8000/post/5/`라고 입력하면 장고는 `post_detail` 뷰를 찾아 매개변수 `pk`가 `5`인 값을 찾고 뷰로 전달합니다.

- 이대로 실행할 경우 뷰가 없기 때문에 에러가 남!

### Post 상세 페이지 내 뷰 추가하기

`blog/views.py`에 매개변수 `pk`를 포함하는 함수를 추가해봅시다. `def post_detail(request, pk):`라고 정의합니다. urls(`pk`)와 동일하게 이름을 사용해야 합니다. 변수를 생략할 경우에도 오류 발생

```python
Post.objects.get(pk=pk) # 블로그 게시물 한 개만 볼 경우 쿼리셋
```

만약 해당 `primary key( pk )`의 `Post`를 찾지 못하면 오류가 날 거에요 장고에서는 이를 해결하기 위해 `get_object_or_404`라는 기능을 제공해요 `pk`에 해당하는 `Post`가 없을 경우 `404`페이지를 보여주는 기능이에요 이 페이지는 원하는 대로 꾸미는 것도 가능해요

```python
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Post

def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'blog/post_list.html', {'posts':posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'blog/post_detail.html', {'post': Post})
```

- 메인 페이지는 실행되지만 게시글의 제목을 클릭할 경우 템플릿이 없기 때문에 오류남!

### Post 상세 페이지 템플릿 만들기

`blog/templates/blog` 디렉터리 안에 `post_detail,html`파일을 생성하고 아래의 코드를 작성해준다.

```html
{% extends 'blog/base.html' %} {% block content %}
<div class="post">
  {% if post.published_date %}
  <div class="date">
    {{ post.published_date }}
  </div>
  {% endif %}
  <h1>{{ post.title }}</h1>
  <p>{{ post.text|linebreaksbr }}</p>
</div>
{% endblock %}
```

`base.html`을 다시 한 번 확장 한 것이다. `content` 블록에서 블로그 글의 게시일, 제목, 내용을 보이게 만들었다.

가장 중요한 부분은 `{% if ... %}...{% endif %}`라는 템플릿 태그인데, 내용이 있는지 확인할 때 사용한다. (`post`의 `published_date`가 있는지)

- 이제 실행되는 것을 확인할 수 있다! pythonanywhere로 보내서 배포해보자!

{% endraw %}
