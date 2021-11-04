---
title: "[algorithm] 배열과 연결 리스트"
excerpt: ""
category:
  - algorithm
tags: [algorithm]
---

- 배열

  - 원소들이 메모리에 줄지어 공간을 차지한다.
  - 원하는 원소를 읽는데 O(1)의 시간이 걸린다. (줄지어 있기 때문에 몇번째인지만 알면 바로 찾을 수 있음)
  - 배열에 새로운 원소를 삽입하는데 다음 메모리가 사용중이라면 삽입이 불가능하기 때문에 배열 전체를 새로운 메모리 공간으로 옮겨야 한다. 시간복잡도(O(n))
  - 삭제할 때 최악의 경우는 첫 번째 원소를 삭제하는 경우인데, 이 경우 뒤 원소들의 주소를 1씩 앞으로 옮겨야 하기 때문에 시간복잡도 O(n)을 가진다.

- 연결 리스트

  - 원소들이 순서대로 저장될 필요가 없다. 각각의 원소들은 다음 원소의 주소를 값과 같이 저장하고 있다.
  - 배열과는 다르게 원하는 원소를 바로 찾을 수 없다. 4번쨰 원소의 주소를 알려면 3번쨰 원소의 주소를 알아야하고, 3번쨰 원소의 주소를 알려면 2번쨰 원소의 주소를 알아야 하고, 2번쨰 원소의 주소를 알려면 1번째 원소의 주소를 알아야 한다. 결국 4번쨰 원소를 읽으려면 1번째 원소부터 차례대로 연결된 주소를 따라가면서 확인해야 한다. 때문에 연결 리스트의 시간복잡도는 O(n)
  - 삽입하는 경우는 원소의 위치, 순서에 상관없이 삽입할 위치의 앞 원소에 저장된 주소를 바꿔주고, 뒤 원소의 주소를 삽입하는 원소에 저장하면 된다. 시간복잡도 O(1)
  - 삭제하는 경우도 삭제할 원소의 앞 원소에 저장된 주소를 삭제할 원소의 뒷 원소의 주소로 변경하면 간단히 삭제할 수 있으므로 시간복잡도 O(1)을 가진다.
  - 삽입, 삭제에 O(1)의 시간이 걸리는 경우는 원소에 바로 접근이 가능한 경우인 첫번쨰 원소나 마지막 원소를 삽입, 삭제하는 경우이다. 중간 원소를 찾아 삭제하는 경우에는 달라질 수 있다.

- 더 많이 쓰는 구조
  - 보통 임의의 원소에 접근이 가능한 배열을 많이 사용한다.
  - 자료에 접근하는 방식에는 임의 접근, 순차 접근 두 가지 방법이 있다.
  - 연결 리스트는 순차접근 밖에 할 수 없다. 10번째 원소를 찾으려면 앞의 9개의 원소를 읽어서 찾아내야함
  - 임의 접근은 10번째 원소를 찾는데 바로 10번쨰 원소로 찾아가면 된다. 임의 접근이 가능한 배열은 읽기 속도가 빠르다는 특징을 가진다.
  - 이 임의 접근을 사용하는 경우가 많기 때문에 배열이 더 많이 사용되는 것임

출처: 그림으로 개념을 이해하는 알고리즘