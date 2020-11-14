---
title: "[django]5. 장고 관리자"
excerpt: ""
category:
  - django
tags: [python, django]
---

#### 언어 설정

`settings.py`에서

```python
LANGUAGE_CODE = 'ko' # en-us
```



장고 관리자에서는 글을 추가, 수정, 삭제할 수 있다.



`blog/admin.py`에서

```python
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```

- 앞에서 정의했던 `Post`모델을 `import`
- 관리자 페이지에서 만든 모델을 보려면 `admin.site.register(Post)`로 모델 등록
- 관리자 페이지는 `python manage.py runserver`를 실행후 브라우저에서 http://127.0.0.1:8000/admin/로 이동하여 확인

![된다!](C:\dev\doyeon311.github.io\_posts\images\django_runserver_admin.png)

( 된다! 신기해! )

- 로그인을 하려면 모든 권한을 가진 superuser를 생성해야한다.

  커맨드라인으로 돌아가서 `python manage.py createsuperuser`실행, 사용자이름, 이메일, 암호 입력

- 관리자 페이지에서 방금 만든 계정으로 로그인을 해보면 블로그 포스팅, 등등 여러가지 관리자 기능을 사용할 수 있다.