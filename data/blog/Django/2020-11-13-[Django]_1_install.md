---
title: '[django]1. 설치하기'
excerpt: ''
category:
  - django
tags: [python, django]
---

참고: [장고걸스](https://tutorial.djangogirls.org/ko/installation/)

### 가상환경 (Virtual environment)

- 개발환경으로 깔끔하게 관리하는 데 도움됨
- 디렉토리명에 악센트, 특수문자가 포함되지 않도록 주의

```
$ mkdir djangogirls
$ cd djangogirls
$ python -m venv myvenv
```

- `python3 -m venv myvenv`를 실행하라고 되어있었는데 `python -m venv myvenv `라고 쳐야 진행됐다

#### 사용하기

```
C:\Users\Name\djangogirls> myvenv\Scripts\activate
```

- 이부분은 왠지 모르겠는데 windows terminal에서는 안되고 PowerShell에서는 잘 됐음

- PowerShell에서 '이 스크립트는 이 시스템에서 실행되지 않습니다'어쩌고 하는 오류 메세지가 뜰 경우 PowerShell을 관리자권한으로 실행하고

  ```
  C:\WINDOWS\system32> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
  ```

  을 해줬더니 해결됐음

- 콘솔 프롬프트 앞에 `(myvenv)` 가 붙어있다면 가상환경이 시작된 것이다.

### 설치하기

- 그 전에 장고를 설지하는데 필요한 pip가 최신 버전인지 확인

  ```
  (myvenv) ~$ python3 -m pip install --upgrade pip
  ```

- 확인이 끝나면 설치

  ```
  pip install django~=2.0.0
  ```

- 코드에디터
- GitHub 계정
- PythonAnywhere 계정 -> 무료계정

위의 세개 필요
