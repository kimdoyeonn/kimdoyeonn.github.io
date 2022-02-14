---
title: '[doit_algorithm] 06-7 병합 정렬'
tags: [python, doit_algorithm]
---

참고: doit 자료구조와 함께 배우는 알고리즘 입문

병합정렬(merge sort)은 배열을 앞부분과 뒷부분의 두 그룹으로 나누어 각각 정렬한 후 병합하는 작업을 반복하는 알고리즘입니다.

### 정렬을 마친 배열의 병합

각 배열에서 주목하는 원소의 값을 비교하여 작은 쪽의 원소를 꺼내 새로운 배열에 저장합니다. 이 과정을 반복하며 정렬을 마친 배열을 만듭니다.

```python
# 정렬을 마친 두 배열을 병합하기

from typing import Sequence, MutableSequence


def merge_sorted_list(a: Sequence, b: Sequence, c: MutableSequence) -> None:
    """정렬을 마친 배열 a와 b를 병합하여 c에 저장"""
    pa, pb, pc = 0, 0, 0          # 각 배열의 커서
    na, nb, nc = len(a), len(b), len(c)     # 각 배열의 원소 수

    while pa < na and pb < nb:              # pa와 pb를 비교하여 작은 값을 pc에 저장
        # print(f' {a[pa]} {b[pb]}')
        if a[pa] <= b[pb]:
            c[pc] = a[pa]
            pa += 1
        else:
            c[pc] = b[pb]
            pb += 1
        pc += 1
        # print(f'배열 c: {c}')

    while pa < na:                          # a에 남은 원소를 c에 복사
        c[pc] = a[pa]
        pa += 1
        pc += 1

    while pb < nb:                          # b에 남은 원소를 c에 복사
        c[pc] = b[pb]
        pb += 1
        pc += 1
        # print(f'배열 c: {c}')
```

- pa와 pb를 비교하여 작은 값을 pc에 대입하고 작은 값이 있던 커서와 pc를 +1해준다. 값을 꺼내지 않은 커서는 움직이지 않는다. 커서 pa와 pb가 배열의 끝에 도달하면 while 문이 종료된다.
- 커서가 아직 끝에 도달하지 않은 경우 배열에 남은 원소를 모두 c에 복사한다. (a,b의 길이가 달라서 하나만 끝에 도달한 경우 실행됨)

#### sorted() 함수로 병합 정렬하기

```python
c = list(sorted(a+b))
```

- a와 b를 연결하여 오름차운으로 정렬한 것을 list로 변환하여 c에 저장

- a와 b가 정렬을 마친 상태가 아니어도 적용할 수 있다는 장점이 있지만, 속도가 빠르지 않다는 단점도 있습니다. 빠르게 병합하려면 다음과 같이 heapq 모듈의 merge()함수를 사용하면 됩니다.

  ```python
  # 정렬을 마친 두 뱅려의 병합(heapq.merge 사용)

  import heapq

  a = [2, 4, 6, 8, 11, 13]
  b = [1, 2, 3, 4, 9, 16, 21]
  c = list(heapq.merge(a, b))        # 배열 a와 b를 병합하여 c에 저장

  ```

### 병합 정렬 만들기

정렬을 마친 배열의 병합을 응용하여 분할 정복법에 따라 정렬하는 알고리즘을 병합 정렬이라고 합니다.

주어진 배열을 두개의 배열로 나눈 후, 나눈 두 배열을 각각 정렬한 뒤 병합하여 배열 정렬을 완료합니다. 배열을 반으로 나눈 앞부분과 뒷부분의 정렬을 각각 수행할 때도 똑같이 병합 정렬을 적용하여 진행합니다.

#### 병합 정렬 알고리즘

**배열의 원소 수가 2개 이상인 경우**

1. 배열의 앞부분을 병합 정렬로 정렬합니다.
2. 배열의 뒷부분을 병합 정렬로 정렬합니다.
3. 배열의 앞부분과 뒷부분을 병합합니다.

```python
# 병합 정렬 알고리즘 구현하기

from typing import MutableSequence


def merge_sort(a: MutableSequence) -> None:
    """병합 정렬"""

    def _merge_sort(a: MutableSequence, left: int, right: int) -> None:
        """a[right] ~ a[left]를 재귀적으로 병합 정렬"""
        if left < right:
            center = (left+right) // 2

            _merge_sort(a, left, center)    # 배열 앞부분을 병합 정렬
            _merge_sort(a, center + 1, right)   # 배열 뒷부분을 병합 정렬

            # 앞부분과 뒷부분을 병합하는 과정-------------------------------
            p = j = 0
            i = k = left

            while i <= center:
                buff[p] = a[i]
                p += 1
                i += 1

            while i <= right and j < p:
                if buff[j] <= a[i]:
                    a[k] = buff[j]
                    j += 1
                else:
                    a[k] = a[i]
                    i += 1
                k += 1

            while j < p:
                a[k] = buff[j]
                k += 1
                j += 1
            # 앞부분과 뒷 부분을 병합하는 과정-------------------------------

    n = len(a)
    buff = [None] * n           # 작업용 배열을 생성
    _merge_sort(a, 0, n-1)      # 배열 전체를 병합 정렬
    del buff

```

배열 병합의 시간 복잡도는 O(n)입니다. 데이터 원소 수가 n일 때 병합 정렬의 단계는 log n만큼 필요하므로 전체 시간 복잡도는 O(n logn)입니다. 병합 정렬 알고리즘은 서로 떨어져 있는 우너소를 교환하는 것이 아니므로 안정적입니다.
