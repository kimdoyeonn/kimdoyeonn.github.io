---
title: '[DB]DBMS와 RDBMS'
tags: [DB, DBMS]
---

출처: [위키백과](https://namu.wiki/w/DBMS)

- 데이터베이스 관리 시스템(Database Management System)
- 다수의 사용자들이 데이터베이스 내의 데이터를 접근할 수 있도록 해주는 소프트웨어 도구의 집합
- 사용자 또는 다른 프로그램의 요구를 처리하고 적절히 응답하여 데이터를 사용할 수 있도록 해준다.

### 기능

- 중복 제어: 동일한 데이터가 여러 위치에 중복 저장되는 현상을 방지한다. 데이터가 중복되면, 저장 공간이 낭비되고 데이터의 일관성이 깨질 수 있다.
- 접근 통제: DBMS는 사용자마다 다양한 권한을 부여할 수 있으며, 권한에 따라 데이터에 대한 접근을 제어할 수 있다.
- 인터페이스 제공: DBMS는 사용자에게 SQL 및 CLI, GUI 등 다양한 인터페이스를 제공한다.
- 관계 표현: 서로 다른 데이터간의 다양한 관계를 표현할 수 있는 기능을 제공한다.
  - 샤딩/파티셔딩: 구조 취적화를 위해 작은 단위로 쪼개는 기능을 제공한다.
- 무결성 제약 조건: 무결성에 관한 제약 조건을 정의/검사하는 기능을 제공한다. 데이터베이스는 반드시 무결정 제약조건을 통과한 데이터만을 저장하고 있어야 한다.
- 백업

### 한계

- DBMS는 모든 종류의 데이터를 관리하는 최선의 방법이 아니다.
- 복잡한 DBMS일수록 트랜잭션, ACID(Atomicity, Consistency, Isolation, Durability) 등의 많은 컨셉을 지원하기 위한 오버헤드가 발생한다. 때문에 휴대폰 등의 임베디드 기기 같은 단순한 데이터베이스(예를 들어 전화번호부 등)의 경우는 다중 사용자나 회복 기능 등을 뺀 가벼운 DBMS를 만들어 사용하기도 한다.
- 대다수의 DBMS는 비교적 크기가 작은 레코드를 수백만개씩 저장하는 것에 특화되어있다. 반대로 하나의 레코드가 몇십MB에서 GB급인 경우 데이터를 DB에 저장하면 쿼리 시 오버헤드가 클 수 있다. 이 경우 원래 파일은 파일 시스템에 직접 저장하거나 파일 시스템 스타일의 클라우드를 사용하고 그 경로만 DB에 저장하는게 바람직하다
- 실시간 데이터 처리가 필요한 경우(예를 들어 군용, 항공우주용 등)에도 일반적으로 복잡한 기능을 제공하는 DBMS가 적합하지 않다. 다만 통신망, 금융권 등에서의 실시간 데이터 처리 개념에서는 오라클의 타임스텐이나 알티베이스의 ALTIBASE HDB와 같은 인 메모리 데이터베이스를 실시간 데이터 처리가 요구되는 구간에 사용하고, 이력 데이터와 같은 안정성이 중요시되는 데이터는 back-end 구간에 전통적인 디스크 기반 DBMS를 사용하는 방식으로 시스템을 구성하기도 한다.
- 검색 엔진 등 극단적으로 데이터가 크며, READ/WRITE 간의 격차가 큰 경우에도 일반적인 DBMS를 사용하지 않는다. 이러한 경우 MM DBMS와 NoSQL 기술을 혼용하여 서비스를 구축한다. NoSQL 기술이 응용된 사례가 페이스북의 쪽지 기능이다.

~~뭐지...무슨 뜻인지 모르겠네~~

> **오버헤드** - overhead, 어떤 처리를 하기 위해 들어가는 간접적인 처리 시간, 메모리 등을 말한다. 예를 들어 A라는 처리를 단순하게 실행한다면 10초 걸리는데, 안정성을 고려하고 부가적인 B라는 처리를 추가한 결과 처리시간이 15초 걸렸다면, 오버헤드는 5초가 된다. 또한, 이 처리 B를 개선해 B'라는 처리를 한 결과, 처리시간이 12초가 되었다면, 이 경우 오버헤드가 3초 단축되었다고 말한다.
>
> **트랜잭션** - transcation, 데이터베이스의 상태를 변환시키는 하나의 논리적 기능을 수행하기 위한 작업의 단위 또는 한꺼번에 모두 수행되어야 할 일련의 연산들을 의미한다.

### RDBMS

- 관계형 데이터베이스 관리 시스템(relationship database management system)

- DBMS의 한 종류로, 관계형 데이터 베이스를 생성, 수정, 관리할 수 있는 소프트웨어이다.

  - **관계형 데이터베이스(RDB)** - Relationship Database, 관계형 데이터 모델에 기초를 둔 데이터베이스이다.
    - 관계형 데이터 모델이란 데이터를 구성하는데 필요한 방법 중 하나로, 모든 데이터를 2차원 데이블 형태로 표현한다.
    - 데이터의 독립성이 높고, 고수준의 데이터 조작언어(DML-Data Manipulation Language)을 사용하여 결합, 제약, 투영 등의 관계 조작에 의해 비약적으로 표현능력을 높일 수 있다. 또한 이들의 관계 조작에 의해 자유롭게 구조를 변경할 수 있다는 것이 특징이다.

- RDBMS의 테이블은 서로 연관되어 있어 일반 DBMS보다 효율적으로 데이터를 저장, 구성 및 관리할 수 있다

- 정규화를 통해 데이터의 중복성을 최소화하며 트랜잭션을 수행하는 것이 더 쉽다

- 데이터의 원자성, 일관성, 격리 및 내구성을 유지하며 데이터 무결성을 높인다.

- MSSQL, MySQL, Oracle 등이 있다

- ER모델에 따라, 데이터베이스가 만들어지며, 데이터베이스는 하나 이상의 테이블로 구성된다.

  - **ER모델** - Entity Relationship Model
    - 요구사항으로부터 얻어낸 정보들을 개체(Entity), 속성(Attribute), 관계성(Relation)으로 기술하는 데이터 모델을 말한다.
    - 개체란 단독으로 존재하는 개체를 의미하며, 동일한 개체는 존재하지 않는다.
    - 속성이란, 개체가 갖는 속성을 의미한다.
