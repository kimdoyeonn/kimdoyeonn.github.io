---
title: "[django]17. 장고 폼-2"
excerpt: ""
category:
  - django
tags: [python, django]
---

- 참고: [장고걸스](https://tutorial.djangogirls.org/ko/django_forms/)



### 폼 검증하기

블로그 글은 `title`과 `text` 필드가 반드시 있어야 해요. 우리가 만든 `Post` 모델에서는 이 필드 값들이 필요 없다고 했지만 (`published_date` 제외) 장고는 모두 기본 값을 설정되어 있다고 생각합니다. 폼에 값을 입력하지 않고 저장할 경우 값이 넘어가지 않음



### 폼 수정하기

- `blog/templates/blog/post_detail.html` 파일에 다음 코드를 추가 - 수정 버튼

```html
<a class="btn btn-default" href="{% url 'post_edit' pk=post.pk %}"><span class="glyphicon glyphicon-pencil"></span></a>
```

- `blog/urls.py`에 다음 코드를 추가 - 수정 url

```python
path('post/<int:pk>/edit/', views.post_edit, name='post_edit'),
```

- 템플릿은 `blog/templates/blog/post_edit.html`템플릿을 재사용

- view 만들기 : `blog/views.py`에 파일 추가

  ```python
  def post_edit(request, pk):
      post = get_object_or_404(Post, pk=pk)
      if request.method == "POST":
          form = PostForm(request.POST, instance=post)
          if form.is_valid():
              post = form.save(commit=False)
              post.author = request.user
              post.published_date = timezone.now()
              post.save()
              return redirect('post_detail', pk=post.pk)
      else:
          form = PostForm(instance=post)
      return render(request, 'blog/post_edit.html', {'form': form})
  ```

  `post_new`와 거의 비슷해보이지만 완전히 같지는 않아요

  1. url로부터 추가로 `pk`매개변수를 받아서 처리합니다.
  2. `get_object_or_404(Post, pk=pk)`를 호출하여 수정하고자 하는 글의 `Post` 모델 `instance`로 가져옵니다. (`pk`로 원하는 글을 찾습니다.) 이렇게 가져온 데이터는 폼을 만들 때(수정하려면 이미 저장된 글을 가져와야됨)와 폼을 저장할 때 사용하게 됩니다.



[장고 폼 관련 공식 문서](https://docs.djangoproject.com/en/2.0/topics/forms/)



### 보안

지금은 웹사이트를 방문하는 누구든지 글을 쓸 수 있어요. 이번엔 나에게만 보이고 다른 사람에게는 보이지 않는 버튼을 만들어 볼게요

`blog/templates/blog/base.html`파일에서 `page-header div`를 찾아 다래와 같이 작성된 a태그를 찾습니다.

```html
<a href="{% url 'post_new' %}" class="top-menu"><span class="glyphicon glyphicon-plus"></span></a>
```

여기에 `{% if %}`태그를 추가해 관리자로 로그인한 유저들만 링크가 보일 수 있게 만들거에요

```html
{% if user.is_authenticated %}
    <a href="{% url 'post_new' %}" class="top-menu"><span class="glyphicon glyphicon-plus"></span></a>
{% endif %}
```

이 `{% if %}`는 브라우저에 페이지를 요청하는 사용자가 로그인상태일 경우 링크가 나타나게 만듭니다. 이것은 새 게시글을 완전히 보호해주는 것은 아니지만, 바람직한 방법입니다.



`blog/templates/blog/post_detail.html` 파일을 열어 다음 코드를 찾습니다.

```html
<a class="btn btn-default" href="{% url 'post_edit' pk=post.pk %}"><span class="glyphicon glyphicon-pencil"></span></a>
```

다음 코드로 수정해줍니다.

```html
{% endif %}
{% if user.is_authenticated %}
	<a class="btn btn-default" href="{% url 'post_edit' pk=post.pk %}"><span class="glyphicon glyphicon-pencil"></span></a>
{% endif %}
```

새 브라우저나 시크릿창을 실행해보면 게시글 추가, 수정 링크가 뜨지 않는 것을 볼 수 있어요!



### 배포





