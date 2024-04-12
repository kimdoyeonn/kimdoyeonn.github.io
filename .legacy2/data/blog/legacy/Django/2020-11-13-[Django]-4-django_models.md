---
title: '[django]4. 장고 모델'
date: 2020-11-13
tags: [python, django]
---

참고: [장고걸스](https://tutorial.djangogirls.org/ko/django_models/)

### 객체(Object)

프로그래밍 개발 방법 중에 하나인`객체 지향 프로그래밍(Object oriented programming)`은 프로그램이 어떻게 작동해야 하는지 모든 것을 하나하나 지시하는 것 대신, 모델을 만들어 그 모델이 어떤 역할을 가지고 어떻게 행동해야 하는지 정의하여 서로 알아서 상호작용할 수 있도록 만드는 것이다.

여기서 객체란 속성과 행동을 모아놓은 것이라고 할 수 있다.

### 장고 모델

장고 안의 모델은 객체의 특별한 종류이다. 이 모델을 저장하면 그 내용이 데이터베이스에 저장된다.

`데이터베이스`란 데이터의 집합, 데이터들이 모여 있는 곳
사용자에 대한 정보나 블로그의 글 등등이 저장된다.

여기서 사용할 건 `SQLite`데이터 베이스: 기본 장고 데이터베이스 어댑터이다.

쉽게 말해 데이터베이스 안의 모델이란 엑셀 스프레드시트라고 말할 수 있다.(모델도 열(필드)과 행(데이터)로 구성되어있다)

### 어플리케이션 만들기

```
(myvenv) PS C:\Users\doyeon\djangogirls> python manage.py startapp blog
```

blog 디렉토리가 생성되고 그 안에 여러 파일도 세팅된다.

```
    djangogirls
    ├── mysite
    |       __init__.py
    |       settings.py
    |       urls.py
    |       wsgi.py
    ├── manage.py
    └── blog
        ├── migrations
        |       __init__.py
        ├── __init__.py
        ├── admin.py
        ├── models.py
        ├── tests.py
        └── views.py
```

- `mysite/setting.py`안에 `INSTALLED_APPS`설정 추가하기

  ```python
  INSTALLED_APPS = [
      'django.contrib.admin',
      'django.contrib.auth',
      'django.contrib.contenttypes',
      'django.contrib.sessions',
      'django.contrib.messages',
      'django.contrib.staticfiles',
      'blog',
  ]
  ```

### 블로그 글 모델 만들기

모든 `Model`객체는 `blog/models.py`파일에 선언하여 모델을 만든다. 파일을 열어서 안에 있는 모든 내용을 삭제한 후

```python
from django.conf import settings
from django.db import models
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
```

- `models`
  Post가 장고 모델임을 의미, 이 코드로 장고는 Post가 데이터베이스에 저장되어야 한다는걸 알게 된다.
- `models.CharField`
  글자 수가 제한된 텍스트를 정의할 때 사용
  글 제목같이 짧은 문자열 정보를 저장할 때 사용한다.
- `models.TextField`
  글자 수 제한이 없는 긴 텍스트를 정의할 때 사용한다. 블로그 콘텐츠 같은
- `models.DateTimeField`
  날짜와 시간을 의미한다.
- `models.ForeignKey`
  다른 모델에 대한 링크를 의미한다.
- [장고문서](https://docs.djangoproject.com/en/2.0/ref/models/fields/#field-types)

### 데이터베이스에 모델을 위한 테이블 만들기

먼저 장고 모델에 몇 가지 변경사항이 있다는 것을 알게 해줘야 한다.

```
python manage.py makemigrations blog
```

장고는 데이터베이스에 지금 반영할 수 있도록 `migration file`이라는 것을 준비해 두었습니다. 위의 명령을 실행해 실제 데이터베이스에 모델 추가를 반영합니다.

```
python manage.py migrate blog
```

명령이 실행되면 `Post` 모델이 데이터 베이스에 저장된다.
