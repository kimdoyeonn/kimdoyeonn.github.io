---
title: '[algorithm]2581번 소수'
excerpt: ''
category:
  - algorithm
tags: [python, baekjoon, algorithm]
---

- 참고: [백준](https://www.acmicpc.net/step/10)

| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| :-------- | :---------- | :---- | :---- | :-------- | :-------- |
| 1 초      | 128 MB      | 39565 | 15254 | 13346     | 39.123%   |

## 문제

자연수 M과 N이 주어질 때 M이상 N이하의 자연수 중 소수인 것을 모두 골라 이들 소수의 합과 최솟값을 찾는 프로그램을 작성하시오.

예를 들어 M=60, N=100인 경우 60이상 100이하의 자연수 중 소수는 61, 67, 71, 73, 79, 83, 89, 97 총 8개가 있으므로, 이들 소수의 합은 620이고, 최솟값은 61이 된다.

## 입력

입력의 첫째 줄에 M이, 둘째 줄에 N이 주어진다.

M과 N은 10,000이하의 자연수이며, M은 N보다 작거나 같다.

## 출력

M이상 N이하의 자연수 중 소수인 것을 모두 찾아 첫째 줄에 그 합을, 둘째 줄에 그 중 최솟값을 출력한다.

단, M이상 N이하의 자연수 중 소수가 없을 경우는 첫째 줄에 -1을 출력한다.

## 예제 입력 1 복사

```
60
100
```

## 예제 출력 1 복사

```
620
61
```

## 예제 입력 2 복사

```
64
65
```

## 예제 출력 2 복사

```
-1
```

## 출처

[Olympiad ](https://www.acmicpc.net/category/2)> [한국정보올림피아드 ](https://www.acmicpc.net/category/55)> [한국정보올림피아드시․도지역본선 ](https://www.acmicpc.net/category/57)> [지역본선 2006 ](https://www.acmicpc.net/category/70)> [중등부](https://www.acmicpc.net/category/detail/368) 1번

- 데이터를 추가한 사람: [hchanhong](https://www.acmicpc.net/user/hchanhong) [kyaryunha](https://www.acmicpc.net/user/kyaryunha)
- 문제의 오타를 찾은 사람: [jh05013](https://www.acmicpc.net/user/jh05013) [sky1357](https://www.acmicpc.net/user/sky1357)
- 잘못된 데이터를 찾은 사람: [myungwoo](https://www.acmicpc.net/user/myungwoo)

## 알고리즘 분류

- [수학](https://www.acmicpc.net/problem/tag/124)
- [정수론](https://www.acmicpc.net/problem/tag/95)
- [소수 판정](https://www.acmicpc.net/problem/tag/9)

### 내 풀이

```python
m = int(input())
n = int(input())
prime = []


if m <= 2 <= n:
    prime.append(2)
# 2를 제외한 짝수는 소수가 될 수 없으므로 고려하지 않음
if m % 2 == 0:
    m += 1

for num in range(m, n+1, 2):
    if num == 1:
        continue
    for i in range(3, num//3+1):
        if num % i == 0:
            break
    else:
        prime.append(num)
if prime:
    print(sum(prime))
    print(prime[0])
else:
    print(-1)
```

- 2를 제외한 짝수는 소수의 조건에 맞지 않으므로 홀수 중에서 판단할 수 있게 반복문을 만들었고, 범위 안에 2가 포함될 때는 리스트에 미리 2를 넣어주는 것으로 해결했다.
- 소수인지 판단하기 위해 반복문을 사용해 나누어 떨어지는지 확인했는데 그 반복문의 범위는 `3부터 소수인지 판단할 수 // 3 + 1 `로 하였다.
  - 짝수는 미리 제거하였으므로 `num / i`의 결과가 3이 나오게 하는 수가 나누어 떨어지는 수 중에서 최댓값이 되고, 그 이상의 수는 `num`을 나누어 떨어지게 만들 수 없다.

> 근데 이렇게 짝수를 먼제 제외하고 한다고 속도가 빨라지거나 하지는 않는 것 같다. 오히려 짝수를 포함해서 제출해본 결과가 속도는 더 빨랐음...
