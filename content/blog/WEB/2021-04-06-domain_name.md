---
title: "domain name"
excerpt: ""
category:
  - Internet
tags: [Internet]
---

[TOC]

![img](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3421/8338.jpeg)

### 도메인 이름의 구조

전세계의 수천 수만대의 DNS 서버가 분산되고 보완하면서 전세계 사람들이 인터넷을 ip를 몰라도 사용할 수 있도록 돕고있음

도메인의 맨 끝에는 사실 `.`이 숨어있음, 넣어도 빼도 이동하는데는 문제 없음



sub, second-level, top-level, root 각각을 담당하는 DNS 서버가 존재함(동일한 서버이지만 담당하는 부분이 다른 것)

즉, 각각의 서버들은 바로 아래의 DNS서버의 주소를 알고 있는 것



주소를 찾아갈 때 Root Name Server에 제일 먼저 접근하게된다. Root Name Server가 자신 바로 아래의 DNS server 주소를 알려주고, 또 바로 아래의 서버를 알려주고.... 하면서 원하는 도메인의 ip를 알아내는 것



### 도메인 이름 등록과정과 원리

![img](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3421/8343.jpeg)

#### 서버

- 등록자: 서버로 사용할 컴퓨터
- ICANN : Root name server를 관리하는 비영리 단체 (a~m 13개의 루트네임서버가 수백대로 흩어져 전세계에서 루트네임서버로서 구동)
- 등록소: Top-level domain을 관리(`.com` `.net` `.kr`)
- 등록대행자: 등록소에 등록자의 등록을 대신해줌(등록자는 이미 있는 주소는 사용할 수 없고, 도메인에 대한 수수료를 지불함 돈을 지불하면 등록자가 계약한 기간동안은 아무도 사용할 수 없음)

> 등록자가 도메인을 등록하면, 어떤 방법으로든 도메인에 해당하는 name server가 할당된다. 그럼 top-level server는 그 name server의 주소를 기억하고, root name server는 그 top-level server의 주소를 기억한다. 그리고 등록자는 도메인을 연결할 서버의 주소를 도메인에 해당하는 name server에 알려준다.





#### 클라이언트

모든 DNS 서버는 Root name server들의 주소가 무엇인지 알고 있음

컴퓨터가 인터넷에 연결되는 순간 DNS 서버가 할당된다. 이 DNS 서버는 Root name server에게 물어볼 준비가 되어있다.

1. 클라이언트가 `example.com`이라는 도메인을 입력한다.
2. DNS 서버는 Root name server에게 `example.com`의 ip주소를 물어본다.
3. Root name server는 그 주소를 정확하게 알고 있지는 않지만 전에 등록된 기록을 통해 top-level name server의 주소를 알려준다.
4. DNS 서버는 Root name server에게 받은 주소를 보고 top-level name server를 찾아가 `example.com`의 ip주소를 물어본다.
5. top-level name server는 그 주소를 모르기 때문에 ip주소를 알고있을 name server의 주소를 알려준다.DNS 서버는 top-level name server가 알려준 주소를 보고 name server를 
6. 찾아가서 물어보고, name server는 자신이 알고있는 `example.com`의 ip 주소를 대답해준다.
7. DNS 서버는 이렇게 알아낸 ip 주소를 컴퓨터에 돌려준다.
8. 결과적으로 컴퓨터는 `example.com`을 입력하는 것만으로 93.xxx.xx.x 의 컴퓨터를 찾아갈 수 있게 되는 것이다.



### nslookup

```
nslookup example.com
```

```
nslookup -type=a example.com
```

```
서버:    one.one.one.one
Address:  1.1.1.1

권한 없는 응답:
이름:    example.com
Addresses:  2606:2800:220:1:248:1893:25c8:1946
          93.184.216.34
```

요청할 때마다 모든 요청을 반복한다면 (root name server, top-level server 등) 오래 걸리고 효율적이지 않으므로 DNS는 ip 주소를 찾은 기록을 저장해놓았다가 다음에 또 요청이 왔을 때 바로 응답해줌으로써 효율성을 향상시킨다. 이 때 ip 주소를 응답한 서버는 원래 ip 주소를 기록하고 있는 name server가 아닌 캐시로 주소를 기록하고 있던 DNS 이므로 결과에 `권한 없는 응답`이라는 결과가 뜨게 된다.



```
nslookup -type=ns example.com
```

```
서버:    one.one.one.one
Address:  1.1.1.1

권한 없는 응답:
example.com     nameserver = a.iana-servers.net
example.com     nameserver = b.iana-servers.net
```

`-type=ns` : ns 서버를 찾는 명령어

example.com은 두 대의 nameserver로 운영되고 있음(한 대를 사용하지 못하게 됐을 때를 대비)



```
nslookup example.com a.iana-servers.net
```

```
서버:    a.iana-servers.net
Address:  199.43.135.53

이름:    example.com
Addresses:  2606:2800:220:1:248:1893:25c8:1946
          93.184.216.34
```

네임서버에 직접 접속해서 `example.com`의 주소를 찾으면 주소에 대한 권한을 가지고 있는 네임서버에 의한 응답이기 때문에  `권한 없는 응답`이 뜨지 않음



### 무료 도메인 사이트

https://www.freenom.com/en/index.html?lang=en



### DNS record와 CNAME

#### DNS record

도메인 이름에 대한 정보 한건한건을 의미

DNS record에는 DNS record의 타입이 존재한다.

[DNS record type list](https://ko.wikipedia.org/wiki/DNS_%EB%A0%88%EC%BD%94%EB%93%9C_%ED%83%80%EC%9E%85_%EB%AA%A9%EB%A1%9D)





### domain name에 대해 앞으로 공부해볼만한 주제

- BIND (최초의 DNS 서버)
- 직접 DNS 서버를 운영해보기
- DNS service 사용, 비교
- Dynamic DNS
  - 서버를 집에서 운영
  - ip가 계속 변경되는 환경에서 운영
- HTTPS, SSL
  - 도메인을 사칭하는 것을 방지하여 보안

