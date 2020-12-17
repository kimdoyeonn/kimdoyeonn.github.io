---
title: "[algorithm]level2 다리를 지나는 트럭"
excerpt: ""
category:
  - algorithm
tags: [python, programmers, algorithm]
---

참고: [프로그래머스]https://programmers.co.kr/learn/courses/30/lessons/42583)

###### 문제 설명

트럭 여러 대가 강을 가로지르는 일 차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 트럭은 1초에 1만큼 움직이며, 다리 길이는 bridge_length이고 다리는 무게 weight까지 견딥니다.
※ 트럭이 다리에 완전히 오르지 않은 경우, 이 트럭의 무게는 고려하지 않습니다.

예를 들어, 길이가 2이고 10kg 무게를 견디는 다리가 있습니다. 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.

| 경과 시간 | 다리를 지난 트럭 | 다리를 건너는 트럭 | 대기 트럭 |
| --------- | ---------------- | ------------------ | --------- |
| 0         | []               | []                 | [7,4,5,6] |
| 1~2       | []               | [7]                | [4,5,6]   |
| 3         | [7]              | [4]                | [5,6]     |
| 4         | [7]              | [4,5]              | [6]       |
| 5         | [7,4]            | [5]                | [6]       |
| 6~7       | [7,4,5]          | [6]                | []        |
| 8         | [7,4,5,6]        | []                 | []        |

따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.

solution 함수의 매개변수로 다리 길이 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭별 무게 truck_weights가 주어집니다. 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.

##### 제한 조건

- bridge_length는 1 이상 10,000 이하입니다.
- weight는 1 이상 10,000 이하입니다.
- truck_weights의 길이는 1 이상 10,000 이하입니다.
- 모든 트럭의 무게는 1 이상 weight 이하입니다.

##### 입출력 예

| bridge_length | weight | truck_weights                   | return |
| ------------- | ------ | ------------------------------- | ------ |
| 2             | 10     | [7,4,5,6]                       | 8      |
| 100           | 100    | [10]                            | 101    |
| 100           | 100    | [10,10,10,10,10,10,10,10,10,10] | 110    |

[출처](http://icpckorea.org/2016/ONLINE/problem.pdf)



### 내 풀이

```python
def solution2(bridge_length, weight, truck_weights):
    bridge = []

    time = 0    # 경과 시간
    pt = 0      # 건널 차 리스트의 포인터
    temp = 0    # 모든 차가 다 지나가면 탈출
    while len(truck_weights) > temp:
        # 트럭 무게 리스트의 범위를 벗어나지 않기 위해
        if pt < len(truck_weights) and sum(bridge) + truck_weights[pt] <= weight:
            bridge.append(truck_weights[pt])
            pt += 1
        else:
            bridge.append(0)

        if len(bridge) == bridge_length:
            if bridge[0]:
                temp += 1
            del bridge[0]

        time += 1

    return time+1
```

- pt가 truck_weights의 범위를 벗어났을 때, 다음 트럭의 무게와 다리 위 트럭들의 무게를 계산해서 트럭이 올라갈 수 있는지 없는지 계산해주는 조건문이 실행될 경우 예외가 발생하기 때문에 `pt < len(truck_weights)`를 조건문에 추가해서 거짓일 경우 and 뒤의 조건문을 실행하지 않게 했다.
- 다리 위에 트럭이 올라갈 수 있으면 bridge 리스트에 트럭의 무게를 append해주고 pt를 +1해준다.
- 다리 위에 트럭이 올라갈 수 없으면 bridge 리스트에 0을 append 해준다.
- 만약 bridge 리스트의 길이가 문제에서 주어진 다리의 길이가 되면 제일 먼저 append된 bridge[0] 값을 지워주는데 이 값이 0이 아니라면 트럭이 다리에서 내려왔다는 의미로 temp에 +1을 해준다.
- 위 과정을 지나야하는 트럭의 개수보다 temp가 작은 동안 반복해준다.
- while이 끝났을 때 time은 마지막 트럭이 내려오는데 걸린 시간을 계산하지 않은 상태이므로 트럭이 내려오는데 걸린 시간을 추가로 계산 해준다. (time + 1)