---
title: '[doit_algorithm] 08-3 커서를 이용한 연결 리스트'
tags: [python, doit_algorithm]
---

참고: doit 자료구조와 함께 배우는 알고리즘 입문

### 커서로 연결 리스트 만들기

포인터를 이용한 연결 리스트는 '노드를 삽입, 삭제할 때 데이터를 이동하지 않고 처리'하는 특징이 있다. 하지만 노드를 삽입, 삭제할 때마다 내부에서 노드용 인스턴스를 생성하고 소멸한다. 이떄 메모리를 확보하고 해제하는 데 쓰는 비용은 결코 무시할 수 없을 정도인데, 프로그램을 실행하면서 데이터 개수가 크게 변하지 않거나 데이터 최대 개수를 예측할 수 있는 경우라면 배열 안의 원소를 사용하여 효율적으로 운용할 수 있다.

뒤쪽 포인터는 뒤쪽 노드가 저장되는 원소의 인덱스이다. 여기서는 int형 정숫값인 인덱스로 나타낸 포인터를 커서(cursor)라고 한다.

꼬리 노드의 뒤쪽 커서는 -1이다. 머리 노드를 나타내는 head도 커서이다. 머리 노트가 저장되어 있는 인덱스인 1은 head의 값이다.

이 방법은 노드의 삽입과 삭제에 따른 원소의 이동이 처음부터 불필요하다는 점에서 포인터를 이용한 연결 리스트와 다르다. 예를 들어 연결 리스트 맨 앞에 노드를 삽입하면 head를 1에서 6으로 업데이트하고 노드 G의 뒤쪽 커서를 1로 했을 뿐이다.

### 배열 안에 비어 있는 원소 처리하기

실습의 프로그램은 포인터를 이용한 연결 리스트의 실습 프로그램과 거의 일대일로 대응한다. 이때 발생할 수 있는 가장 중요한 문제인 '삭제된 노드 관리'에 대해 자세히 알아보겠다.

1. 연결 리스트에 노드 4개가 A -> B-> C -> D로 연결되어 있고 배열로 저장됩니다.
2. 연결 리스트의 ㅁ내 앞에 새로운 노드 E를 삽입하여 인덱스 4 위치에 노드 E가 저장된다.

삽입된 노드의 저장 장소는 ''배열 안에서 가장 끝 쪽에 있는 인덱스의 위치' 이다. 연결 리스트의 맨 끝이 아님, 배열에서 물리적인 위치 관계와 연결 리스트의 논리적인 순서 관게는 일치하지 않습니다. 즉, 리스트에서 n번쨰 위치ㅏ는 노드가 배열 인덱스 n의 원소에 저장되는 것이 아닙니다. 때문에 리스트의 순서와 구별하기 위해 인덱스 n인 원소에 저장되는 노드를 n번째 레코드 라고 하겠습니다. 예를 들어 삽입된 노드 E는 4번째 레코드에 저장된다는 의미입니다.

삭제할 때는 노드의 데이터가 저장되어 있던 레코드를 비운다.

만약 삭제를 여러번 빤복하면 배열 안에 빈 레코드가 많이 생긴다. 삭제되는 레코드가 딱 하나라면 그 인덱스를 어떤 변수에 넣어 놓고 관리함으로써 쉽게 재사용할 수 있다. 그러나 실제로는 여러 레코드가 삭제되므로 그렇게 간단하진 않습니다.

#### 프리리스트

연결 리스트인 프리 리스트 (free list)는 삭제된 레코드 그룹을 관리할때 사용하는 자료구조이다. 프리 리스트를 사요하면 앞에서 발생한 삭제 후 비어 있는 배열의 문제를 해결할 수 있습니다. 데이터 자ㅔ의 순서를 나타내는 연결 리스트와 프리 리스트가 결합하므로 노드 클래스 Node와 연결 리스트 클래스 ArrayLinkedList에는 다음과 같은 필드가 추가되어 있습니다.

**노드 클래스 Node에 추가된 필드**

- dnext: 프리 리스트의 뒤쪽 포인터(프리 리스트의 뒤쪽 노드를 참조하는 커서)

**연결 리스트 클래스 ArrayLinkedList에 추가된 필드**

- deleted: 프리 리스트의 머리 노드를 참조하는 커서
- max: 배열에서 맨 끝 쪽에 저장되는 노드의 레코드 번호