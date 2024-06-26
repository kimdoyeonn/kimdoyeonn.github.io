---
title: '[javascript]JIT 컴파일'
tags: [javascript]
---

JIT 컴파일(just-in-time compilation) 또는 동적 번역(dynamic translation)은 프로그램을 실제 실행하는 시점에 기계어로 번역하는 컴파일 기법이다.

전통적으로 컴퓨터 프로그램을 만드는 방법은 인터프리트 방식과 정적 컴파일 방식으로 나눌 수 있다.

- 인터프리트 방식은 실행 중 프로그래밍 언어를 읽어가면서 해당 기능에 대응하는 코드를 실행하는 기계어 코드를 실행한다.
- 정적 컴파일 방식은 실행하기 전에 프로그램 코드를 기계어로 번역한다.

JIT 컴파일러는 두 가지의 방식을 혼합한 방식으로 생각할 수 있다. 실행 시점에서 인터프리트 방식으로 기계어 코드를 생성하면서 그 코드를 캐싱하여, 같은 함수가 여러번 불릴 때 매번 기계어 코드를 생성하는 것을 방지한다.

최근에는 JVM, .NET, V8 에서는 JIT 컴파일을 지원한다.

자바 컴파일러가 자바 프로그램 코드를 바이트 코드로 변환한 다음, 실제 바이트코드를 실행하는 시점에서 자바 가상머신이 바이트코드를 JIT 컴파일을 통해 기계어로 번역하는 방식이다.

JIT 코드는 일반적인 인터프리터 언어에 비해 훨씬 좋은 성능을 낸다. 심지어 경우에 따라 정적 컴파일러 언어보다 좋은 성능을 내곤하는데, 이는 실행 과정에 컴파일을 할 수 있기 때문에 가지는 장점이라고 할 수 있다.
