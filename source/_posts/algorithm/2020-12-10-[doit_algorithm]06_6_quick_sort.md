---
title: "[doit_algorithm] 06-6 퀵 정렬"
excerpt: ""
category:
  - doit_algorithm
tags: [python, doit_algorithm]
---
참고: doit 자료구조와 함께 배우는 알고리즘 입문



#### 퀵 정렬 알아보기

퀵정렬(quick sort)은 가장 빠른 정렬 알고리즘으로 알려져 있으며 널리 사용되며 알고리즘의 정렬 속도가 매우 빠르다 하여 찰스 A. R. 호어가 붙인 이름입니다.

1. 정렬하려는 그룹에서 임의로 하나의 값을 선택해 그 값을 기준으로 그룹을 두개로 나눈다.

2. 다시 각 그룹에서 임의의 값을 선택하여 나누기를 반복하여 모든 그룹이 자료가 하나씩 남으면 정렬이 완료된다.

   > 여기서 기준이 되는 임의의 값을 피벗(pivot)이라고 하고, 다른 말로는 중심축이라고도 한다. 피벗은 임의로 선택할 수 있고, 선택된 피벗은 두 개로 나눈 그룹 어디에 넣어도 상관없다.



### 배열을 두 그룹으로 나누기

가운데 값을 피벗으로 하고 오른쪽 끝과 왼쪽 끝에서 값을 스캔하면서 피벗과 비교하여 피벗보다 큰 값은 오른쪽으로 보내고 피벗보다 작은 값은 왼쪽으로 보낸다.

```python
# 배열을 두 그룹으로 나누기

from typing import MutableSequence


def partition(a: MutableSequence) -> None:
    """배열을 나누어 출력"""
    n = len(a)
    pl = 0          # 왼쪽 커서
    pr = n - 1      # 오른쪽 커서
    x = a[n // 2]   # 피벗(가운데 원소)

    while pl <= pr:
        while a[pl] < x:    # a[pl]의 값이 피벗보다 클 때까지 인덱스를 옮김(오른쪽으로)
            pl += 1
        while a[pr] > x:    # a[pr]의 값이 피벗보다 작을 때까지 인덱스를 옮김(왼쪽으로)
            pr -= 1

        if pl <= pr:        # pl, pr이 서로 일치하거나 교차하지 않았을 경우 True
            a[pl], a[pr] = a[pr], a[pl]	# 교환
            pl += 1
            pr -= 1

    print(f'피벗은 {x}입니다.')

    print('피벗 이하인 그룹입니다.')
    print(*a[0: pl])                    # a[0] ~ a[pl-1]

    if pl > pr + 1:
        print('피벗과 일치하는 그룹입니다.')
        print(*a[pr+1:pl])              # a[pr+1] ~ a[pl-1]

    print('피벗 이상인 그루입니다.')
    print(*a[pr+1:n])                   # a[pr+1] ~ a[n-1]


if __name__ == "__main__":
    print('배열을 나눕니다.')
    num = int(input('원소 수를 입력하세요: '))

    x = [None]*num              # 원소 수가 num인 배열을 생성

    for i in range(num):
        x[i] = int(input(f'x[{i}]: '))

    partition(x)                # 배열 x를 나누어 출력
```

이 프로그램에서는 배열 가운데에 있는 원소를 피벗으로 선택했습니다. 피벗을 어떤 값으로 선택하느냐에 따라 배열을 나누는 것과 정렬하는 성능에 영향을 미칩니다.





### 퀵 정렬 만들기

배열을 두 그룹으로 나누는 것을 조금 더 발전시키면 큇 정렬 알고리즘이 됩니다. 

원소가 1개인 그룹은 더이상 나눌 필요가 없으므로 원소 수가 2개 이상인 그룹만 다음과 같이 반복해서 나눕니다.

- pr가 a[0]보다 오른쪽에 위치하면 (left < pr) 왼쪽 그룹을 나눕니다.
- pl가 a[8]보다 왼쪽에 위치하면 (pl < right) 오른쪽 그룹을 나눕니다.

> 가운데 그룹은 나눌 필요가 없으므로 제외합니다.



