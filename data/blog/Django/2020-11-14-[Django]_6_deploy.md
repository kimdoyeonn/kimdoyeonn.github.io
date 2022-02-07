---
title: '[django]6. 배포하기'
excerpt: ''
category:
  - django
tags: [python, django]
---

- 로컬컴퓨터: 개발 및 테스트 수행
- GitHub: 개발이 완료되면 프로그램 복사본 저장
- [PythonAnywhere](https://www.pythonanywhere.com/): 웹사이트 배포

### Git 저장소 만들기

```
git init
git config --global user.name "Your Name"
git config --global user.email you@example.com
```

아래의 내용을 저장하고 이름을 `.gitignore`로 생성, 폴더 맨 위에 저장

```
*.pyc
*~
__pycache__
myvenv
db.sqlite3
/static
.DS_Store
```

- `db.splite3`은 모든 게시물이 저장된 로컬 데이터베이스
  PythonAnywhere는 다른 데이터베이스를 사용하기 때문에 저장소에 추가될 필요 없다.

```
git status // 미추척, 수정된, 스테이지된 파일, 프렌치 상태와 그 외 많은 정보를 보여준다
```

```
git commit -m 'My Django Girls app, first commit'
git remote add origin http://repoURL
git push -u origin master
```

#### GitHub에서 PythonAnywhere로 코드 가져오기

PythonAnywhere Bash에서

```
git clone http://repoURL
tree my-first-blog //파일 확인
```

#### PythonAnywhere에서 가상환경(virtualenv) 생성하기

```
cd my-first-blog
virtualenv --python=python3.6 myvenv
source myvenv/bin/activate

(myvenv) $ pip install django~=2.0

```

#### PythonAnywhere에서 데이터베이스 생성하기

로컬 컴퓨터와는 다른 별도의 데이터베이스를 사용할 수 있다.
앞에서 했던 것처럼 `migrate`와 `createsuperuser`를 사용한다.

```
(myvenv) $ python manage.py migrate
(myvenv) $ python manage.py createsuperuser
```

#### web app으로 블로그 배포하기

PythonAnywhere 대시보드에서 **Web**클릭 -> **Add a new web app** 선택
도메인 설정(무료버전은 도메인 맘대로 안됨) -> manual configuration(수동설정) -> Python3.6

Django가 아니라 manual configuration으로 선택해야함

#### 가상환경(virtualenv) 설정하기

`virtualenv` 섹션에서 `Enter the path to a virtualenv`를 클릭하고 `/home/username/my-first-blog/myvenv/`입력

입력하면 맞았는지 틀렸는지 확인할 수 있음

#### WSGI 파일 설정하기

장고는 `WSGI 프로토콜`을 사용해 작동한다. 이 프로토콜은 파이썬을 이용한 웹사이트를 서비스하기 위한 표준으로 PythonAnywhere에서도 지원합니다. WSGI 설정파일을 수정해 내가 만든 장고 블로그를 PythonAnywhere가 인식하게 만들 수 있다. **Web**탭 내의 **code**섹션을 찾아서 `/var/www/yeon_pythonanywhere_com_wsgi.py`의 모든 내용을 지우고 아래의 코드를 입력

```python
import os
import sys

path = '/home/name/my-first-blog'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'

from django.core.wsgi import get_wsgi_application
from django.contrib.staticfiles.handlers import StaticFilesHandler
application = StaticFilesHandler(get_wsgi_application())
```

- PythonAnywhere에게 웹 애틀리케이션의 위치와 Django설정 파일명을 알려주는 역할
- `StaticFileHandler`는 CSS를 위한 것, `runserver`명령을 로컬 개발 중에 자동을 처리된다.

#### 디버깅 팁

본인의 사이트에 접속할 때 오류가 보이면 제일 먼저 **error log**(Web tab)에서 디버깅 정보를 찾는다. 여기서 오류메세지를 확인한다. (최근의 오류 메세지는 맨 하단)

- virtualenv를 생성하고 활성화할 때, Django를 설치할 때, Collestac을 돌릴 때, 데이터베이스를 설치할 때 같은 각 단계를 위한 콘솔 작업을 할 때 한 단계를 빼먹는 경우
- web tab에서 virtualenv 경로를 쓸 때 오타 -> 이런 경우 작은 빨간 에러메세지가 뜰 것
- WSGI 설정 파일에서 실수가 있었을 때 ex) 경로
- Web app에서 그랬듯, virtualenv에서도 같은 파이썬 버전이 선택됐는지. 모두 버전이 `3.4` ->?3.6만 눌렀던거같은데
- 만약 `Invalid HTTP_HOST header: <your-site-name> . You may need to add <your-site-name> to ALLOWED_HOSTS.` 라는 오류메세지가 나온다면 `/mysite/settings.py`의 마지막 줄에 `ALLOWED_HOSTS = ['localhost', '127.0.0.1', '[::1]', '.pythonanywhere.com']` 를 추가 한 뒤에 다시 **Web** 탭에서 `Reload <your-site-name`이라는 녹색 버튼을 눌러 주세요.

### 배포 끝!

로컬 컴퓨터에서와 똑같은 페이지를 보여줍니다. URL끝에 `/admin/`을 추가하면 관리자 사이트로 이동합니다. 데이터베이스를 생성하면서 만든 superuser 계정으로 로그인하면 서버에 새 게시물을 추가할 수 있습니다.
