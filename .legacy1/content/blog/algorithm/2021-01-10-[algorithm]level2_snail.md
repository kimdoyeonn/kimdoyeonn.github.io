---
title: '[algorithm]level2 소수 찾기'

tags: [python, programmers, algorithm]
---

참고: [프로그래머스](https://programmers.co.kr/learn/courses/30/lessons/68645)

###### 문제 설명

정수 n이 매개변수로 주어집니다. 다음 그림과 같이 밑변의 길이와 높이가 n인 삼각형에서 맨 위 꼭짓점부터 반시계 방향으로 달팽이 채우기를 진행한 후, 첫 행부터 마지막 행까지 모두 순서대로 합친 새로운 배열을 return 하도록 solution 함수를 완성해주세요.

![examples.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/e1e53b93-dcdf-446f-b47f-e8ec1292a5e0/examples.png)

---

##### 제한사항

- n은 1 이상 1,000 이하입니다.

---

##### 입출력 예

| n   | result                                                    |
| --- | --------------------------------------------------------- |
| 4   | `[1,2,9,3,10,8,4,5,6,7]`                                  |
| 5   | `[1,2,12,3,13,11,4,14,15,10,5,6,7,8,9]`                   |
| 6   | `[1,2,15,3,16,14,4,17,21,13,5,18,19,20,12,6,7,8,9,10,11]` |

#### 내 풀이

```python
def solution(n):
    answer = []

    # 삼각형 형태의 리스트 temp[0] = 1개, temp[1] = 2개, temp[2] = 3개...
    temp = [[0]*cnt for cnt in range(1, n+1)]
	# 방향이 바뀌는 패턴을 넣어준 리스트 n, n-1, n-2... 패턴으로 방향이 바뀌고, 3이 한바퀴
    count = [num for num in range(n, 0, -1)]

    # 진행 방향에 따른 인덱스가 바뀌는 패턴을 dict형에 저장
    move = {
        'down': [1, 0],
        'right': [0, 1],
        'up': [-1, -1]
    }

    x = -1
    y = 0	# 삼각형 배열에서 패턴을 가지고 회전하면서 값을 넣어줄 인덱스
    number = 1	# 리스트에 들어갈 숫자
    for i, cnt in enumerate(count):
        for _ in range(cnt):
            if i % 3 == 0:
                dire = 'down'
            elif i % 3 == 1:
                dire = 'right'
            else:
                dire = 'up'
            x += move[dire][0]
            y += move[dire][1]
            temp[x][y] = number
            number += 1

    for t in temp:
        answer += t
    return answer
```

<img src="https://user-images.githubusercontent.com/53068706/107882599-8f1a2980-6f2d-11eb-9da6-8c5133224cf8.jpg" alt="snail_1" style="zoom:33%;" />

회전하는 인덱스의 패턴을 알아내어 삼각형을 달팽이 형태로 돌 수 있게 만들었다. 회전하는 형태로 만들어주기 위해 어떤 방향으로 움직일지, 그 방향을 어떻게, 언제 바꿔줄지를 생각해야했다.

어떤 방향으로 움직일지 찾아내는 것은 직선으로 움직이기 때문에 알아내기 어렵지 않았다. 이동은 크게 아래로 이동, 오른쪽으로 이동, 대각선 위로 이동 이렇게 세가지로 나뉜다. 어떻게 이동하는지 패턴을 살펴보면 [1, 0], [0, 1], [-1, -1]으로 움직인다는 것을 알 수 있다.(그림 참조) 그리고 방향을 바꿔주기 위해 딕셔너리에 이동방향의 키워드를 key로 가지는 리스트를 넣어주었다.

방향을 바꿔주는 타이밍은 방향이 바뀌는 패턴이 n, n-1, n-2, n-3....1의 형태를 가진다는 것과 한바퀴가 3개의 패턴을 가지고 반복된다는 것을 이용하였다. 리스트의 인덱스에 나머지 연산을 사용하여 0일 때 n만큼 이동한 후, 1일 때 방향을 바뀌어 n-1만큼 이동하고, 2일 때 n-2를 이동, 다시 0일 때 n-3만큼 이동.... 을 반복했고 최종적으로 인덱스가 회전하는 형태를 구현할 수 있었다.