퀵 정렬은 5장에서 살펴본 8퀸 문제와 같은 분할 정복 알고리즘이므로 재귀 호출을 사용하여 구현할 수 있습니다.  아래의 qsort()함수는 배열 a, 나누는 구간의 첫 번째 원소(left), 마지막 원소(right)의 인덱스를 전달받아 퀵 정렬을 수행합니다.

```python
# 퀵 정렬 알고리즘 구현하기

from typing import MutableSequence


def qsort(a: MutableSequence, left: int, right: int) -> None:
    """a[left] ~ a[right]를 퀵 정렬"""
    pl = left                       # 왼쪽 커서
    pr = right                      # 오른쪽 커서
    x = a[(left + right) // 2]      # 피벗(가운데 원소)

    while pl <= pr:
        while a[pl] < x:
            pl += 1
        while a[pr] > x:
            pr -= 1
        if pl <= pr:
            a[pl], a[pr] = a[pr], a[pl]
            pl += 1
            pr -= 1
    if left < pr:
        qsort(a, left, pr)
    if pl < right:
        qsort(a, pl, right)


def quick_sort(a: MutableSequence) -> None:
    """퀵정렬"""
    qsort(a, 0, len(a)-1)


if __name__ == "__main__":
    print('퀵 정렬을 수행힙니다.')
    num = int(input('원소 수를 입력하세요: '))
    x = [None] * num    # 원소 수가 num인 배열을 생성

    for i in range(num):
        x[i] = int(input(f'x[{i}]: '))

    quick_sort(x)       # 배열 x를 퀵 정렬

    print('오름차순으로 정렬했습니다.')

    for i in range(num):
        print(f'x[{i}] = {x[i]}')

```

> qsort() 함수는 3개의 인수를 전달받는데 인수를 1개 전달받는 quick_sort()함수로부터 다시 qsort() 함수를 호출하는 구조입니다. 이렇게 작성하면 프로그램 본문에서 함수를 호출할 때 일관성을 유지할 수 있습니다. 



하지만 퀵 정렬은 서로 이웃하지 않은 원소를 교환하므로 안정적이지 않은 알고리즘입니다.



###  비재귀적인 퀵 정렬 만들기

```python
# 비재귀적인 퀵 정렬 구현하기
from stack import Stack
from typing import MutableSequence


def qsort(a: MutableSequence, left: int, right: int) -> None:
    """a[left] ~ a[right]를 퀵 정렬(비재귀적인 퀵 정렬)"""

    range = Stack(right - left + 1)  # 스택 생성

    range.push((left, right))

    while not range.is_empty():
        pl, pr = left, right = range.pop()  # 왼쪽, 오른쪽 커서를 꺼냄
        x = a[(left + right) // 2]      # 피벗(가운데 원소)

    while pl <= pr:
        while a[pl] < x:
            pl += 1
        while a[pr] > x:
            pr -= 1
        if pl <= pr:
            a[pl], a[pr] = a[pr], a[pl]
            pl += 1
            pr -= 1
    if left < pr:
        qsort(a, left, pr)
    if pl < right:
        qsort(a, pl, right)


def quick_sort(a: MutableSequence) -> None:
    """퀵정렬"""
    qsort(a, 0, len(a)-1)
```

데이터를 임시 저장하기 위해 다음 스택을 사용합니다.

- range: 나눌 범위에서 맨 앞 원소의 인덱스와 맨 끝 원소의 인덱스를 조합한 튜플 스택

이 스택의 크기는 right - left + 1 이며 나누는 배열의 원소 수와 같습니다.

스택에 푸시한 값은 나눠야 할 배열의 맨 앞 원소와 맨 끝 원소의 인덱스입니다. 배열을 나누는 작업을 완료하면 왼쪽 그룹의 인덱스와 오른쪽 그룹의 인덱스 범위를 푸시합니다. 그리고 다시 스택에 팝한 범위를 나누는 작업을 반복하여 정렬을 수행합니다. 이 과정에서 스택이 비면 정렬이 끝납니다.



#### 스택의 크기

스택의 크기는 정렬 대상인 배열의 원소 수와 같은 값으로 합니다.

배열을 스택에 푸시하는 순서를 정할 때는 다음 2가지 규칙을 고려할 수 있습니다.

- 규칙 1: 원소 수가 많은 쪽의 그룹을 먼저 푸시합니다.
- 규칙 2: 원소 수가 적은 쪽의 그룹을 먼저 푸시합니다.



