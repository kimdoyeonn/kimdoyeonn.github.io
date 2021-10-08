---
title: "[algorithm] 재귀"
excerpt: ""
category:
  - algorithm
tags: [algorithm]
---

- 재귀

  - 함수가 자기 자신을 호출하는 것
  - 대신 반복문으로 구현할 수 있음
  - 재귀는 풀이를 더 명확하게 만들어 주지만 성능을 향상시키지는 않는다. 오히려 반복문을 사용하는 것이 더 성능이 좋을 때도 많음
  - 기본단계와 재귀단계로 구성되어있다. 재귀 함수는 재귀단계에서 자기 자신을 호출하기 떄문에 탈출 조건이 주어지지 않으면 무한 반복을 하게 된다. 기본 단계는 자기 자신을 호출하지 않는 단계로 재귀함수가 무한 반복에 빠지는 것을 막아준다.

  ```python
    def countdown(i):
      print(i)
      if i < 0:
        return
      else:
        countdown(i-1)
  ```

- 스택(stack)

  - 후입선출 구조
  - 가장 나중에 추가된 항목이 제일 먼저 삭제됨

- 호출스택(call stack)

  - 컴퓨터가 함수를 호출하는 방식
  - 여러 개의 함수를 호출하면서 함수에 사용되는 변수를 저장하는 스택
  - 너무 커져서 메모리가 과하게 소비될 수 있다. 컴퓨터가 감당할 수 없을 정도가 되면 스택오버플로우 오류가 발생함

  ```python
    def greet(name):
      print(`Hi, ${name}!`)
      greet2(name)
      print("getting ready to say bye...")
      bye()

    def greet2(name):
      print(`How are you, ${name}?`)

    def bye():
      print("Ok, bye!")

    greet("Anne")
  ```

  1. `greet("Anne")`이 호출되면 컴퓨터는 함수호출을 위한 메모리를 할당하고 거기에 함수 greet와 인수 "Anne"을 저장함
  2. "Hi, Anne!"을 출력 후, greet2(name)로 다른 함수를 호출, 컴퓨터는 다시 함수 호출을 위해 메모리를 할당하는데, 이 때 스택을 사용한다. 두번째 메모리는 첫번째 메모리의 위에 올려지게 된다. 이 때 첫번째 함수는 중지된 상태로 대기하게 됨
  3. greet2에 의해 "How are you, Anne?"이 출력되고 실행이 끝난 greet2함수는 함수 호출 상태에서 반환되어 돌아온다. 함수가 반환되면 가장 위에 있던 메모리상자는 pop연산으로 인해 없어진다.
  4. 가장 위에 있는 함수가 greet함수가 되고, greet함수는 중지되어 있던 자리에서부터 다시 이어서 실행된다. "getting ready to say bye..."가 출력되고 bye() 명령으로 다른 함수가 호출됨, 다시 greet는 정지
  5. bye함수는 greet함수 위에 쌓임, "Ok, bye!"출력 후 bye가 pop되고 다시 greet함수로 돌아감
  6. 이제 greet함수에 더이상 실행할 것이 없으므로 greet함수도 pop됨

출처: 그림으로 개념을 이해하는 알고리즘
