---
title: '[django]3. 나의 첫 번째 장고 프로젝트'
date: 2020-11-13
tags: [python, django]
---

- 장고에서 디렉토리와 파일명은 매우 중요하다. 파일명을 마음대로 변경해서도 이동해서도 안된다. 장고는 중요한 것들을 찾을 수 있게 특정한 구조를 유지해야 한다.

```
PS C:\~~~\djangogirls> myvenv\Scripts\activate
(myvenv) PS C:\~~~\djangogirls> django-admin.py startproject mysite .
```

- `.`을 붙여주어야 실행된다. 현재 디렉토리에 장고를 설치하라고 스크립트에 알려줌(축약된 표시)
- `manage.py`: 스크립트인데 사이트 관리를 도와주는 역할 이 스크립트를 사용하여 다른 설치 없이, 컴퓨터에서 웹 서버를 시작할 수 있다.
- `setting.py`: 웹 사이트 설정이 있는 파일
- `urls.py`: `urlresolver`가 사용하는 패턴 목록을 포함

### 설정 변경

`mysite/setting.py`의 `TIME_ZONE` 수정 [위키피디아 타임존 리스](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

```python
TIME_ZONE = 'Asia/Seoul'
```

#### 정적파일 경로 추가

맨 아래 `STATIC_URL`아래에

```python
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
```

#### ALLOWED_HOSTS

`DEBUG`가 `True`이고 `ALLOWED_HOSTS`가 비어 있으면, 호스트는 `['localhost','127.0.0.1', '[::1]']`에 대해 유효하다. 애플리케이션을 배포할 때 PythonAnywhere의 호스트 이름과 일치하지 않으므로 설정을 바꿔 주어야한다.

```python
ALLOWED_HOSTS = ['127.0.0.1', '.pythonanywhere.com']
```

### 데이터베이스 설정하기

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

블로그에 데이터베이스를 생성하기 위해 아래 코드를 콘솔에 입력한다. 명령을 실행하기 위해서는 `djangogirls`디렉터리 안에 있는 `magange.py`가 필요하다.

```
python manage.py migrate
```

#### 웹서버 시작

```
(myvenv) ~/djangogirls$ python manage.py runserver
```

브라우저에 `http://127.0.0.1:8000/`로 이동하여 잘 실행됐는지 확인

![django_runserver](https://user-images.githubusercontent.com/53068706/107882446-bae8df80-6f2c-11eb-896d-1bb9e2bd4034.png)

잘된다! 신기해!