__규칙 1: 원소 수가 많은 그룹을 먼저 푸시__

원소 수가 많은 그룹을 먼저 푸시하면 원소 수가 적은 그룹이 먼저 팝되어 나뉜다. 이렇게 하면 스택에 동시에 쌓여 있는 데이터의 개수는 최대 2가 된다. (p269)



__규칙 2: 원소 수가 적은 그룹을 먼저 푸시__

원소 수가 적은 그룹을 먼저 푸시하면 원소 수가 많은 그룹이 먼저 팝되어 나뉜다. 이렇게 하면 스택에 쌓여 있는 데이터의 개수는 최대 4가 된다. (p269)



일반적으로 원소 수가 적은 배열일수록 나누는 과정을 빠르게 마칠 수 있다. 따라서 앞에서 살펴본 규칙 1과 같이 원소 수가 많은 그룹의 나누기를 나중에 하고, 원소 수가 적은 그룹의 나누기를 먼저 하면 스택에 동시에 쌓이는 데이터 개수는 적어진다. 규칙 1, 2의 경우 스택에 넣고 꺼내는 횟수는 같지만, 동시에 쌓이는 데이터의 최대 개수는 다르다.

규칙 1에서 배열의 원소 수가 n이면, 스택에 쌓이는 데이터의 최대 개수는 log n보다 적다. 따라서 원소 수 n이 100만 개라도 스택의 최대 크기는 20으로 충분하다.



#### 피벗 선택하기

피벗 선택 방법은 퀵 정렬의 실행 효율에 큰 영향을 미칩니다. 만약 피벗으로 맨 앞, 맨 뒤의 원소를 선택할 경우 하나의 원소와 그 외 나머지 원소로 나누는 것이 되기 떄문에 한쪽으로 완전히 치우친 분할을 반복하므로 빠른 정렬 속도를 기대할 수 없습니다.

빠른 정렬을 위해서는 배열을 정렬한 뒤 가운데에 위치하는 값, 즉 전체에서 중앙값을 피벗으로 하는 것이 이상적입니다. 그러면 배열이 한쪽으로 치우치지 않고 절반 크기로 나누어집니다. 하지만 정렬된 배열의 중앙값을 구하려면 그에 대한 처리가 필요하고, 이 처리를 위해 많은 계산 시간이 걸립니다. 결국 피벗을 선택하는 의미가 없어집니다.

이 문제를 해결하기 위해서 다음과 같은 방법을 사용하면 최악의 경우를 피할 수 있습니다.

- 방법 1: 나누어야 할 배열의 원소 수가 3이상이면, 배열에서 임의의 원소 3개를 꺼내 중앙값인 원소를 피벗으로 선택한다.

- 방법 2: 나누어야 할 배열의 맨 앞 원소, 가운데 원소, 맨 끝 원소를 정렬한 뒤 가운데 원소와 맨 끝에서 두 번째 원소를 교환합니다. 맨 끝에서 두 번쨰 원솟값 a[right-1]이 피벗으로 선택되었고, 동시에 나눌 대상을 a[left+1] ~ a[right - 2]로 좁힙니다.

  p271



#### 퀵 정렬의 시간 복잡도

배열을 조금씩 나누어 보다 작은 문제를 푸는 과정을 반복하므로 시간 복잡도는 O(n logn)입니다. 그런데 정렬하는 배열의 초깃값이나 피벗을 선택하는 방법에 따라 실행 시간 복잡도가 증가하는 경우도 있습니다. 예를 들어 매번 1개이 원소와 나머지 원소로 나누어진다면 n번의 분할이 필요합니다. 이러한 최악의 경우 시간 복잡도는 O(n^2)입니다.



퀵 정렬은 원소 수가 적은 경우에는 그다지 빠른 알고리즘이 아닌 것으로 알려져 있습니다. 그래서 다음 2가지 방법을 적용하여 프로그램을 작성했습니다.

- 원소 수가 9개 미만인 경우 단순 삽입 정렬로 전환합니다.
- 피벗 선택은 방법 2를 채택합니다.

