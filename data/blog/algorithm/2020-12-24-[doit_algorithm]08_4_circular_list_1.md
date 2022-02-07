---
title: '[doit_algorithm] 08-4 원형 이중 연결 리스트-1'
excerpt: ''
category:
  - doit_algorithm
tags: [python, doit_algorithm]
---

참고: doit 자료구조와 함께 배우는 알고리즘 입문

원형 리스트(circular list)는 연결 리스트의 꼬리노드가 다시 머리 노드를 가리키는 모양을 하고 있습니다. 고리 모양으로 늘어선 데이터를 표현하는데 알맞은 구조입니다. 원형 리스트가 연결 리스트와 가장 크게 다른 점은 꼬리 노드의 뒤쪽 포인터가 None이 아니라 머리 노드의 포인터값이 된다는 것입니다.

### 이중 연결 리스트

연결 리스트의 가장 큰 단점은 뒤쪽 노드를 찾기 쉬운 반면 앞쪽 노드를 찾기 어렵다는 것입니다. 이 단점을 개선한 리스트 구조가 이중 연결 리스트(doubly linked list)입니다. 각 노드에는 뒤쪽 노드에 대한 포인터 뿐만 아니라 앞쪽 노드에 대한 포인터가 주어집니다. 이중 연결 리스트의 노드는 3개의 필드로 구성도니 Node로 구현합니다.

- data: 데이터에 대한 참조(임의의 형)
- prev: 앞쪽 노드에 대한 참조(앞쪽 포인터: Node형)
- next: 뒤쪽 노드에 대한 참조(뒤쪽 포인터: Node형)

### 원형 이중 연결 리스트

원형 리스트와 이중 연결 리스트를 결합한 원형 이중 연결 리스트(circular doubly linked list)

> 원형 이중 연결 리스트에서 개별 노드의 형은 이중 연결 리스트와 같습니다.

### 원형 이중 연결 리스트 만들기

```python
from __future__ import annotations
from typing import Any, Type

class Node:
    """원형 이중 연결 리스트용 노드 클래스"""

    def __init__(self, data: Any = None, prev: Node = None, next: Node = None) -> None:
        """초기화"""
        self.data = data            # 데이터
        self.prev = prev or self    # 앞쪽 포인터
        self.next = next or self    # 뒤쪽 포인터

class DoubleLinkedList:
    """원형 이중 연결 리스트 클래스"""

    def __init__(self) -> None:
        """초기화"""
        self.head = self.current = Node()       # .데미 노드를 생성

    def __len__(self) -> int:
        """연결 리스트의 노드 수를 반환"""
        return self.no

    def is_empty(self) -> bool:
        """리스트가 비었는지 확인"""
        return self.head.next is self.head
```

#### 노드 클래스 Node

원형 이중 연결 리스트용 노드 클래스 Node는 필드 3개로 구성됩니다. 필드 data와 next는 연결 리스트와 같지만 앞쪽 포인터인 필드 prev가 추가되었습니다.

`__init__()`함수는 노드의 초기화를 수행하기 위해 매개변수 data, prev, next로 전달받은 값을 해당 필드에 대입합니다. 또, 매개변수 prev 또는 next로 전달받은 값이 None일 경우 앞쪽 포인터 prev와 뒤쪽 포인터 next에 None이 아닌 self를 대입합니다. 그 결과 앞쪽 포인터와 뒤쪽 포인터는 자신의 인스턴스를 참조하게 됩니다.

대입은 self.prev = prev or self라고 되어 있습니다. or 연산자를 사용하여 다음과 같은 대입이 이루어집니다.

- prev가 참이면(None이 아니면) self.prev에 prev를 대입합니다.
- prev가 거짓이면(None이 이면) self.prev에 self를 대입합니다.

#### 원형 이중 연결 리스트 클래스 DoubleLinkedList

3개의 필드로 구성됩니다.

- no: 리스트에서 노드의 개수
- head: 머리 노드에 대한 참조
- current: 주목 노드에 대한 참조

#### `__init__()` 함수

비어있는 원형 이중 연결 리스트를 생성합니다.

데이터가 없는 노드를 1개 만듭니다. 이 노드는 삽입과 삭제를 원활하게 처리하기 위해 리스트의 맨 앞에 계속 존재하는 더미 노드입니다. Node()에 의해 생성된 노드의 prev와 next는 클래스 Node의 `__init__()`함수 동작으로 자신의 노드를 참조하게 됩니다. head와 current가 참조하는 곳은 생성한 더미 노드입니다.

