---
title: "[doit_algorithm] 08-2 포인터를 이용한 연결 리스트-2"
excerpt: ""
category:
  - doit_algorithm
tags: [python, doit_algorithm]
---

참고: doit 자료구조와 함께 배우는 알고리즘 입문



### 머리노드를 삭제하는 `remove_first()` 함수

삭제 처리를 수행하는 것은 리스트가 비어 있지 않을 때 입니다.(head is not None이 성립할 때)

```python
    def remove_first(self) -> None:
        """머리 노드를 삭제"""
        if self.head is not None:       # 리스트가 비어 있지 않으면
            self.head = self.current = self.head.next
        self.no -= 1
```

맨 앞에서 2번째 노드 B에 대한 참조인 head.next를 머리 노드에 대한 참조인 head에 대입함으로써 head가 참조하는 곳을 노드 B로 업데이트합니다. 이때 주목 포인터 current가 참조하는 곳도 노드 B로 업데이트합니다. 그 결과 삭제하기 전의 머리 노드 A는 어디에서도 참조되지 않습니다.

> 리스트에 노드가 하나밖에 없는 경우의 삭제 처리 - 삭제하기 전의 머리 노드는 꼬리 노드이기도 하므로 뒤쪽 포인터 head.next의 값은 None입니다. 이 None을 head에 대입하면 리스트는 빈 상태가 된다.



### 꼬리 노드를 삭제하는 remove_last() 함수

삭제 처리를 수행하는 것은 리스트가 비어 있지 않을 때입니다. 그리고 리스트에 존재하는 노드가 하나뿐인지 확인하고 그에 따라 다르게 처리합니다.

```python
    def remove_last(self):
        """꼬리 노드를 삭제"""
        if self.head is not None:
            if self.head.next is None:      # 노드가 1개 뿐이라면
                self.remove_first()         # 머리 노드를 삭제
            else:
                ptr = self.head             # 스캔 중인 노드
                pre = self.head             # 스캔 중인 노드의 앞쪽 노드

                while ptr.next is not None:
                    pre = ptr
                    ptr = ptr.next

                pre.next = None             # pre는 삭제 뒤 꼬리 노드
                self.current = pre
                self.no -= 1
```

__리스트에 노드가 하나만 존재할 때__

​	머리 노드를 삭제하는 것이므로 remove_first()함수를 호출

__리스트에 노드가 2개 이상 존재할 때__

​	리스트의 맨 끝에서 노드 F를 삭제합니다.



### 임의의 노드를 삭제하는 remove() 함수

삭제 처리를 수행하는 것은 리스트가 비어 있지 않고 인수로 주어진 노드 p(p가 참조하는 노드)가 존재할 때 입니다.

__p가 머리 노드일 때__

​	머리 노드를 삭제하는 것이므로 remove_first()함수를 호출합니다.

__p가 머리 노드가 아닐 때__

​	리스트에서 p가 참조하는 노드 D를 삭제합니다.

```python
    def remove(self, p: Node) -> None:
        """노드 p를 삭제"""
        if self.head is not None:
            if p is self.head:      # p가 머리 노드이면
                self.remove_first()  # 머리 노드를 삭제
            else:
                ptr = self.head

                while ptr.next is not p:
                    ptr = ptr.next
                    if ptr is None:
                        return      # p는 리스트에 존재하지 않음

                ptr.next = p.next
                self.current = ptr
                self.no -= 1
```



### 주목 노드를 삭제하는 remove_current_node() 함수

```python
    def remove_current_node(self) -> None:
        """주목 노드를 삭제"""
        self.remove(self.current)
```

주목 포인터 currnet를 remove()함수에 전달한다.



### 모든 노드를 삭제하는 clear()함수

```python
    def clear(self) -> None:
        """전체 노드를 삭제"""
        while self.head is not None:    # 전체가 비어 있을 때까지
            self.remove_first()         # 머리 노드를 삭제
        self.current = None
        self.no = 0
```

