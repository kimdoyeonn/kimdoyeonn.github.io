---
title: '[algorithm]level3 순위'
excerpt: ''
category:
  - algorithm
tags: [algorithm, programmers]
---

###### 문제 설명

n명의 권투선수가 권투 대회에 참여했고 각각 1번부터 n번까지 번호를 받았습니다. 권투 경기는 1대1 방식으로 진행이 되고, 만약 A 선수가 B 선수보다 실력이 좋다면 A 선수는 B 선수를 항상 이깁니다. 심판은 주어진 경기 결과를 가지고 선수들의 순위를 매기려 합니다. 하지만 몇몇 경기 결과를 분실하여 정확하게 순위를 매길 수 없습니다.

선수의 수 n, 경기 결과를 담은 2차원 배열 results가 매개변수로 주어질 때 정확하게 순위를 매길 수 있는 선수의 수를 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- 선수의 수는 1명 이상 100명 이하입니다.
- 경기 결과는 1개 이상 4,500개 이하입니다.
- results 배열 각 행 [A, B]는 A 선수가 B 선수를 이겼다는 의미입니다.
- 모든 경기 결과에는 모순이 없습니다.

##### 입출력 예

| n   | results                                  | return |
| --- | ---------------------------------------- | ------ |
| 5   | [[4, 3], [4, 2], [3, 2], [1, 2], [2, 5]] | 2      |

##### 입출력 예 설명

2번 선수는 [1, 3, 4] 선수에게 패배했고 5번 선수에게 승리했기 때문에 4위입니다.
5번 선수는 4위인 2번 선수에게 패배했기 때문에 5위입니다.

### 내 풀이

```python
def solution(n, results):
    answer = 0

    wins, loses = {}, {}
    for i in range(1, n+1):
        wins[i], loses[i] = set(), set()

    for i in range(1, n+1):
        for result in results:
            a, b = result
            if a == i:
                wins[i].add(b)
            if b == i:
                loses[i].add(a)

        for win in loses[i]:
            wins[win].update(wins[i])

        for lose in wins[i]:
            loses[lose].update(loses[i])

    for i in range(1, n+1):
        if len(wins[i]) + len(loses[i]) == n-1:
            answer += 1

    return answer
```

- a 선수를 이긴 선수는 a선수에게 진 선수를 이긴다.
- a 선수에게 진 선수는 a선수에게 이긴 선수에게 진다.

위의 개념까지는 알았는데 코드로 표현할 방법을 찾지를 못해서 좀 찾아보고 풀 수 있었다.

- 진 사람 목록이 들어갈 `loses`와 이긴 사람 목록이 들어갈 `wins`을 딕셔너리 형태로 만들고, 선수를 key로 하고 value에 set을 초기화해준다.
- 1번부터 차례대로 1이 이기거나 진 경기를 찾아서 wins와 loses에 추가해주고, 1에게 이긴 선수(`loses[1]`)는 1이 이긴 선수들(`wins[1]`)을 이기니까 이긴 선수들의 wins에 1이 이긴 선수들(`wins[1]`)을 업데이트 해준다.
- 마찬가지로 1이 이긴 선수들(`wins[1]`)은 1이 진 선수들(`loses[1]`)에게 지니까 1에게 진 선수들의 loses에 1이 이긴 선수들(`wins[1]`)을 업데이트 해준다.
- 주어진 경기 결과를 정리한 후, `wins[i]의 수 + loses[i]의 수`가 본인을 제외한 `n-1`과 같다면 정확한 경기 순위를 알 수 있는 것이므로 answer에 1을 더하면서 모든 선수들을 확인하면 결과를 얻을 수 있다.
