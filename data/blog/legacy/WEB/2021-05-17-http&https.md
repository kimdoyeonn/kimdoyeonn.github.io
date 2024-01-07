---
title: 'HTTP와 HTTPS의 차이점'
tags: [Internet]
---

> **프로토콜** : 컴퓨터 내부에서, 또는 컴퓨터 사이에서 데이터를 교환하는 방식을 정의하는 규칙 체계이다. 기기 간 통신은 교환되는 데이터의 형식에 대해 상호 합의를 요구한다. 이런 형식을 정의하는 규칙의 집합

### HTTP

- Hyper Text Transfer Protocol, 하이퍼본문전송규약
- W3 상에서 서버/클라이언트 모델을 따라 데이터를 주고 받기 위한 프로토콜
- 인터넷에서 하이퍼텍스트를 교환하기 위한 통신 규약으로, 80번 포트를 사용하고 있다. 따라서 HTTP 서버가 80번 포트에서 요청을 기다리고 있으며, 클라이언트는 80번 포트로 요청을 보내게 된다.
- HTTP는 1989년 팀버너스리에 의해 처음 설계되었으며, WWW(World-Wide-Web) 기반에서 세계적인 정보를 공유하는데 큰 역할을 하였다.

#### HTTP의 구조

![img](https://t1.daumcdn.net/cfile/tistory/2673024858FE02AB1F)

HTTP는 애플리케이션 레벨의 프로토콜로 TCP/IP 위에서 작동한다. HTTP는 상태를 가지고 있지 않은 Stateless 프로토콜이며 위 사진과 같은 구조로 구성된다.

하지만 HTTP는 암호화가 되지 않은 평운 데이터를 전송하는 프로토콜이었기 때문에, HTTP로 비밀번호나 주민등록번호 등을 주고 받으면 제3자가 정보를 조회할 수 있었다. 그리고 이러한 문제를 해결하기 위해 HTTPS가 등장하게 되었다.

### HTTPS

- HyperText Transfer Protocol Secure, HTTP Over Secure Socket Layer
- HTTP에 데이터 암호화가 추가된 프로토콜
- HTTP와 다르게 433번 포트를 사용하며, 네트워크 상에서 중간에 제3자가 정보를 볼 수 없도록 공개키 암호화를 지원하고 있다.

#### 공개키/개인키

HTTPS는 공개키/개인키 암호화 방식을 이용해 데이터를 암호화하고 있다. 공개키와 개인키는 서로를 위한 한쌍의 키이다.

- 공개키 : 모두에게 공개 가능한 키
- 개인키 : 나만 가지고 알고 있어야 하는 키

* 공개키 암호화 : 공개키로 암호화를 하면 개인키로만 복호화할 수 있다. ➡ 개인키는 나만 가지고 있으므로, 나만 볼 수 있다.
* 개인키 암호화 : 개인키로 암호화하면 공개키로만 복호화할 수 있다. ➡ 공개키로 모두에게 공개되어 있으므로, 내가 인증한 정보임을 알려 신뢰성을 보장할 수 있다.

![img](https://blog.kakaocdn.net/dn/OKcog/btqK71fM8a4/g1HmcDOR7MVRRz7pSKKJWk/img.png)

#### HTTPS 동작 과정

HTTPS는 SSL과 같은 프로토콜을 사용하여 공개키/개인키 기반으로 데이터를 암호화되어 전송되기 떄문에 임의의 사용자가 데이터를 조회하여도 원본의 데이터를 보는 것은 불가능하다.

그렇다면 이제 서버는 클라이언트가 요청을 보낼 때 암호화를 하기 위한 공개키를 생성해야 하는데, 일반적으로 인증된 기관(Certificate Authority)에 공개키를 전송하여 인증서를 발급받고 있다.

1. A 기업은 HTTP 기반의 애플리케이션에 HTTPS를 적용하기 위해 공개키/개인키를 발급함
2. CA 기업에게 돈을 지불하고, 공개키를 저장하는 인증서의 발급을 요청함
3. CA 기업은 CA기업의 이름, 서버의 공개키, 서버의 정보 등을 기반으로 인증서를 생성하고, CA 기업의 개인키로 암호화하여 A기업에게 이를 제공함
4. A기업은 클라이언트에게 암호화된 인증서를 제공함
5. 브라우저는 CA기업의 공개키를 미리 다운받아 갖고 있어, 암호화된 인증서를 복호화함
6. 암호화된 인증서를 복호화하여 얻은 A기업의 공개키로 데이터를 암호화하여 요청을 전송함

![img](https://blog.kakaocdn.net/dn/Wwmv2/btqK6BvBV14/G8jN22KQFvylWL9Tak8CVk/img.png)

암호화된 인증서는 CA의 개인키로 암호화되었기 때문에 신뢰성을 확보할 수 있고, 클라이언트는 A 기업의 공개키로 데이터를 암호화하였기 때문에 A기업만 복호화하여 원본의 데이터를 얻을 수 있다.

### HTTP와 HTTPS의 차이점

HTTP란 일반적으로 웹 서버 통신을 위한 프로토콜이다. HTTPS란 암호화된 통신을 제공하는 HTTP를 말한다.

HTTP를 이용해 클라이언트와 서버가 통신할 때, 암호화된 통신을 위한 키를 설정하고 통신하게 된다.

이 때 사용하되는 암호화 방식은 공개키 암호화 방식을 사용하며, 데이터를 암호화하는데 2개의 키를, 복호화하는데 한 개의 키를 사용한다.

HTTP 프로토콜을 사용하면 공격자가 패킷을 가로챌 경우, 평문이기 때문에 해당 데이터를 갈취하고, 변조하여 공격이 가능하다. (Man in the middle)

이에 반해 HTTPS 프로토콜을 사용하면, 패킷이 중간에 탈취되더라도 공격자가 메시지를 알아내고 암호화까지 하여 변조하는데 일반적으로 천문학적인 시간을 소모하게 된다.

이처럼 암호화된 통신을 함으로써 안전한 구조를 가져갈 수 있지만, 공개키 암호화와 복호화 과정은 많은 비용을 수반한다.

따라서 HTTPS 통신은 HTTP에 비해 느릴 수밖에 없으며, 보통 선택적으로 사용하게 된다.

예를 들어 금융정보 및 기밀 또는 민감한 개인정보들의 경우에는 HTTPS로, 그와 상관없는 UI 처리 및 일반 컨텐츠 관련 정보는 HTTP로 처리한다.

출처

[HTTP와 HTTPS](https://mangkyu.tistory.com/98)
[HTTP와 HTTPS의 차이점](https://jins-dev.tistory.com/entry/HTTP-vs-HTTPS-%EC%B0%A8%EC%9D%B4%EC%A0%90-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0)