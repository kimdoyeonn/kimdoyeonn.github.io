---
title: 뮤텍스(Mutex)와 세마포어(Semaphore)
date: 2021-11-28 23:05:07
categories:
tags:
---

뮤텍스와 세마포어는 다중 프로그래밍에서 자주 발생하는 문제인 데드락을 해결하기 위한 방법이다.

[멀티스레드 정리](https://www.notion.so/c762cff01e4e4a188e3176b9e5b249bb)

데드락은 프로세스나 스레드가 서로가 가진 자원을 가지기 위해 무한 대기상태에 빠지게 되는 것을 의미한다.

데드락이 발생하기 위해서는 4가지의 조건이 필요하다. 자세한 내용은 위 링크에 정리해놓았다.

- 상호 배제
- 점유 대기
- 비선점
- 순환 대기

데드락은 이 4가지 조건 중 하나라도 만족하지 않는다면 발생하지 않는다. 뮤텍스와 세마포어는 이 중에서 상호 배제 조건을 해결하여 데드락을 해결한다.

## 뮤텍스(Mutex)

mutual과 exclusion의 합성어이다.

각 프로세스에서 공유 자원를 엑세스 하는 프로그램 코드 부분을 critical section이라고 하는데, 뮤텍스는 critical section을 한 번에 하나의 스레드만 사용할 수 있도록 제어함으로써 상호 배제 조건을 제거하여 데드락을 방지한다.

### 동작 방식

먼저 접근한 스레드는 자신이 작업을 완료할 때까지 다른 스레드가 critical section을 사용하지 못하도록 lock을 건다. lock을 건 스레드만이 unlock을 할 수 있으며, unlock이 되어야 다른 스레드가 critical section을 사용할 수 있다.

## 세마포어(Semaphore)

세마포어는 세마포어 변수만큼의 스레드가 공유자원에 접근할 수 있다.

세마포어 변수는 0 이상의 정수 값을 갖는다. 만약 세마포어가 0이라면 critical section에 더이상 접근할 수 없는 상태로, 세마포어가 1 이상이 될 때까지 대기해야 한다.

참조

- [뮤텍스(Mutex)와 세마포어(Semaphore)](https://zangzangs.tistory.com/128)
- **[세마포어(Semaphore)와 뮤텍스(Mutex) - LOG.INFO](https://loginfo.dev/Semaphore-and-Mutex)**
