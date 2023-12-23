---
title: '[django]18. 미리보기로 블로그 글 저장하기'
date: 2020-12-05
tags: [python, django]
---

- 참고: [장고걸스](https://tutorial-extensions.djangogirls.org/ko/homework)

### 미리보기로 블로그 글 저장하기

지금은 새 글을 작성하면 바로 발행이 된다. 미리보기로 글을 저장하려면 `blog/views.py`파일에서 `post_new`와 `post_edit` 메소드에 다음 줄을 삭제하세요

```python
post.published_date = timezone.now()
```

이렇게 하면 새로 작성한 글이 바로 게시되지 않고 미리 볼 수 있는 초안으로 저장됩니다.

이제부터 작성된 글과 목록을 미리 볼 수 있도록 해봅시다!

### 게시되지 않은 블로그 글 목록 페이지 만들기

기본 튜토리얼에서 배웠던 QuerySet을 사용할거에요. 기본 튜토리얼에서는 블로그 게시물만 보여주는 `post_list`를 만들었다. (기본값이 들어가는 `publisged_date`도 포함)

이번에도 비슷한 것을 해볼 건데 임시저장(draft) 기능을 구현할거에요

새 글 추가하기 버튼 근처에 `blog/templates/blog/base.html`링크를 추가하세요(`<h1>`태그 위)

```html
<a href="{% url 'post_draft_list' %}" class="top-menu"
  ><span class="glyphicon glyphicon-edit"></span
></a>
```

- url `blog/urls.py`

  ```python
   path('drafts/', views.post_draft_list, name="post_draft_list"),
  # django1.x일 경우
  # url(r'^drafts/$', views.post_draft_list, name='post_draft_list'),
  ```

- view `blog/views.py`

  ```python
  def post_draft_list(request):
      posts = Post.objects.filter(published_date__isnull=True).order_by('created_date')
      return render(request, 'blog/post_draft_list.html', {'posts':posts})
  ```

  `published_date__isnull=True` - 발행되지 않은 글 목록을 가져옴

  `order_by('created_date')`- `created_date` 필드에 대해 오름차순 정렬을 수행

- template `blog/templates/blog/post_draft_list.html`

  ```html
  {% extends 'blog/base.html' %} {% block content %} {% for post in posts %}
  <div class="post">
    <p class="date">created: {{ post.created_date|date:'d-m-Y' }}</p>
    <h1><a href="{% url 'post_detail' pk=post.pk %}">{{ post.title }}</a></h1>
    <p>{{ post.text|truncatechars:200 }}</p>
  </div>
  {% endfor %} {% endblock %}
  ```

### 게시 버튼 추가하기

`blog/templates/blog/post_detail_list.html`

```html
{% if post.published_date %}
<div class="date">
  {{ post.published_date }}
</div>
{% else %}
<a class="btn btn-default" href="{% url 'post_publish' pk=post.pk %}"
  >Publish</a
>
{% endif %}
```

- `published_date`필드가 비었을 때, `<a>`태그의 내용으로 실행됩니다. pk가 넘어감

- url `blog/urls.py`

  ```python
  path('post/<pk>/publish/', views.post_publish, name='post_publish')
  ```

- view `blog/views.py`

  ```python
  def post_publish(request, pk):
      post = get_object_or_404(Post, pk=pk)
      post.publish()
      return redirect('post_detail', pk=pk)
  ```

- model `blog/models.py`에서 `Post`모델을 만들 때 다음과 같이 작성했었음!

  ```python
  def publish(self):
      self.published_date = timezone.now()
      self.save()
  ```

### 게시글 삭제하기

`blog/templates/blog/post_detail.html`을 열어 다음 코드를 추가한다. edit 버튼 아래에 추가

```html
<a class="btn btn-default" href="{% url 'post_remove' pk=post.pk %}"
  ><span class="glyphicon glyphicon-remove"></span
></a>
```

이제 URL이 필요하다(`blog/urls.py`)

```python
path('post/<pk>/remove/',views.post_remove, name='post_remove'),
```

이젠 `view`를 만들어보자! `blog/views.py`를 열고 다음 코드를 추가한다.

```python
def post_remove(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()
    return redirect('post_list')
```

이제 블로그 게시글을 지울 수 있다. 모든 장고 모델은 `.delete()`를 사용하면 지울 수 있다!

`redirect`를 사용하여 게시글이 삭제된 후에 `post_list`페이지로 이동하게 만들었다.