#### 노드 수를 반환하는 `__len__()`함수

리스트에 등록되어 있는 데이터 개수를 반환하는 함수입니다. no값을 그대로 반환합니다.

#### 리스트가 비어 있는지 검사하는 is_empty() 함수

리스트가 비어 있는지(더미 노드만 존재하는지)를 검사하는 함수이다. 더미 노드의 뒤쪽 포인터 head.next가 더미 노드인 head를 참조하면 리스트가 비어 있습니다. 리스트가 비어 있으면 True, 그렇지 않으면 False를 반환합니다.

> 빈 리스트는 head, head.next, head.prev가 참조하는 곳 모두 더미 노드 입니다.(모두 head와 같은 값)

#### 노드를 검색하는 search() 함수

인수로 주어진 데이터 data와 값이 같은 노드를 선형 검색하는 함수입니다. 머리 노드부터 시작하여 뒤쪽 포인터를 순차적으로 따라갑니다. 스캔하는 순서는 연결리스트 클래스 LinkedList의 search()함수와 거의 같습니다. 다만 리스트의 실제 머리 노드가 맨 앞의 더미노드가 아니라 그 뒤쪽 노드이므로 검색의 시작점이 다릅니다. head가 참조하는 노드는 더미노드 입니다. 그리고 더미 노드의 뒤쪽 포인터가 참조하는 노드가 실제 머리 노드입니다. 따라서 검색을 시작하는 위치는 head가 아니라 head.next입니다.

| 노드      |      |           |                |           |                |
| --------- | ---- | --------- | -------------- | --------- | -------------- |
| 더미 노드 | head | c.next    | b.next.next    | a.prev    | b.prev.prev    |
| 노드 a    | a    | head.next | c.next.next    | b.prev    | c.pre.prev     |
| 노드 b    | b    | a.next    | head.next.next | c.prev    | d.prev.prev    |
| 노드 c    | c    | b.next    | a.next.next    | d.prev    | head.prev.prev |
| 노드 d    | d    | c.next    | b.next.next    | head.prev | a.prev.prev    |

while문에 의한 스캔 과정에서 값이 같다고 판단되면 검색에 성공한 것이고 카운더 cnt값을 반환합니다.(이때 주목 포인터 current가 노드 ptr을 참조하도록 업데이트합니다.)

노드를 찾기 못하고 스캔을 한바퀴 돌아 머리 노드로 되돌아오면 (ptr이 head와 같아지면) while문은 종료됩니다. 이때 검색 실패임을 나타내는 -1을 반환합니다.

```python
    def search(self, data: Any) -> Any:
        """data와 값이 같은 노드를 검색"""
        cnt = 0
        ptr = self.head.next        # 현재 스캔 중인 노드
        while ptr is not self.head:
            if data == ptr.data:
                self.current = ptr
                return cnt              # 검색 성공
            cnt += 1
            ptr = ptr.next              # 뒤쪽 노드에 주목
        return -1                       # 검색 실패

    def __contains__(self, data: Any) -> bool:
        """연결 리스트에 data가 포함되어 있는지 판단"""
        return self.search(data) >= 0
```

빈 리스트의 검색은 반드시 실패할 것입니다. 함수 첫머리에서 ptr에 대입되는 head.next는 더미 노드에 대한 참조입니다. 따라서 head와 같은 값이 ptr에 대입됩니다. 그러면while문의 판단식 ptr is not head가 거짓이 됩니다. 따라서 while문의 반복을 건너뛰고 함수 맨 끝에 있는 return문에 의해 -1이 반환됩니다.

#### 데이터가 포함되어 있는지 판단하는 `__contains__()`함수

리스트에 데이터와 값이 같은 노드가 존재하는지 판단하는 함수입니다. 존재하면 True를, 그렇지 않으면 False를 반환합니다.

```python
    def print_current_node(self) -> Node:
        """주목 노드를 출력"""
        if self.is_empty():
            print('주목 노드는 없습니다.')
        else:
            print(self.current.data)

    def print(self) -> None:
        """모든 노드를 출력"""
        ptr = self.head.next        # 더미 노드의 뒤쪽 노드
        while ptr is not self.head:
            print(ptr.data)
            ptr = ptr.next

    def print_reverse(self) -> None:
        """모든 노드를 역순으로 출력"""
        ptr = self.head.prev        # 더미 노드의 앞쪽 노드
        while ptr is not self.head:
            print(ptr.data)
            ptr = ptr.prev

    def next(self) -> bool:
        """주목 노드를 한 칸 뒤로 이동"""
        if self.is_empty() or self.current.next is self.head:
            return False        # 이동할 수 없음
        self.current = self.current.next
        return True

    def prev(self) -> bool:
        """주목 노드를 한 칸 앞으로 이동"""
        if self.is_empty() or self.current.prev is self.head:
            return False        # 이동할 수 없음
        self.current = self.current.prev
        return True
```

