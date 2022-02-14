---
title: "[algorithm]level1 체육복"
excerpt: ""
category:
  - algorithm
tags: [python, programmers, algorithm]
---

###### 문제 설명

점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- 전체 학생의 수는 2명 이상 30명 이하입니다.
- 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
- 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

##### 입출력 예

| n    | lost   | reserve   | return |
| ---- | ------ | --------- | ------ |
| 5    | [2, 4] | [1, 3, 5] | 5      |
| 5    | [2, 4] | [3]       | 4      |
| 3    | [3]    | [1]       | 2      |

##### 입출력 예 설명

예제 #1
1번 학생이 2번 학생에게 체육복을 빌려주고, 3번 학생이나 5번 학생이 4번 학생에게 체육복을 빌려주면 학생 5명이 체육수업을 들을 수 있습니다.

예제 #2
3번 학생이 2번 학생이나 4번 학생에게 체육복을 빌려주면 학생 4명이 체육수업을 들을 수 있습니다.

[출처](http://hsin.hr/coci/archive/2009_2010/contest6_tasks.pdf)

### 내 풀이

```python
# 체육복
def solution(n, lost, reserve):
    answer = 0

    # 여벌옷이 있는데 도난당한 학생을 먼저 걸러주어야함
    # 먼저 걸러주지 않으면 반복문을 돌면서 앞의 학생을 처리할 때 필요없는데 빌림당할수도 있음
    f_lost = [std for std in lost if not (std in reserve)] 
    # list(set(lost)-set(reserve))
    f_reserve = [std for std in reserve if not (std in lost)] 
    # list(set(reserve)-set(lost))


    for std in f_reserve:
        if std-1 in f_lost:
            f_lost.remove(std-1)
        elif std+1 in f_lost:
            f_lost.remove(std+1)

    return n - len(f_lost)

```

### 다른 사람 풀이

```python
def solution(n, lost, reserve):
    _reserve = [r for r in reserve if r not in lost]
    _lost = [l for l in lost if l not in reserve]
    for r in _reserve:
        f = r - 1
        b = r + 1
        if f in _lost:
            _lost.remove(f)
        elif b in _lost:
            _lost.remove(b)
    return n - len(_lost)
```



> `not in`을 사용할 수 있다는걸 몰랐다. 나중에 써먹어야지
> `set(x)-set(y)`도 할 수 있는지 몰랐다. 중복된 자료를 걸러낼 때 사용하면 편할 것 같다.
>
> 세세하게 차근차근 따져보지 않고 두루뭉실하게 대충 생각하는 버릇이 있는거같다. 귀찮아도 차근차근 천천히 최대한 많은 경우를 따져볼 수 있게 노력해야겠다.