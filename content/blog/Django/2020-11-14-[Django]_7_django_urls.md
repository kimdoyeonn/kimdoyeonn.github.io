---
title: "[django]7. Django urls"
excerpt: ""
category:
  - django
tags: [python, django]
---

참고: [장고걸스](https://tutorial.djangogirls.org/ko/django_urls/)

인터넷의 모든 페이지는 고유한 URL을 가지고 있어야한다. 애플리케이션은 사용자가 URL을 입력하면 어떤 내용을 보여줘야하는지 알고 있다.

장고는 `URLconf (URL configuration)`을 사용한다.
`URLconf`는 장고에서 URL과 일치하는 뷰를 찾기 위한 패턴들의 집합이다.

#### 장고 URL 동작 방법

`mysite/urls.py`

```python
"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]

```

- 장고는 `admin/`로 시작하는 모든 URL을 view와 대조해 찾아냅니다. 무수히 많은 URL이 `admin URL`에 포함될 수 있어 일일이 모두 쓸 수 없기 때문에 정규 표현식을 사용한 것



### 나의 첫 번째 Django url!

`mysite/urls.py`파일을 깨끗한 상태로 유지하기 위해 `blog`애플리케이션에서 메인 `mysite/urls.py`파일로 url들을 가져온다.

`mysite/urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),
]
```

- `blog.urls`를 가져오는 행을 추가
  - `blog.urls`를 가져오려면 `include`함수가 필요하다.
  - `from django.urls`행을 찾아 import에 `include`를 추가
- 이제 장고는 http://127.0.0.1:8000/으로 들어오는 모든 접속 요청을 `blog.urls`로 전송해 추가 명령을 찾는다.

#### blog.urls

`blog.urls.py`라는 새 파일 생성, 아래의 두 줄을 추가

```python
from django.urls import path
from . impoer views
```

장고 함수인 `path`와 `blog` 애플리케이션에서 사용할 모든 `views`를 가져온다.

```python
urlpatterns = [
    path('', views.post_list, name='post_list'),
]
```

`post_list`라는 `views`가 루트 URL에 할당되었다. 이 URL 패턴은 빈 문자열에 매칭되며 장고 URL 확인자(resolver)는 전체 URL경로에서 접두어(prefix)에 포함되는 도메인 이름(http://127.0.0.1:8000/)을 무시하고 받아드린다.

이 패턴은 장고에게 누군가 웹사이트에 'http://127.0.0.1:8000/'주소로 들어왔을 때 `views.post_list`를 보여주라고 말해주는 것이다.

마지막 부분인 `name='post_list'`는 URL에 이름을 붙인 것으로 뷰를 식별합니다. 뷰의 이름과 같을 수도 완전히 다를 수도 있습니다. (이름을 붙인 URL은 프로젝트의 후반에 사용할 것)

[장고 URL 설정 관련 장고 공식문서](https://docs.djangoproject.com/en/2.0/topics/http/urls/)