---
title: "[algorithm]level1 다트게임"
excerpt: ""
category:
  - algorithm
tags: [python, programmers, algorithm]
---

###### 문제 설명

카카오톡에 뜬 네 번째 별! 심심할 땐? 카카오톡 게임별~

![Game Star](http://t1.kakaocdn.net/welcome2018/gamestar.png)

카카오톡 게임별의 하반기 신규 서비스로 다트 게임을 출시하기로 했다. 다트 게임은 다트판에 다트를 세 차례 던져 그 점수의 합계로 실력을 겨루는 게임으로, 모두가 간단히 즐길 수 있다.
갓 입사한 무지는 코딩 실력을 인정받아 게임의 핵심 부분인 점수 계산 로직을 맡게 되었다. 다트 게임의 점수 계산 로직은 아래와 같다.

1. 다트 게임은 총 3번의 기회로 구성된다.
2. 각 기회마다 얻을 수 있는 점수는 0점에서 10점까지이다.
3. 점수와 함께 Single(`S`), Double(`D`), Triple(`T`) 영역이 존재하고 각 영역 당첨 시 점수에서 1제곱, 2제곱, 3제곱 (점수1 , 점수2 , 점수3 )으로 계산된다.
4. 옵션으로 스타상(`*`) , 아차상(`#`)이 존재하며 스타상(`*`) 당첨 시 해당 점수와 바로 전에 얻은 점수를 각 2배로 만든다. 아차상(`#`) 당첨 시 해당 점수는 마이너스된다.
5. 스타상(`*`)은 첫 번째 기회에서도 나올 수 있다. 이 경우 첫 번째 스타상(`*`)의 점수만 2배가 된다. (예제 4번 참고)
6. 스타상(`*`)의 효과는 다른 스타상(`*`)의 효과와 중첩될 수 있다. 이 경우 중첩된 스타상(`*`) 점수는 4배가 된다. (예제 4번 참고)
7. 스타상(`*`)의 효과는 아차상(`#`)의 효과와 중첩될 수 있다. 이 경우 중첩된 아차상(`#`)의 점수는 -2배가 된다. (예제 5번 참고)
8. Single(`S`), Double(`D`), Triple(`T`)은 점수마다 하나씩 존재한다.
9. 스타상(`*`), 아차상(`#`)은 점수마다 둘 중 하나만 존재할 수 있으며, 존재하지 않을 수도 있다.

0~10의 정수와 문자 S, D, T, *, #로 구성된 문자열이 입력될 시 총점수를 반환하는 함수를 작성하라.

### 입력 형식

점수|보너스|[옵션]으로 이루어진 문자열 3세트.
예) `1S2D*3T`

- 점수는 0에서 10 사이의 정수이다.
- 보너스는 S, D, T 중 하나이다.
- 옵선은 *이나 # 중 하나이며, 없을 수도 있다.

### 출력 형식

3번의 기회에서 얻은 점수 합계에 해당하는 정수값을 출력한다.
예) 37

### 입출력 예제

| 예제 | dartResult | answer | 설명                        |
| ---- | ---------- | ------ | --------------------------- |
| 1    | `1S2D*3T`  | 37     | 11 * 2 + 22 * 2 + 33        |
| 2    | `1D2S#10S` | 9      | 12 + 21 * (-1) + 101        |
| 3    | `1D2S0T`   | 3      | 12 + 21 + 03                |
| 4    | `1S*2T*3S` | 23     | 11 * 2 * 2 + 23 * 2 + 31    |
| 5    | `1D#2S*3S` | 5      | 12 * (-1) * 2 + 21 * 2 + 31 |
| 6    | `1T2D3D#`  | -4     | 13 + 22 + 32 * (-1)         |
| 7    | `1D2S3T*`  | 59     | 12 + 21 * 2 + 33 * 2        |