```python
# 퀵 정렬 알고리즘 구현하기(원소 수가 9 미만이면 단순 삽입 정렬)

from typing import MutableSequence


def sort3(a: MutableSequence, idx1: int, idx2: int, idx3: int) -> None:
    """a[idx1],a[idx2],a[idx3]를 오름차순으로 정렬하고 중앙값의 인덱스를 반환"""
    if a[idx2] < a[idx1]:
        a[idx2], a[idx1] = a[idx1], a[idx2]
    if a[idx3] < a[idx2]:
        a[idx3], a[idx2] = a[idx2], a[idx3]
    if a[idx2] < a[idx1]:
        a[idx2], a[idx1] = a[idx1], a[idx2]

    return idx2


def insertion_sort(a: MutableSequence, left: int, right: int) -> None:
    """a[left] ~ a[right]를 단순 삽입 정렬"""
    for i in range(left + 1, right + 1):
        j = i
        tmp = a[i]
        while j > 0 and a[j - 1] > tmp:
            a[j] = a[j - 1]
            j -= 1
        a[j] = tmp


def qsort(a: MutableSequence, left: int, right: int) -> None:
    """a[left] ~ a[right]를 퀵 정렬"""
    if right - left < 9:            # 원소 수가 9 미만이면 단순 삽입 정렬로 전환
        insertion_sort(a, left, right)
    else:
        pl = left                   # 왼쪽 커서
        pr = right                  # 오른쪽 커서
        m = sort3(a, pl, (pl + pr) // 2, pr)
        x = a[m]

        a[m], a[pr - 1] = a[pr - 1], a[m]
        pl += 1
        pr -= 2
        while pl <= pr:
            while a[pl] < x:
                pl += 1
            while a[pr] > x:
                pr -= 1
            if pl <= pr:
                a[pl], a[pl] = a[pr], a[pl]
                pl += 1
                pr -= 1

        if left < pr:
            qsort(a, left, pr)
        if pl < right:
            qsort(a, pl, right)


def quick_sort(a: MutableSequence) -> None:
    """퀵정렬"""
    qsort(a, 0, len(a)-1)
```



#### 보충수업 6-4 sorted() 함수로 정렬하기

파이썬에서는 정렬을 수행하는 sorted()함수를 내장함수로 제공합니다. 이 함수는 전달받은(임의의 자료형) 이터러블 객체의 원소를 정렬하여 list형으로 반환합니다. sorted() 함수는 '정렬을 직접 수행'하지 않고  '정렬을 수행한 뒤 늘어선 원소를 새로운 리스트로 생성하여 반환'합니다.

```python
a, b = sorted([a, b])				# a, b를 오름차순으로 정렬
a, b, c = sorted([a, b, c])			# a, b, c를 오름차순으로 정렬
a, b, c, d = sorted([a, b, c, d])	# a, b, c, d를 오름차순으로 정렬
```

이 3가지 예시에서는 변수를 나열한 리스트를 sorted() 함수에 전달하고, 반환된 리스트를 풀어 변수에 대입합니다. sorted() 함수는 오름차순을 기본으로 하지만, reverse에 True값을 넘겨주면 내림차순으로 정렬을 수행합니다.

```python
# sorted() 함수를 사용하여 정렬하기

print('sorted() 함수를 사용하여 정렬합니다.')
num = int(input('원소 수를 입력하세요: '))
x = [None] * num        # 원소 수가 num인 배열을 생성

for i in range(num):
    x[i] = int(input(f'x[{i}]: '))

# 배열 x를 오름차순으로 정렬
x = sorted(x)
print('오름차순으로 정렬했습니다.')
for i in range(num):
    print(f'x[{i}] = {x[i]}')


# 배열 x를 내림차순으로 정렬
x = sorted(x, reverse=True)
print('내림차순으로 정렬했습니다.')
for i in range(num):
    print(f'x[{i}] = {x[i]}')

```



튜플은 이뮤터블의 속성을 가지므로 튜플 자체를 정렬할 수 없습니다. 튜플을 정렬해야 한다면 다음과 같은 2단계 방법을 사용합니다.

- 1단계: sorted() 함수로 정렬한 원소의 나열에서 새로운 리스트를 생성합니다.

- 2단계: 생성한 리스트를 튜플로 변환합니다.

  ```python
  a = (1,3,2)
  a = tuple(sorted(a)) # a = (1,2,3)
  ```

  

