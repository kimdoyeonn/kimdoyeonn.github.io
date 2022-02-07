---
title: '[doit_algorithm] 07-1 브루트 포스법'
excerpt: ''
category:
  - doit_algorithm
tags: [python, doit_algorithm]
---

참고: doit 자료구조와 함께 배우는 알고리즘 입문

#### 문자열 검색이란?

문자열 검색(string search)은 어떤 문자열 안에 따른 문자열이 포함되어 있는지 검사하고, 만약 포함되어 있다면 어디에 위치하는지 찾아내는 것을 말함

- 검색되는 문자열을 text, 찾아내는 문자열을 pattern이라고 한다.

#### 브루트 포스법 알아보기

- 선형 검색을 단순하게 확장한 알고리즘이라서 **단순법**이라고 합니다.
- 이미 검사한 위치를 기억하지 못하므로 브루트 포스법은 효율이 좋지 않다.

```python
def bf_match(txt: str, pat: str) -> int:
    """브루트 포스법으로 문자열 검색"""

    pt = 0              # txt를 따라가는 커서
    pp = 0              # pat을 따라가는 커서

    while pt != len(txt) and pp != len(pat):
        if txt[pt] == pat[pp]:
            pt += 1
            pp += 1
        else:
            pt = pt - pp + 1
            pp = 0
    return pt - pp if pp == len(pat) else -1
```

#### 멤버십 연산자와 표준 라이브러리를 사용한 문자열 검색

**멤버십 연산자로 구현하기**

membership operator인 in과 not in을 사용하면 어떤 문자열이 다른 문자열 안에 포함되어 있는지 검색할 수 있습니다.

```python
ptn in txt
ptn not in txt
```

이 방법은 어떤 문자열이 다른 문자열 안에 포함되어 있는지 판단할 수는 있지만 그 위치는 알지 못합니다.

**find, index 계열 함수로 구현하기**

str 클래스형에 소속된 find(), rfind(), index(), rindex() 함수는 문자열을 검색하여 검색한 문자열의 위치를 반환합니다.

- `find()`

  ```python
  str.find(sub[, start[, end]])
  ```

  문자열 str의 [start:end]에 sub가 포함되면 그 가운데 가장 작은 인덱스를 반환하고, 그렇지 않으면 -1을 반환합니다.

  sub, start, end 중에서 end만 생략하거나 start와 end 둘 다 생략 할 수 있습니다. sub는 생략할 수 없습니다.(생략할 수 있는 인수 start와 end는 슬라이스 표기에 따라 지정합니다.초기값은 0과 슬라이스되는 시퀀스의 길이)

- `rfind()`

  ```python
  str.rfind(sub[, start[, end]])
  ```

  [start:end]에 sub가 포함되면 그 가운데 가장 큰 인덱스를 반환하고, 그렇지 않으면 -1을 반환합니다.(생략할 수 있는 인수 start와 end는 슬라이스 표기에 따라 지정합니다.초기값은 0과 슬라이스되는 시퀀스의 길이)

- `index()`

  ```python
  str.index(sub[, start[, end]])
  ```

  find() 함수와 같은 기능을 수행합니다. 다만 sub가 발견되지 않으면 예외 처리로 ValueError를 내보냅니다.

- `rindex()`

  ```python
  str.index(sub[, start[, end]])
  ```

  rfind() 함수와 같은 기능을 수행합니다. 다만 sub가 발견되지 않으면 예외 처리로 ValueError를 내보냅니다.

**with()계열 함수로 구현하기**

어떤 문자열이 다른 문자열의 시작이나 끝에 포함되어 있는지를 판단합니다.

- `startswith()`

  ```python
  str.startswith(prefix[, start[, end]])
  ```

  문자열이 prefix로 시작하면 True, 아니면 False를 반환합니다. start가 지정되어 있으면 그 위치에서 판단을 시작하고, end가 지정되어 있으면 그 위치에서 비교를 중단합니다.

- `endswith()`

  ```python
  str.endswith(suffix[, start[, end]])
  ```

  문자열이 suffix로 끝나면 True, 아니면 False를 반환힙니다. start가 지정되어 있으면 그 위치에서 판단을 시작하고, end가 지정되어 있으면 그 위치에서 비교를 중단합니다.
