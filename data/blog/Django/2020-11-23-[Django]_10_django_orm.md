---
title: '[django]10. 장고 ORM과 쿼리셋(QuertSets)'
excerpt: ''
category:
  - django
tags: [python, django]
---

- 참고: [장고걸스](https://tutorial.djangogirls.org/ko/django_orm/)

### ORM

- 각 언어별로 있는 기능
- 원래 데이터베이스 서버의 어떤 데이터를 조회, 추가, 수정, 삭제 등을 할 때는 sql이라는 언어를 사용해야하는데 sql을 사용하지 않고 파이썬이라면 파이썬 코드로, 자바라면 자바 코드로, 각 언어 그대로를 활용해서 sql 코드를 만들어 내는 라이브러리가 있다. 그걸 ORM이라고 한다.
- `Django Model`이 장고의 ORM이다.

### 쿼리셋

- 전달받은 모델의 객체 목록
- 쿼리셋은 데이터베이스로부터 데이터를 읽고, 필터를 걸거나 정렬한다.

### 장고 쉘

로컬 콘솔에서

```
myvenv/Scripts/activate
(myvenv) python manage.py shell
.
.
.
(InteractiveConsole)
>>>
```

위와 같은 문자열이 뜨면 장고 인터렉티브 콘솔(interactive console)로 들어온 것이다. 파이썬 프롬프트와 비슷하지만 장고만의 기능을 사용할 수 있는 곳이기도 하다. 파이썬의 모든 명령어도 사용할 수 있음

### 모든 객체 조회하기

```python
from blog.models import Post
Post.objects.all()
```

### 객체 생성하기

데이터베이스에 새 글 객체를 저장하는 방법

```python
from django.contrib.auth.models import User
User.objects.all() # <QuerySet [<User: doyeon>, <User: yeon>]>
me = User.objects.get(username='doyeon')
Post.objects.create(auther=me, title='Sample title', text='Text')
Post.objects.all() # 게시물이 만들어졌는지 확인
```

### 필터링하기

```python
Post.objects.filter(auther=me) # 작성자가 me인 게시글
Post.objects.filter(title__contains='title')
```

> title과 contains 사이에는 언더바 2개가 들어간다.
>
> 장고 ORM은 필드 이름('title')과 연산자와 필터('contains')를 언더바 두개를 사용하여 구분한다.

- 게시일(`published_date`)로 과거에 작성한 글을 필터링

  ```python
  from django.utils import timezone

  post = Post.objects.get(title='Sample title')
  post.publish() # 게시

  Post.objects.filter(published_date__lte=timezone.now()) # 먼저 게시하려는 게시물의 인스턴스를 얻어야한다.
  # lte = less than equal 작거나 같다
  # published_date__lte = timezone.now() 발생된 시간이 현재 시간보다 작거나 같은 경우를 필터링해서 보여준다.
  ```

### 정렬하기

`created_date`를 사용하여 필드를 정렬

```python
Post.objects.order_by('created_date') # 오름차순 정렬
Post.objects.order_by('-created_date') # '-'를 붙여줄 경우 내림차순 정렬
```

### 쿼리셋 연결하기

쿼리셋들을 함께 연결(chaining)하여 사용할 수 있다.

```python
Post.objects.filter(published_date__lte=timezone.now()).oreder_by('published_date')
```
