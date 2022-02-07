---
title: '[python]10. 예외처리'
excerpt: ''
category:
  - python
tags: [python, jump-to-python, exception]
---

- 참고: [점프투파이썬](https://wikidocs.net/30)

### try, except문

```pyrhon
try:
	...
except [발생 오류 [as 오류 메세지 변수]]:
	...
```

try 블록 수행 중 오류가 발생하면 except 블록이 수행된다. 하지만 try 블록에 오류가 발생하지 않는다면 except블록이 수행되지 않는다.

`[]`기호는 괄호 안의 내용을 생략할 수 있다는 관례 표기이다. 따라서 이 구문은

1. try. except만 쓰는 방법
2. 발생 오류를 포함한 except문
3. 발생 오류와 오류 메세지 변수까지 포함한 except문

이렇게 세가지 방법으로 작성할 수 있다.

3번쨰 방법은 오류 메세지의 내용까지 알고 싶을 때 사용하는 방법이다.

```python
except ZeroDivisionError as e:
    print(e)
```

### try..finally

finally절은 try문 수행 도중 예외 발생 여부에 상관없이 항상 수행된다. 보통 사용한 리소스를 close할 때에 많이 사용한다.

```python
f = open('foo.txt','w')
try:
    # 수행수행
finally:
    f.close()
```

foo.txt 파일을 쓰기모드로 연 후에 try문을 수행한 후 예외 발생 여부와 상관없이 finally절에서 `f.close()`로 열린 파일을 닫을 수 있다.

### 여러 개의 오류 처리하기

```python
try:
    ...
except 발생오류1:
    ...
except 발생오류2:
    ...
```

위와 같이 작성할 경우 발생하는 오류에 따라 처리를 다르게 할 수 있다.

```python
try:
    ...
except (발생오류1, 발생오류2) as e:
    print(e)
```

2개 이상의 오류를 동일하게 처리하려면 위와 같이 괄호를 사용하여 함꼐 묶여서 처리하면 된다.

### 오류 회피하기

```python
try:
    f = open('나없는파일', 'r')
except FileNotFoundError:
    pass
```

`pass`를 사용하여 오류를 그냥 회피하도록 할 수 있다.

### 오류 발생시키기

프로그래밍을 하다 보면 종종 오류를 일부러 발생시켜야 할 경우도 생긴다.

파이썬에서는 `raise`명령어를 사용해 오류를 강제로 발생시킬 수 있다.

```python
def enque(self, x: Any) -> None:
    """데이터 x를 enqueue"""
    if self.is_full():
        raise FixedQueue.Full # 큐가 가득 차 있는 경우 예외 처리 발생
```

```python
class Bird:
    def fly(self):
        raise NotImplementedError
```

> `NotImplementedError`는 파이썬 내장 오류로, 꼭 작성해야 하는 부분이 구현되지 않았을 경우 일부러 오류를 일으키기 위해 사용한다.

```python
class Eagle(Bird):
    pass

eagle = Eagle()
eagle.fly()
```

Eagle 클래스는 Bird 클래스를 상속받는다. Eagle 클래서에서 fly함수를 구현하지 않았기 때문에 Bird 클래스의 fly 함수가 호출된다. 그리고 raise문에 의해 에러가 발생할 것이다.

> 상속받는 클래스에서 함수를 재구현하는 것을 메서드 오버라이딩이라고 부린다.

`NotImplementedError`가 발생하지 않게 하려면 Eagle 클래스에 fly 함수를 반드시 구현해야 한다.

```python
class Eagle(Bird):
    def fly(self):
        print("very fast")

eagle = Eagle()
eagle.fly()
```

### 예외 만들기

파이썬 내장 클래스인 `Exception`클래스를 상속하여 만들 수 있다.

```python
class MyError(Exception):
    pass

def say_nick(nick):
    if nick == '바보':
        raise MyError()
    print(nick)

try:
    say_nick("천사")
    say_nick("바보")
except MyError as e:
    print(e)
    print("허용되지 않는 별명입니다.")
```

오류메세지를 출력했을 때 오류 메세지가 보이게 하려면 오류 클래스에 `__str__`메서드를 구현해야 한다.

```python
class MyError(Exception):
    def __str__(self):
        return "허용되지 않는 별명입니다."
```
