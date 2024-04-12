---
title: '[python] 함수 정리(계속 업데이트)'
tags: [python, function]
---

문제를 풀거나 강의를 들으면서 헷갈리거나 궁금한 함수를 기록하고 나중에 찾아보면서 정리할 예정

- `isnumeric()`, `isdigit()`, `isdecimal()` 의 차이

  - `isnumeric()`
    - 문자열 내장함수
    - 문자열이 모두 `numeric`문자로 이루어져있다면 `True`를 반환합니다.
    - 숫자를 표현하는 문자열까지 포함한다.(제곱근, 분수, 거듭제곱)
  - `isdigit()`
    - 문자열 내장함수
    - 모든 문자가 `digit`이면 `True`를 반환합니다.
    - 단일 글자가 숫자형태이면 무조건 `True`
  - `isdecimal()`
    - 문자열 내장함수
    - 문자열 내의 모든 문자가 십진수 문자이면 `True`를 반환합니다.
    - 문자열이 int형으로 변환되지 않는다면 `False`이고 특수문자 중 숫자 모양은 숫자로 보지 않는다.

- `find()`, `index()` 의 차이

  - 둘 다 찾고자 하는 값의 index 값을 리턴합니다.
  - `find()`는 찾는 문자나 문자열이 없는 경우 -1을 `return`한다.
  - `index()`는 찾는 문자나 문자열이 없을 경우 오류를 발생시킨다.
    `# ValueError: substring not found`

- `sum(iterable,/,start=0)`

  - 내장함수

  - `iterable`과 `start`에 해당하는 항목들을 왼쪽에서 오른쪽으로 합하고 그 합을 반환합니다.
  - `iterable`의 항목은 일반적으로 숫자이며 `start`의 값은 문자열이 될 수 없습니다.

- `replace(old,new[,count])`

  - 문자열 내장 함수
  - 모든 old를 new로 치환한 값을 반환합니다.

- `count`인수가 주어졌다면 `count`만큼의 값만 치환됩니다.
- `zip(*iterables)`

  - 내장함수
  - `iterable`들의 요소들을 모아 `interator`로 만든다.(?) -> 더 알아봐야겠다.

#### `enumerate`

- 반복문 사용 시 몇 번째 반복문인지 확인이 필요할 때 사용합니다.
- 인덱스 번호와 컬렉션의 원소를 tuple 형태로 반환합니다.

```python
t = [1,5,3,6,2]
for p in enumerate(t):
    print(p)

(0, 1)
(1, 5)
(2, 3)
(3, 6)
(4, 2)

# tuple 형태 반환을 이용하여 아래처럼 활용할 수 있습니다.
for i, p in enumerate(t):
    print("index: {}, value: {}".format(i,p))

index: 0, value: 1
index: 1, value: 5
index: 2, value: 3
index: 3, value: 6
index: 4, value: 2
```
