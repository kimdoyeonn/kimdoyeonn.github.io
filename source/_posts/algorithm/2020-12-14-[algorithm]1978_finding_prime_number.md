---
title: "[algorithm]1978번 소수 찾기"
excerpt: ""
category:
  - algorithm
tags: [python, baekjoon, algorithm]
---

- 참고: [백준](https://www.acmicpc.net/step/10)

| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :---- | :-------- | :-------- |
| 2 초      | 128 MB      | 57404 | 26900 | 22152     | 48.282%   |

### 문제

주어진 수 N개 중에서 소수가 몇 개인지 찾아서 출력하는 프로그램을 작성하시오.

### 입력

첫 줄에 수의 개수 N이 주어진다. N은 100이하이다. 다음으로 N개의 수가 주어지는데 수는 1,000 이하의 자연수이다.

### 출력

주어진 수들 중 소수의 개수를 출력한다.

#### 예제 입력 1 복사

```
4
1 3 5 7
```

#### 예제 출력 1 복사

```
3
```

#### 출처

- 데이터를 추가한 사람: [bclim9108](https://www.acmicpc.net/user/bclim9108) [nova9128](https://www.acmicpc.net/user/nova9128)
- 문제의 오타를 찾은 사람: [djm03178](https://www.acmicpc.net/user/djm03178)

#### 알고리즘 분류

- [수학](https://www.acmicpc.net/problem/tag/124)
- [정수론](https://www.acmicpc.net/problem/tag/95)
- [소수 판정](https://www.acmicpc.net/problem/tag/9)
- [에라토스테네스의 체](https://www.acmicpc.net/problem/tag/67)



### 내 풀이

```python
n = int(input())
nums = list(map(int, input().split()))
cnt = 0

for num in nums:
    if num == 1:
        continue
    for i in range(2, num):
        if num % i == 0:
            break
    else:
        cnt += 1

print(cnt)
```

- 1은 소수가 아니므로 continue
- 2는 소수이므로 결과에 포함되어야하는데, 2는 반복문 내부 코드가 실행되지 않고 else문이 실행되어 계산됨

