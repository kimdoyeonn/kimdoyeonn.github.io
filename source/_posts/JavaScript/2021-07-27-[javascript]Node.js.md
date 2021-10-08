---
title: "[javascript]Node.js란?"
excerpt: ""
category:
  - javascript
tags: [javascript]
---





### Node.js

- 크롬 V8 JavaScript 엔진으로 빌드된 JS 런타임기
- Chrome의 V8 엔진을 이용하여 브라우저에서 JavaScript를 해석하듯이 서버에서 JavaScript를 동작할 수 있도록 하는 환경(플랫폼)
- 말 그래도 환경이기 때문에 NodeJS만으로는 할 수 없다.
- Node.js 라이브러리 내의 API는 모두 비동기(Non-Blocking)
  - API를 실행하고 완료되기까지 기다리지 않고 바로 다음 API를 실행합니다. 예전에 실행한 API가 값을 반환하면 이벤트 루프가 이를 확인하고 값을 받아옵니다.
- 단일 쓰레드 모델을 사용하고, 이벤트 메커니즘을 통해 서버가 멈추지 않고 반응할 수 있어 확장성을 키워줍니다.
- Chrome의 V8 JavaScript 엔진을 사용하여 빠른 코드 실행을 제공하며, 버퍼링이 없습니다.
- 위와 같은 특징을 가지고 있어 데이터를 실시간으로 다루는 애플리케이션이나 싱글페이지 애플리케이션(SPA), 입출력이 잦은 애플리케이션을 개발할 때 뛰어난 효율성을 발휘합니다.
- 단, 싱글 쓰레드 모델이기 때문에 하나의 작업 자체가 시간이 많이 걸리면 전체 시스템의 성능이 아주 급격하게 나빠지므로 CPU 사용률이 높은 애플리케이션에서는 Node.js 사용을 권장하지 않습니다.

출처: 

[Node.js 면접준비]: https://velog.io/@ehgks0000/Node-js-%EB%A9%B4%EC%A0%91%EC%A4%80%EB%B9%84