연결 리스트가 비어 있을 때 (head가 None이 될 때)까지 머리 노드의 삭제를 반복하여 모든 노드를 삭제한다.



### 주목 노드를 한 칸 뒤로 이동시키는 next() 함수

```python
    def next(self) -> bool:
        """주목 노드를 한 칸 뒤로 이동"""
        if self.current is None or self.current.next is None:
            return False        # 이동할 수 없음
        self.current = self.current.next
        return True
```

주목 노드를 한 칸 뒤로 이동시키려면 리스트가 비어 있지 않고 주목 노드에 뒤쪽 노드가 존재해야 합니다. 구체적으로는 주목 포인터 current를 current.next로 업데이트합니다. 주목 노드를 이동시키면 True를 반환하고, 그렇지 않으면 False를 반환합니다.



### 주목 노드를 출력하는 print_current_node() 함수

주목 포인터 current가 참조하는 곳의 노드 데이터인 current.data를 출력합니다. 다만 주목 노드가 존재하지 않을 경우(current가 None인 경우)에는 '주목 노드가 존재하지 않습니다.'를 출력합니다.

```python
    def print_current_node(self) -> None:
        """주목 노드를 출력"""
        if self.current is None:
            print('주목 노드가 존재하지 않습니다.')
        else:
            print(self.current.data)
```

주목 포인터 current값을 업데이트하지 않는다.



### 모든 노드를 출력하는 print() 함수

ptr을 사용하여 머리 노드에서 꼬리 노드까지 스캔하면서 각 노드의 데이터 ptr.data를 출력합니다.

주목 포인터 current값을 업데이트하지 않는다.

```python
    def print(self) -> None:
        """모든 노드를 출력"""
        ptr = self.head

        while ptr is not None:
            print(ptr.data)
            ptr = ptr.next
```



### 이터레이터용 클래스

```python
    def __iter__(self) -> LinkedListIterator:
        """이터레이터를 반환"""
        return LinkedListIterator(self.head)


class LinkedListIterator:
    """클래스 LinkedList의 이터레이터용 클래스"""

    def __init__(self, head: Node):
        self.current = head

    def __iter__(self) -> LinkedListIterator:
        return self

    def __next__(self) -> Any:
        if self.currnet is None:
            raise StopIteration
        else:
            data = self.current.data
            self.currnet = self.current.next
            return data
```



#### 이터러블 객체와 이터레이터의 구현

str형 문자열, list형 리스트, tuple형 튜플 등은 이터러블(iterable: 반복 가능)하다는 공통점이 있습니다. 이터러블 객체는 원소를 1개씩 꺼내는 구조의 객체입니다. 이터러블 객체를 내장 함수인 iter()함수에 인수로 전달하면 그 객체에 대한 이터레이터(iterator: 반복자)를 반환합니다.

이터레이터는 데이터가 줄지어 늘어선 것을 표현하는 객체입니다. 이터레이터의 `__next__()` 함수를 호출하거나, 내장 함수인 next()함수에 반복자를 전달하면 줄지어 늘어선 원소를 순차적으로 꺼냅니다. 꺼낼 원소가 StopIteration 예외 처리를 내보냅니다.

> next()함수의 첫 번쨰 호출에서는 맨 앞 원소를 꺼내고, 2번쨰 호출에서는 2번쨰 원소를 꺼낸다. 이런 식으로 호출할 때 마다 다음 원소를 꺼냅니다.

클래스 LinkedList는 이터러블이 되도록 이터레이터를 구현합니다. 이터레이터를 나타내는 것이 클래스 LinkedListIterator입니다. 

- `__next__()` 함수를 갖는 이터레이터를 반환하는 `__iter__()` 함수를 구현합니다.
- `__next__()` 함수는 다음 원소를 꺼내 반환합니다. 반환하는 원소가 없으면 StopIteration 예외 처리를 내보냅니다.



### 포인터로 연결 리스트 프로그램 만들기

