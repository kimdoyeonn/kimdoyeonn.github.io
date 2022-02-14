---
title: "[python]8. 모듈"
excerpt: ""
category:
  - python
tags: [python, jump-to-python, module]
---

### 모듈 

- 모듈: 함수나 변수 또는 클래스를 모아 놓은 파일
- 다른 파이썬 프로그램에서 불러와 사용할 수 있게끔 만든 파이썬 파일
- 다른 사람이 이미 만들어 놓은 모듈을 사용할 수도 있고 자기가 직접 만들어서 사용할 수도 있다.



### 모듈 만들기

```python
# mod1.py
def add(a,b):
    return a + b
def sub(a,b):
    return a - b
```

- 확장자 py로 만들 파일이 모두 모듈이다.

### 모듈 불러오기

```python
import mod1
print(mod1.add(3,4))
print(mod1.mul(4,2))

import 모듈이름
```

- `import` : 미리 만들어 놓은 파이썬 모듈을 사용할 수 있게 해주는 명령어
- `mod1.py`에 들어있는 `add` 함수를 사용하기 위해서는 `mod1.add` 처럼 `모듈.함수이름`형식으로 작성하면 된다.



- import는 현재 디렉터리에 있는 파일이나 파이썬 라이브러리가 저장된 디렉터리에 있는 모듈만 불러올 수 있다.
- 파이썬 라이브러리 - 파이썬을 설치할 때 자동으로 설치되는 파이썬 모듈
- `from 모듈이름 import 모듈함수`형식으로 작성하면 모듈이름을 붙이지 않고 바로 함수를 사용할 수 있다.

```python
from mod1 import add, sub
from mod1 import * # mod1 모듈에 있는 모든 함수를 사용할 수 있음
```



### if \_\_name\_\_ == "\_\_main\_\_": 의 의미

```python
# mod1.py
def add(a,b):
    return a + b
def sub(a,b):
    return a - b

print(add(1,4))
print(sub(4,2))
```

- `import mod1`을 했을 때 아래의 print가 실행되는 것을 막아준다.
- `__name__ == "__main__"`
  - 파일을 직접 실행할 경우 값이 `참`되어 if 안의 문장이 실행된다.
  - 반대로 대화형 인터프리터나 달느 파일에서 이 모듈을 불러서 사용할 때는 `거짓`이 되어 다음 문장이 수행되지 않는다.
- `__name__`
  - 직접 파일을 실행할 경우 `__name__`변수에 `__main__`값이 저장된다.
  - 파이썬 셸이나 다른 파이썬 모듈에서 mod1을 import 할 경우에는 `__name__`변수에는 모듈 이름 값 `mod1`이 저장된다.



### 클래스나 변수 등을 포함한 모듈

```python
# mod2.py
PI = 3.141592

class Math:
    def soly(self,r):
        return PI * ( r**2 )
def add(a,b):
    return a+b
```

```python
import mod2
print(mod2.PI) # 3.141592

a = mod2.Math()
print(a.solv(2)) # 12.~~~

print(mod2.add(mod2.PI, 4.4))
```



### 다른 파일에서 모듈 불러오기

1. `sys.path.append(모듈을 저장한 디렉터리)` 사용하기

   ```python
   import sys
   sys.path
   ```

   - `sys.path`는 파이썬 라이브러리가 설치되어 있는 디렉터리를 보여준다.
   - 모듈이 위 디렉터리에 들어 있다면 모듈이 저장된 디렉터리로 이동할 필요 없이 바로 불러서 사용할 수 있다.
   - 소스코드 안에서는 `\\`, `/`을 사용하여야한다.

   ```python
   sys.path.append("C:/doit/mymod")#예시
   ```

2. `PYTHONPATH` 환경 변수 사용하기

   ```
   set PYTHONPATH = c:\doit\mymod
   ```

   - `set`명령어를 사용해 `PYTHONPATH`환변 변수에 디렉터리를 설정하면 추가 작업 없이 모듈을 불러와서 사용할 수 있다.