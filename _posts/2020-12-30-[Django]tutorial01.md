---
title:[Django]장고튜토리얼-장고앱작성하기, part1
excerpt: ""
category:
  - django
tags: [python, django]
---

출처: [첫번째 장고앱 작성하기](https://docs.djangoproject.com/ko/3.1/intro/tutorial01/)

간단한 설문조사 어플리케이션 만들기 

- 사람들이 설문 내용을 보고 직접 투표할 수 있는 개방된 사이트
- 관리자가 설문을 추가, 변경, 삭제할 수 있는 관리용 사이트



#### django 설치되어있는지, 버전 확인하기

```powershell
$ python -m django --version
```



### 프로젝트 만들기

Django를 처음 사용한다면 초기 설정에 주의를 기울여야한다. Django project를 구성하는 코드를 자동으로 생성해야 하는데, 이 과정에서 데이터베이스 설정, Django를 위한 옵션들, 어플리케이션을 위한 설정들과 같은 Django 인스턴스를 구성하는 수많은 설정들이 생성되기 때문입니다.

- 커맨드라인에서 cd 명령어로 코드를 저장할 디렉터리로 이동 후 다음의 명령을 수행

  ```powershell
  $ django-admin startproject mysite
  ```

  이 명령은 현재 디렉토리에 mysite라는 디렉토리를 생성할 것입니다.

  > 프로젝트를 생성할 때는 Python 또는 Django에서 사용 중인 이름은 피해야합니다. 예를 들어 django(Django와 충돌), test(Python 패키지 이름 중 하나) 같은 이름

  > 작성한 코드는 DocumentRoot의 바깥에 두는 것을 추천합니다. 웹서버의 DocumentRoot에 존재할 경우 웹을 통해 외부의 사람들이 Python 코드를 직접 열어볼 수 있는 위험이 있기 때문에 보안에 좋지 않습니다.



- `startproject`에서 생성되는 것

  ```
  mysite/
  	manage.py
  	mysite/
  		__init__.py
  		settings.py
  		urls.py
  		asgi.py
  		wsgi.py
  ```

  - 바깥 mysite 폴더는 프로젝트를 위한 공간으로 이것의 이름은 Django와 상관이 없습니다. 아무거나 원하는 이름으로 변경해도 됩니다.
  - `manage.py` Django 프로젝트와 다양한 방법으로 상호작용하는 커맨드라인의 유틸리티입니다.[참고](https://docs.djangoproject.com/ko/3.1/ref/django-admin/)
  - `mysite/` 디렉토리 내부에는 프로젝트를 위한 실제 python 패키지들이 저장됩니다. 이 디렉토리 내의 이름을 이용하여, (mysite.urls와 같은 식으로) 프로젝트 어디에서나 python 패키지들을 임포트 할 수 있습니다.
  - `mysite/__init__.py`
    python으로 하여금 이 디렉토리를 패키지처럼 다루라고 알려주는 용도의 단순한 빈 파일
  - `mysite/settings.py` 현재 Django 프로젝트의 환경 및 구성을 저장합니다. 어떻게 작동하는지 확인하고 싶으면 [여기](https://docs.djangoproject.com/ko/3.1/topics/settings/)
  - `mysite/urls.py` 현재 Django project의 URL 선언을 저장합니다. Django로 저장된 사이트의 목차라고 할 수 있습니다. URL에 대한 [자세한 내용](https://docs.djangoproject.com/ko/3.1/topics/http/urls/)
  - `mysite/asgi.py` 프로젝트를 제공하기 위한 ASGI 호환 웹 서버의 진입점 [자세히](https://docs.djangoproject.com/ko/3.1/howto/deployment/asgi/)
  - `mysite/wsgi.py` 현재 프로젝트를 서비스하기 위한 WSGI 호환 웹 서버의 진입점 [자세히](https://docs.djangoproject.com/ko/3.1/howto/deployment/wsgi/)



### 개발서버

#### Django 프로젝트가 제대로 작동하는지 확인

mysite 디렉토리로 이동하고, 다음 명령어를 입력

```powershell
$ python manage.py runserver
```

서버를 동작시켰으니 http://127.0.0.1:8000/ 을 통해 접속할 수 있습니다.

> runserver의 자동 변경 기능
>
> 개발 서버는 요청이 돌어올 때마다 자동으로 Python 코드를 다시 불러옵니다. 코드의 변경사항을 반영하기 위해서 굳이 서버를 재가동 하지 않아도 됩니다. 그러나, 파일을 추가하는 등의 몇몇의 동작은 개발 서버가 자동으로 인식하지 못하기 때문에, 이런 상황에서는 서버를 재가동 해야 적용됩니다.



### 설문조사 앱 만들기

앱을 생성하기 위헤 manage.py가 존재하는 디렉토리에서 다음의 명령어를 입력

```powershell
$ python manage.py startapp polls
```

polls라는 디렉토리가 생깁니다.

```
polls
	__init__.py
	admin.py
	apps.py
	migrations/
		__init__.py
	models.py
	tests.py
	views.py
```



### 첫번째 뷰 작성하기

`polls/view.py`를 열고 작성

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

Django에서 가장 간단한 형태의 뷰입니다. 뷰를 호출하려면 이와 연결된 url이 있어야하는데, 이를 위해 URLconf가 사용됩니다.

polls 디렉토리에서 URLconf를 생성하려면 `urls.py`라는 파일을 생성해야 합니다.

```python
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

그런 다음, 최상위 URLconf에서 polls.urls 모듈을 바라보게 설정합니다.

`mysite/urls.py` 파일을 열고, `django.urls.include`를 import하고, urlpatterns 리스트에 include()함수를 다음과 같이 추가합니다.

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

`include()`함수는 다른 URLconf들을 참조할 수 있도록 도와줍니다. Django가 함수 `include()`를 만나게 되면, URL의 그 시점까지 일치하는 부분을 잘라내고, 남은 문자열 부분을 후속처리를 위해 include된 URLconf로 전달합니다.

polls 앱에 그 자체의 URLconf(polls/urls.py)가 존재하는 한, `/polls/`, `/fun_polls/`, `/content/polls/`와 같은 경로, 또는 다른 root 경로에 연결하더라도, 앱은 여전히 잘 동작할 것입니다.

> include()를 사용하는 경우
>
> 다른 URL 패턴을 포함할 때마다 사용해야합니다. admin.site.urls가 유일한 예외

```powershell
$ python manage.py runserver
```

http://localhost:8000/polls/ -> index 뷰에서 정의한 텍스트가 보임





`path()`함수에는 2개의 필수 인수인 route와 view, 2개의 선택 가능한 인수 kwargs, name까지 모두 4개의 인수가 전달되었습니다. 

### path() 인수: route

route는 URL 패턴을 가진 문자열입니다. 요청이 처리될 때, DJango는 urlpatterns의 첫 번째 패턴부터 시작하여, 일치하는 패턴을 찾을 때까지 요청된 URL을 각 패턴과 리스트의 순서대로 비교합니다.

패턴들은 GET이나 POST의 매개변수들, 혹은 도메인 이름을 검색하지 않습니다. 예를 들어 http://www.example.com/myapp/이 요청된 경우, URLconf는 오직 myapp/부분만 바라봅니다. http://www.example.com/myapp/?app=3 같은 요청에도, URLconf는 역시 myapp/부분만 신경씁니다.

---

### path() 인수: view

Django에서 일치하는 패턴을 찾으면, HttpRequest 객체를 첫번째 인수로 하고, 경로로부터 캡쳐된(가져온 값을 말하는 건가?) 값을 키워드 인수로하여 특정 view 함수를 호출합니다.

---

### path() 인수: kwargs

임의의 키워드 인수들은 목표한 view에 dict 형으로 전달됩니다. 그러나 튜토리얼에서는 사용하지 않음

---

### path() 인수: name

URL에 이름을 지으면, 템플릿을 포함한 Django 어디에서나 명확하게 참조할 수 있습니다. 이 기능을 이용하면, 단 하나의 파일만 수정해도 project 내의 모든 URL패턴을 바꿀 수 있도록 도와줍니다.