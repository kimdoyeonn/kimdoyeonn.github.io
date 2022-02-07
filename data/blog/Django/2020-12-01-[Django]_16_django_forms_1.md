---
title: '[django]16. 장고 폼-1'
excerpt: ''
category:
  - django
tags: [python, django]
---

- 참고: [장고걸스](https://tutorial.djangogirls.org/ko/django_forms/)

{% raw %}

- 관리자 기능을 거치지 않고 바로 글을 추가하거나 수정하는 기능 추가 (`form`)

- 장고는 아무런 준비 없이도 `form`을 만들 수 있고, `ModelForm`을 생성해 자동을 모델에 결과물을 저장할 수 있다.

- 폼을 만들어서 `Post`모델에 적용해보기

  1. 폼만의 `forms.py`생성

     ```
     blog
      └── forms.py
     ```

     ```python
     from django import forms

     from .models import Post

     class PostForm(forms.ModelForm):

         class Meta:
             model = Post
             fields = ('title', 'text',)
     ```

     - forms model을 import하고 `Post` model도 import함
     - `PostForm` - 폼의 이름
     - `forms.ModelForm` - 장고에 이 폼이 `ModelForm`인 것을 알려줌
     - `class Meta` - 이 폼을 만들기 위해서 어떤 model이 쓰여야 하는지 장고에 알려줌 (`model = post`)
     - `fields = ('title','text',)` - 폼에 필드를 넣어줌, `title`, `text`만 보여지게 됨 `author`는 현재 로그인 하고 있는 사람이 될 것이고, `created_date`는 글이 등록되는 시간이 될 것이다.

     이제 뷰에서 이 폼을 사용해 템플릿에 보여주기만 하면 됩니다. (링크, URL, 뷰, 템플릿 만들기)

### 폼과 페이지 링크

`blog/templates/blog/base.html`에서 class가 `page-header`인 `div`에 링크를 추가

```html
<a href="{% url 'post_new' %}" class="top-menu">
  <span class="glyphicon glyphicon-plus"></span>
</a>
```

새로운 뷰 `post_vew`이고 부트스트랩 테마에 있는 `glyphicon glyphicon-plus`클래스로 더하기 기호가 보이게 된다.

- 이 상태로 실행하면 `NoReverseMatch`에러 발생

### URL

`blog/urls.py`에 코드 추가

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/<int:pk>/', views.post_detail, name='post_detail'),
    path('post/new/', views.post_new, name='post_new'),
]
```

- 사이트를 다시 불러오면 `AttributeError`가 발생하는데 `post_new` 뷰를 구현하지 않았기 때문에 발생한다.

### `post_new` view

`blog/views.py`에서 from 줄 아래 코드 추가

```html
from django.shortcuts import render, get_object_or_404 from django.utils import timezone from
.models import Post from .forms import PostForm def post_list(request): posts =
Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date') return
render(request, 'blog/post_list.html', {'posts':posts}) def post_detail(request, pk): post =
get_object_or_404(Post, pk=pk) return render(request, 'blog/post_detail.html', {'post': post}) def
post_new(request): form = PostForm() return render(request, 'blog/post_edit.html', {'form': form})
```

### 템플릿

`blog/templates/blog/post_edit.html`파일을 생성해 폼이 작동할 수 있게 만든다.

- 머저 폼이 보여야 합니다. `{{ form.as_p }}`

- 위 코드를 HTML `form` 태그로 감싼다. `<form method="POST">...</form>`

- `Save`버튼 - `<button type="submit">Save</button>`

- 마지막으로 `<form ...>`에 `{% csrf_token %}`을 추가한다. 이 작업은 폼 보안을 위해 중요합니다! 이 작업을 빼놓고 저장하면 장고는 아래와 같은 에러를 발생시킬거에요 (로컬에서는 발생시키지 못함...)

  `![CSFR Forbidden page](https://tutorial.djangogirls.org/ko/django_forms/images/csrf2.png)

```html
{% extends 'blog/base.html' %} {% block content %}
<h1>New post</h1>
<form method="POST" class="post-form">
  {% csrf_token %} {{ form.as_p}}
  <button type="submit" class="save btn btn-default">Save</button>
</form>
{% endblock %}
```

- 여기서 화면을 다시 불러올 경우 화면은 나오지만 저장해도 새 글은 추가되지 않습니다! - `view 추가작업 필요!`

### 폼 저장하기

`blog/views.py`

```python
def post_new(request):
    form = PostForm()
    return render(request, 'blog/post_edit.html', {'form': form})
```

폼을 제출할 때 같은 뷰를 불러온다. 이 때 `request`에는 우리가 입력한 데이터가 있는데, `request.POST`가 가지고 있습니다. ( `POST`는 글 데이터를 등록하는(posting)하는 것을 의미한다. 블로그 글을 의미하는 post와는 관련 없음) HTML의 `<form>` 태그의 `method = "POST"`속성에 따라 POST로 넘겨진 폼 필드의 값들은 `request.POST`에 저장됩니다.

이제 view에서 두 상황을 나누어 처리해볼 것이다.

1. 처음 페이지에 접속했을 때: 새 글을 쓸 수 있게 폼이 비어있어야한다.
2. 폼에 입력된 데이터를 view 페이지로 가지고 올 때: 조건문을 추가시켜야한다.(`if`)

```python
if request.method == 'POST':
    form = PostForm(request.POST)
else:
    form = PostForm()
```

- 만약 `method`가 `POST`라면, 폼에서 받은 데이터를 `PostForm`으로 넘겨줘야하므로 `form = PostForm(request.POST)`

이제 폼에 들어있는 값들이 올바른지 확인해야한다. (모든 필드에는 값이 있어야 하고 잘못된 값이 있다면 저장되지 않아야한다) - `form.is_valid()` 사용

```python
if form.is_valid():
    post = form.save(commit=False)
    post.author = request.user
    post.published_date = timezone.now()
    post.save()
```

- 여기서의 작업은 일반적으로 두 단계로 나눌 수 있다. 하나는 `form.save()`로 폼을 저장하는 작업, 나머지 하나는 작성자를 추가하는 작업이다. (`PostForm`에는 작성자 필드가 없지만, 필드 값은 필요함!)
- `commit=False`란 넘겨진 데이터를 바로 `Post` 모델에 저장하지는 말라는 뜻입니다. (작성자를 추가한 후 저장해야하기 때문) 대부분의 경우에는 `commit=False`를 사용하지 않고 `form.save()`를 사용해서 저장한다. 다만 여기서는 작성자 정보를 추가하고 저장해야 하므로 `commit=False`를 사용하는 것입니다.
- `post.save()`는 변경사항(작성자정보가 포함된)을 유지할 것이고 새 블로그 글이 만들어 질것이다.

끝으로 새 블로그 글을 작성한 다음에 `post_detail`페이지로 이동하기

```python
from django.shortcuts import redirect
...
			return redirect('post_detail',pk=post.pk)
```

- 새로 작성한 글을 볼 수 있도록 `post_detail`페이지로 가라고 수정한다.
- `post_detail`은 이동해야한 뷰 이름
- `post_detail`에는 `pk`가 필요하기 때문에 `pk=post.pk`를 사용하여 뷰에게 값을 넘겨준다. 여기서 `post`는 새로 생성한 블로그 글

{% endraw %}