#### 주목 노드를 출력하는 print_current_node() 함수

주목 노드의 데이터 current.data를 출력하는 함수, 리스트가 비어 있으면 주목 노드가 존재하지 않으므로 '주목노드는 없습니다. '를 출력

#### 모든 노드를 출력하는 print()함수

리스트에 있는 모든 노드를 맨 앞에서 맨 끝까지 순서대로 출력하는 함수입니다. head.next에서 시작하여 뒤쪽 포인터를 따라가면서 스캔하여 각 노드의 데이터를 출력합니다. 한바퀴 돌아 head로 되돌아오면 스캔을 종료합니다.

#### 모든 노드를 역순으로 출력하는 print_reverse() 함수

리스트에 있는 모든 노드를 맨 끝부터 역순으로 출력하는 함수입니다. head.prev에서 시작하여 앞쪽 포인터를 따라가면서 스캔하여 각 노드의 데이터를 출력합니다. 한바퀴 돌고 head로 되돌아가면 스캔이 종료됩니다.

#### 주목 노드를 한 칸 뒤로 이동시키는 next()함수

주목 노드를 한 칸 뒤로 이동시키는 함수입니다. 리스트가 비어 있지 않고 주목 노드에 뒤쪽 노드가 존재하는 경우에만 이동합니다. 구체적으로는 주목 포인터 current를 current.next로 업데이트합니다. 주목 노드를 이동하면 True를, 그렇지 않으면 False를 반환합니다.

#### 주목 노드를 한 칸 앞으로 이동시키는 prev() 함수

주목 노드를 한 칸 앞으로 이동시키는 함수입니다. 리스트가 비어 있지 않고 주목 노드에 앞쪽 노드가 존재하는 경우에만 이동합니다. 구체적으로는 주목 포인터 current를 current.prev로 업데이트합니다. 주목 노드를 이동하면 True를, 그렇지 않으면 False를 반환합니다.

```python
    def add(self, data: Any) -> None:
        """주목 노드 바로 뒤에 노드를 삽입"""
        node = Node(data, self.current, self.current.next)
        self.current.next.prev = node
        self.current.next = node
        self.current = node
        self.no += 1

    def add_first(self, data: Any) -> None:
        """맨 앞에 노드를 삽입"""
        self.current = self.head    # 더미 노드 head의 바로 뒤에 삽입
        self.add(data)

    def add_last(self, data: Any) -> None:
        """맨 뒤에 노드를 삽입"""
        self.current = self.head.prev       # 꼬리 노드 head.prev의 바로 뒤에 삽입
        self.add(data)
```

#### 노드를 삽입하는 add() 함수

주목 노드 바로 뒤에 노드를 삽입하는 함수

1. 새로 삽입하는 노드를 Node(data, current, current.next)로 생성
2. 앞 노드의 뒤쪽 포인터 current.next와 뒤 노드의 앞쪽 포인터 current.next.prev 모두 새로 삽입한 노드 node를 참조하도록 업데이트합니다.
3. 주목 포인터 current가 삽입한 노드를 참조하도록 업데이트합니다.

연결 리스트 프로그램과는 달리 리스트의 맨 앞에 더미 노드가 있으므로 '빈 리스트에 삽입 처리하는 과정' 과 '리스트의 맨 앞에 삽입하는 과정'을 다룰 필요하 없습니다. 더미 노드만 존재하는 빈 리스트에 경우에도 똑같이 수행해주면 노드를 삽입할 수 있습니다.

#### 머리에 노드를 삽입하는 add_first() 함수

리스트의 맨 앞에 노드를 삽입하는 함수

더미 노드 바로 뒤에 노드를 삽입해주기 위해 주목 포인터 current가 참조하는 곳을 head로 업데이트한 상태에서 add() 함수를 호출합니다.

#### 꼬리에 노드를 삽입하는 add_last() 함수

리스트의 맨 끝에 노드를 삽입하는 함수

꼬리 노드 바로 뒤에, 곧 더미 노드 바로 앞에 노드를 삽입해주기 위해 주목 포인터 current가 참조하는 곳을 current.prev로 업데이트한 상테에서 add() 함수를 호출합니다.