[해설 보러가기](http://tech.kakao.com/2017/09/27/kakao-blind-recruitment-round-1/)



### 내 풀이

```python
def solution(dartResult):
    answer = 0
    score_dict = {
        '0':0,
        '1':1,
        '2':2,
        '3':3,
        '4':4,
        '5':5,
        '6':6,
        '7':7,
        '8':8,
        '9':9,
        '10':10,
    }

    # 길이가 3이상이면 -2
    # 길이가 2 이면 -1
    bonus_dict = {
        'S':1,
        'D':2,
        'T':3,
    }
    
    # 길이가 3이면 -1
    options_dict = {
        '*':2,
        '#':-1,
    }
    
    temp = []
    data = ''
    
    for ind, ch in enumerate(dartResult):
        data += ch
        
        if ch in options_dict:
            data = ''
            continue
        elif ch in bonus_dict:
            if ind < len(dartResult)-1 and dartResult[ind+1] in options_dict:
                temp.append(data + dartResult[ind+1])
            else:
                temp.append(data)
            data = ''
            
    for ind, data in enumerate(temp):
        
        if data[-1] in bonus_dict:
            num = data[:-1]
            bonus = data[-1]
        else:
            num = data[:-2]
            option = data[-1]
            bonus = data[-2]

        temp[ind] = score_dict[num] ** bonus_dict[bonus]
        
        if ind > 0 and option == '*':
            temp[ind-1] *= options_dict[option]
            
        temp[ind] *= options_dict[option] if option in options_dict else 1

    answer = sum(temp)
    
    return answer
```

1. 일단 문자열을 일회씩 나눠주기 위해 `dartResult`를 반복문 돌리면서  문자를 하나씩 이어붙임 - 옵션을 있을수도 없을수도 있지만 보너스는 무조건 있으므로 보너스를 기준으로 문자열을 잘랐음
   - `if`: 
     - `options_dict`를 붙이냐 안붙이느냐에 대한 판단은 다른 조건문에서 해야하므로 data를 ''로 초기화하고 continue함
     - 따로 조건을 주지 않을 경우 option 문자가 다음 요소에 붙어서 나옴
2. `elif`: `bonus_dict`에 들어있는 문자일 때
   - `if`: 
     - 마지막 요소를 확인할 때 옵션을 확인하려다 out of range되지 않도록 `ind < len(dartResult)-1`
     - 보너스의 다음 문자가 옵션일 경우`dartResult[ind+1] in options_dict`
     - 위의 두 조건을 만족할 경우 현재 가지고 있는 data + 옵션문자열을 append
     - 하나라도 만족하지 않을 경우 data만 append
3. 일회씩 나눠진 문자열을 넣은 리스트로 점수 계산
   - 숫자 부분이 1~10이기 때문에 앞에서 자르거나 길이를 기준으로 연산할 경우 수가 한자리일 때와 두자리일 때를 따로 생각해주어야해서 뒤에서 잘라보기로함
   - `if` 마지막 문자가 보너스문자일 경우 마지막문자는 보너스, 마지막을 제외한 모든 문자는 숫자
   - `else` 마지막 문자가 보너스가 아닐 경우 마지막 문자는 옵션, 뒤에서 두번째 문자는 보너스, 그 나머지는 숫자
4. 점수 계산
   - 수와 보너스 문자를 사용해서 기본적으로 가지고 있는 부분을 계산
   - 직전 값이 없는 1회차에 `*`가 나올 경우 직전 값을 계산할 수 없으므로 (`ind > 0`: 인덱스가 0일 경우 통과하지 못함) 그걸 제외한 경우는 직전 값에 *2를 해줌
   - 현재 값에 적용하는 옵션은 dictionary를 사용하여 dictionary의 값을 곱해주거나 키가 존재하지 않을 경우 1을 곱해주어 값이 변하지 않게했다

> * 점수를 dictionary에 넣은 이유
>
>   수의 길이가 동일하지 않다는걸 해결하려고 하다가 dictionary로 만들면 어떻게 되지 않을까 하고 만들었는데 (점수가 10개밖에 없기도 했고) 결과적으로 dictionary여야하는 방법을 사용하지 않았다. 나중에는 다른 값들과의 통일성을 위해서 dictionary를 지우지 않았음