---
title: "[Django]장고튜토리얼-장고앱작성하기 part2"
excerpt: ""
category:
  - django
tags: [python, django]
---

출처: [첫번째 장고앱 작성하기](https://docs.djangoproject.com/ko/3.1/intro/tutorial02/)



### 데이터베이스 설치

`mysite/settings.py` -> Django 설정을 모듈 변수로 표현한 Python 모듈

기본적으로는 SQLite을 사용하도록 구성되어 있습니다. SQLite는 Python에서 기본으로 제공되기 떄문에 별도로 설치할 필요가 없습니다. 그러나 실제 프로젝트를 시작할 때에는, 나중에 데이터베이스를 교체하느라 골치 아파질 일을 피하기 위해서라도 좀 더 확장성 있는 데이터베이스를 사용하는 것이 좋습니다.

다른 데이터베이스를 사용해보고 싶다면, 적절한 [데이터베이스 바인딩](https://docs.djangoproject.com/ko/3.1/topics/install/#database-installation)을 설치하고, 데이터베이스 연결 설정과 맞게끔 DATABASES 'default' 항목의 값을 해당하는 키 값으로 바꿔준다.

- ENGINE
  - django.db.backends.sqlite3
  - django.db.backends.postgresql
  - django.db.backends.mysql
  - django.db.backends.oracle
- NAME
  - db의 이름, 기본으로 설정된 경우 프로젝트 파일 안에 저장됨

SQLite를 데이터베이스로 사용하지 않는 경우, USER, PASSWORD, HOST 같은 추가 설정이 반드시 필요합니다.

- 자신의 시간대에 맞춰 TIME_ZONE 값을 설정

- INSTALLED_APPS

  - 현재 Django 인스턴스에서 활성화된 모든 Django 어플리케이션들의 이름이 담겨 있습니다. 앱들은 다수의 프로젝트에서 사용될 수 있고, 다른 프로벡트에서 쉽게 사용될 수 있도록 패키징하여 배포할 수 있습니다.
  - django.contrib.admin - 관리용 사이트
  - django.contrib.auth - 인증 시스템
  - django.contrib.contenttypes - 컨텐츠 타입을 위한 프레임 워크
  - django.contrib.sessions - 세션 프레임워크
  - django.contrib.messages - 메세징 프레임워크
  - django.contrib.staticfiles - 정적 파일을 관리하는 프레임워크

  이 어플리케이션들은 사용하기 편리하도록 기본으로 제공됩니다.

  이러한 기본 어플리케이션들 중 몇몇은 최소 하나 이상의 데이터베이스 테이블을 사용하는데, 그러기 위해서는 데이터베이스에서 테이블을 미리 만들 필요가 있습니다. 이를 위해서 다음 명령을 실행해봅니다.

  ```powershell
  $ python manage.py migrate
  ```

  migrate 명령어는 INSTALLED_APPS 설정을 보고 mysite/settings.py파일의 데이터베이스 설정과 앱과 함께 제공되는 데이터베이스 마이그레이션에 때라 필요한 데이터베이스 테이블을 만듭니다. 



### 모델 만들기

모델이란 부가적인 메타데이터를 가진 데이터베이스의 구조를 말합니다.

설문조사 앱에서는 Question, Choice 두개의 모델을 만듭니다. Question은 질문과 등록일을 가지고 Choice는 선택 문자열과 투표 집계, 두개의 필드를 가집니다. 각각의 Choice는 Question과 관련되어 있습니다. 

이러한 개념들은 파이썬 클래스들을 통해 보여집니다. `polls/models.py`파일을 아래와 같이 수정하세요

```python
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

각 모델은 하위 클래스 `django.db.models.Model`로 만든 클래스로 표현되며, 각 변수는 모델의 데이터베이스 필드를 나타냅니다.

데이터베이스의 각 필드는 Field클래스의 인스턴스로서 표현됩니다. 이것은 각 필드가 어떤 자료형을 가질 수 있는지를 Django에게 말해줍니다.

- CharField는 문자 필드를 표현
- DateTimeField는 날짜와 시간 필드를 표현

각각의 Field인스턴스의 이름(question_text, pub_date)은 기계가 읽기 좋은 형식(machine-friendly format)의 데이터베이스 필드 이름입니다. 이 필드명을 Python 코드에서 사용할 수 있으며, 데이터베이스에서는 컬럼명으로 사용할 것입니다.

Field 클래스의 생성자에 선택적인 첫번째 위치 인수를 전달하여 사람이 읽기 좋은(human-readable) 이름을 지정할 수도 있습니다. 이 방법은 Django의 내부를 설명하는 용도로 종종 사용되는데, 이는 문서가 늘어나는 것 같은 효과를 가집니다. 만약 이 선택적인 첫번째 위치 인수를 사용하지 않으면 Django는 기계가 읽기 좋은 형식의 이름을 사용합니다. 위 코드에서는 `Question.pub_date`에 한해서만 인산이 읽기 좋은 형태의 이름을 정의하였습니다. 그 외의 다른 필드들은, 기계가 읽기 좋은 형태의 이름이라도 사람이 읽기에 충분합니다.

몇몇 Field 클래스들은 필수 인수가 필요합니다.

- `CharField`의 경우 `max_lenth`를 입력해 주어야 합니다

이것은 데이터베이스 스키마에서만 필요한 것이 아닌 값을 검증할 때도 쓰입니다.

또한 Field는 다양한 선택적 인수들을 가질 수 있습니다. 

- `default`를 사용하여 votes의 기본값을 0으로 설정

__`ForeignKey`를 사용한 관계설정__

- 각각의 Choice가 하나의 Question에 관계된다는 것을 장고에게 알려줍니다. Django는 다대일(many-to-one), 다대다(many-to-many) 일대일(one-to-one)과 같은 모든 일반 데이터베이스의 관계들을 지원합니다.



### 모델의 활성화

모델에 대한 코드들이 Django에 정보를 전달하고, Django는 이 정보를 가지고 다음과 같은 일을 할 수 있습니다.

- 이 앱을 위한 데이터베이스 스키마 생성(CREATE TABLE 문)
- Question과 Chice 객체에 접근하기 위한 Python 데이터베이스 접근 API를 생성

그러나 가장 먼져 현재 프로젝트에게 polls 앱이 설치되어 있다는 것을 알려야 합니다.

앱을 현대의 프로젝트에 포함시키기 위해서는, 앱의 구성 클래스에 대한 참조를 INSTALLED_APPS 설정에 추가해야 합니다. PollsConfig 클래스는 polls/apps.py 파일 내에 존재합니다. 따라서, 점으로 구분된 경로는 `polls.apps.PollsConfig`가 됩니다. 이 경로를 `mysite/settings.py`파일을 편집하여 INSTALLED_APPS 설정에 추가하면 됩니다.

```python
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

이제 Django는 polls앱이 포함된 것을 알게 되었습니다. 다음 명령을 실행합니다.

```powershell
$ python manage.py makemigrations polls
```

`makemigrations`를 실행시킴으로서, 내가 모델을 변경시킨 사실과 이 변경사항을 migration으로 저장시키고 싶다는 것을 Django에게 알려줍니다.

`migration`은 Django가 모델 및 데이터베이스 스키마(디스크의 파일들임)에 대한 변경 사항을 저장하는 방법입니다. 원하는 경우 새 모델에 대한 마이그레이션을 읽을 수 있습니다. (polls/migrations/0001_initial.py) 이것은 Django가 만들 때마다 읽어야하는 것은 아니지만, Django가 변경하는 방식을 수동으로 조정하려는 경우 사람이 편집할 수 있도록 설계되어있습니다.

당신을 위해 migration들을 실행시켜주고, 자동으로 데이터베이스 스키마를 관리해 주는 `migratie`명령어가 있습니다. 이 명령어를 알아보기 전에 migration이 내부적으로 어떤 SQL 문장을 실행하는지 살펴봅시다. `sqlmigrate` 명령은 migration이름을 인수로 받아, 실행하는 SQL 문장을 보여줍니다.

```powershell
$ python manage.py sqlmigrate polls 0001
```

실행 결과를 확인하면 다음을 알 수 있습니다.

- 테이블 이름은 앱의 이름과 모델의 이름(소문자)이 조합되어 자동으로 생성됩니다. 이 경우, 앱의 이름 polls와 소문자로 표기된 모델의 이름 question과 choice가 합쳐집니다. (이 동작을 재지정하여 수정할 수 있습니다.(override))
- 기본 키(ID)가 자동으로 추가됩니다.(이 동작 역시 재지정할 수 있습니다.)
- 관례에 따라 Django는 외래 키 필드명에 '_id'가 자동으로 추가됩니다.(재지정 가능)
- 외래키 관계는 제약 조건에 의해 명시됩니다. `DEFERRABLE`은 걱정하지 않아도 됩니다. PostgreSQL에 트랜잭션이 끝날 때까지 외래 키를 적용하지 않도록 지시합니다.(`FOREIGN KEYDEFERRABLE`)
- 사용하는 데이터베이스에 따라 데이터베이스 고유의 필드타입이 조정됩니다. 따라서, 자동 증가 필드를 생성할 경우 `auto_increment`(MySQL), `serial`(PostgreSQL), (SQLite)와 같이 사용하는 데이터베이스에 따라 적절한 필드타입이 자동으로 선택됩니다. 필드 명에 사용되는 인용부호도 상황에 따라 겹따옴표나 홑따옴표가 적절히 선택됩니다.`integer primary key autoincrement`

- `sqlmigrate` 명령은 실제로 데이터베이스에서 마이그레이션을 실행하지 않습니다. 대신 SQL Django가 필요하다고 생각하는 것을 볼 수 있도록 화면에 출력합니다. Django가 수행 할 작업을 확인하거나 변경하기 위해 SQL 스크립트가 필요한 데이터베이스 관리자가 있는 경우 유용합니다.
- 명령을 통해 마이그레이션을 수행하거나 데이터베이스를 건들이지 않고도 프로젝트의 문제를 확인할 수 있습니다. `python manage.py check`



```powershell
$ python manage.py migrate
```

데이터베이스에 모델과 관련된 테이블을 생성한다.

`migrate` 명령은 아직 적용되지 않은 마이그레이션을 모두 수집해 이를 실행하며 이 과정을 통해 모델에서의 변경 사항들과 데이터베이스의 스키마의 동기화가 이루어집니다.(Django는 `django_migrations`테이블을 두어 마이그레이션 적용 여부를 추적합니다.)

마이그레이션은 기능이 매우 강력하여 마치 프로젝트를 개발할 때처럼 데이터베이스나 테이블에 손대지 않고도 모델의 반복적인 변경을 가능하게 해줍니다. 동작 중인 데이터베이스를 자료 손실 없이 업그레이드 하는 데 최적화 되어 있습니다.

모델의 변경을 만드는 세단계

1. models.py 에서 모델을 변경합니다.
2. `python manage.py makemigrations`을 통해 이 변경사항에 대한 마이그레이션을 만듭니다.
3. `python manage.py migrate` 명령을 통해 변경사항을 데이터베이스에 적용합니다.

마이그레이션을 만드는 명령과 적용하는 명령이 분리된 것은 버전 관리 시스템에 마이그레이션을 커밋하고 앱과 함께 출시할 수 있도록 하기 위해서 입니다. 이는 개발을 쉽게 해줄 뿐아니라, 다른 개발자가 프로덕션에서 사용할 수 있게 해줍니다.

manage.py 유틸리티로 [어떤 일을 할 수 있는지](https://docs.djangoproject.com/ko/3.1/ref/django-admin/)

#### [API 가지고 놀기](https://docs.djangoproject.com/ko/3.1/intro/tutorial02/#playing-with-the-api)



### 관리자 페이지

```powershell
$ python manage.py createsuperuser
```

위 명령을 실행하여 username과 password를 설정한다.

#### 서버 개발 시작

```python
$ python manage.py runserver
```

http://127.0.0.1:8000/admin/ 으로 이동하여 앞에서 설정한 username과 password를 치고 로그인한다.

첫번쨰 화면에서는 편집가능한 그룹과 사용자아 같은 몇 종류의 컨텐츠를 볼 수 있습니다. 이것들은 `django.contrib.auth`모듈에서 제공되는데, DJango에서 제공되는 인증 프레임워크입니다.

#### 언어 설정 및 지역 시간 설정

```python
LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'
```



#### 관리 사이트에서 poll app 변경가능하도록 만들기

`polls.admin.py`

```python
from django.contrib import admin
from .models import Question

admin.site.register(Question)
```

![](images\django_poll_app_등록.PNG)



#### 관리 기능 탐색하기

Question에 들어가면 이전에 등록한 질문 리스트를 볼 수 있고, 수정할 수 있다.

여기서 알아둘 것들

- 이 서식은 Question 모델에서 자동을 생성되었습니다.

- 모델의 각 필드 유형들은 (`DateTimeField`, `CharField`) 적절한 HTML 입력 위젯으로 표현됩니다. Django 관리사이트는 각각의 필드가 어떻게 표현되어야할지 알고 있습니다.![django_필드에_맞는_HTML_표현](images\django_필드에_맞는_HTML_표현.PNG)

- 각각 `DateTimeField`는 JavaScript로 작성된 단축 기능과 연결됩니다. 날짜는 '오늘' 버튼과 달력 팝업에서 입력할 수 있으며, 시간은 '지금' 버튼과 일반적으로 입력하는 시간들을 제공하는 팝업을 통해서 입력할 수 있습니다.

페이지 아래 부분에서 다음과 같은 몇 가지 옵션을 제공합니다.

- 저장(Save) - 이 유형의 객체에 대한 변경사항을 저장하고, 변경된 목록 페이지를 보여줍니다.
- 저장 및 편집 계속 (Save and continue editing) - 이 객체에 대한 변경사항을 저장하고, 현재 편집창을 갱신합니다.
- 저장 및 다른 이름으로 추가(Save and add another) - 변경사항을 저장하고, 이 유형의 객체에 대한 비어있는 새로운 입력창을 불러옵니다.
- 삭제(delete) - 삭제를 확인하는 페이지를 띄웁니다.

위쪽의 히스토리에서는 관리사이트를 통해 누가 언제 무엇을 바꾸었는지 목록을 확인할 수 있습니다.