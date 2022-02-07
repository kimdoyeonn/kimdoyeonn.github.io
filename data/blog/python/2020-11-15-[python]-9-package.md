---
title: '[python]9. 패키지'
excerpt: ''
category:
  - python
tags: [python, jump-to-python, packages]
---

참고: [점프투파이썬](https://wikidocs.net/1418)

#### Packages

도트(.)를 사용하여 파이썬 모듈을 계층적(디렉터리 구조)으로 관리할 수 있게 해준다. 예를 들어 모듈 이름이 A.B인 경우 A는 패키지 이름이 되고 B는 A 패키지의 B모듈이 된다.

파이썬 패키지는 디럭터리와 파이썬 모듈로 이루어지며 구조는 다음과 같다.

```python
game/
    __init__.py
    sound/
        __init__.py
        echo.py
        wav.py
    graphic/
        __init__.py
        screen.py
        render.py
    play/
        __init__.py
        run.py
        test.py
```

- `game`, `sound`, `graphic`, `play` - 디렉터리
- 확장자가 .py인 파일 - 파이썬 모듈
- `game` 디렉터리 - 루트 디렉터리
- `sound`, `graphic`, `play` - 서브 디렉터리
- 패키지 구조로 모듈을 만들면 다른 모듈과 이름이 겹치더라도 더 안전하게 사용할 수 있다.

### 패키지 만들기

1. 루트디렉터리와 그 아래의 서브 디렉터리들을 생성하고 .py파일들을 만든다.

2. 각 디렉터리에 `__init__.py`파일을 만듦

3. 패키지를 참조할 수 있도록 명령프롬프트 창에서 set 명령어로 `PYTHONPATH` 환경 변수에 패키지 디렉터리 바로 위의 디렉터리를 추가한다.

   ```
   set PYTHONPATH=C:/doit
   ```

### 실행하기

1. ```python
   import game.sound.echo
   game.sound.echo.echo_test()
   ```

2. ```python
   from game.sound import echo
   echo.echo_test()
   ```

3. ```python
   from game.sound.echo import echo_test
   echo_test()
   ```

- import game을 수행하면 game 디렉어리의 모듈 또는 game 디렉터리의 `__init__.py`에 정의한 것만 참조할 수 있다.
- `import game.sound.echo.echo_test`처럼 함수를 사용하는 것도 불가능하다
  도트 연산자(.)를 사용해서 import a.b.c 처럼 import할 때 가장 마지막 항목인 c는 반드시 모듈 또는 패키지여야만 한다.

### `__init__.py`의 용도

해당 디렉터리가 패키지의 일부임을 알려주는 역할을 한다. 만약 game,sound,graphic 등 패키지에 포함된 디렉터리에 `__init__.py`파일이 없다면 패키지로 인식되지 않는다.

> 3.3 버전부터는 없어도 패키지로 인식하지만 하위 버전 호환을 위해 파일을 생성하는 것이 안전한 방법이다.

- 특정 디렉터리의 모듈을 `*`를 사용하여 import할 때에는 `__init__.py`파일에 `__all__`변수를 설정하고 import할 수 있는 모듈을 정의해 주어야한다.

  ```python
  __all__ = ['echo']
  ```

  여기서 `__all__`은 sound 디렉터리에서 `*`기호를 사용하여 import할 경우 이곳에 정의된 echo 모듈만 import된다는 것을 의미한다.

  > `from game.sound.echo import *`은 `__all__`과 상관없이 무조건 import된다.
  >
  > -> from의 마지막 항목이 모듈인 경우

### relative 패키지

만약 graphic 디렉터리의 render.py모듈이 sound 디렉터리의 echo.py 모듈을 사용하고 싶다면 render.py를 다음과 같이 수정하면 된다.

```python
from game.sound.echo import echo_test # 추가된 문장
def render_test():
    print("render")
    echo_test()
```

위 처럼 전체 경로를 사용하여 import할 수도 있지만 다음과 같이 relative하게 import하는 것도 가능하다.

```python
from ..sound.echo import echo_test # 추가된 문장
def render_test():
    print("render")
    echo_test()
```

- 여기서 `..`은 부모 디렉터리를 의미한다. graphic과 sound 디렉처리는 동일한 depth이므로 `..`을 사용하여 위와 같은 import가 가능한 것이다.
- `..` - 부모 디렉터리
- `.` - 현재 디렉터리

`..`과 같은 relative한 접근자는 render.py처럼 모듈 안에서만 사용해야한다. 파이썬 인터프리터에서 relative한 접근자를 사용하면 `SystemError: cannot perform relative import`오류가 발생한다.
