---
title: '[django]11. 템플릿 동적 데이터'
date: 2020-11-25
tags: [python, django]
---

- 참고: [장고걸스](https://tutorial.djangogirls.org/ko/dynamic_data_in_templates/)
- [쿼리셋에 대한 장고 공식문서](https://docs.djangoproject.com/en/2.0/ref/models/querysets/)

블로그의 글들은 각각 다른 장소에 나누어져서 저장되어있다.

- `Post` 모델 - `models.py`
- `post_list` 모델 - `views.py`

각각 파일에 위처럼 들어있고, 앞으로는 템플릿도 추가해야한다. 이 장에서는 데이터베이스 안에 저장되어 있는 모델을 가져와 템플릿에 보여주는 걸 할 것이다.

**뷰(view)**는 모델과 템플릿을 연결하는 역할을 한다. `post_list`를 뷰에 보여주고 이를 템플릿에 전달하기 위해서 모델을 가져와야한다. ( 뷰가 템플릿에서 모델을 선택하도록 만들어야 한다. )

1. `blog/views.py`파일을 열고 `post_list`

   ```python
   from django.shortcuts import render
   from .models import Post

   def post_list(request):
       return render(request, 'blog/post_list.html', {})
   ```

   `models`앞에 `.`은 현재 디렉토리 또는 애플리케이션을 의미한다. 동일 디렉터리 내에 `views.py`와 `models.py`가 있기 때문에 `.파일명`으로 내용을 가져올 수 있다.

2. `Post`모델 불러오기, `Post` 모델에서 블로그 글을 가져오기 위해서는 `QuerySet`이 필요하다.

   ```python
   # 글 목록을 게시일`published_date` 기준으로 정렬
   Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
   ```

   ```python
   from django.shortcuts import render
   from django.utils import timezone # timezone 모듈을 사용하기 위해
   from .models import Post

   def post_list(request):
       posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
       return render(request, 'blog/post_list.html', {})

   ```

   아직 `posts` QuerySet을 템플릿으로 보내지 않았다. (다음 장에서 할 것)

   `render`함수에는 매개변수 `request`와 `blog/post_list.html`템플릿이 들어있다. 맨 마지막에 있는 `{}`에 템플릿을 사용하기 위한 매개변수를 추가할 것이다.`{'posts': posts}` `:`이전엔 문자열이 와야한다.

   ```python
   return render(request, 'blog/post_list.html', {'posts': posts})
   ```
