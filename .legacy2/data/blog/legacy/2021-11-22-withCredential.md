---
title: 서버(Express.js)와 클라이언트(axios) 사이의 credential 설정
date: 2021-11-22 23:02:55
categories:
tags:
---

서버와 클라이언트는 도메인이 다른 경우가 많다. 이를 Cross-Origin이라고 하는데, 쉽게 말해 출처가 다르다는 것이다.  

기본적으로 브라우저는 출처가 다른 경우를 허용하지 않는다. 하지만 인터넷이 발전하면서 출처가 다른 곳에서 데이터를 주고 받고 싶어하는 개발자의 수요가 늘어나기 시작했고, 결국엔 별도의 정책을 만들어 정책이 정한 조건을 만족하는 경우에는 다른 출처이더라도 통신을 가능하게 했다. 그렇게 생긴 정책이 CORS이다.  

동일한 출처 간의 전송될 쿠키가 있을 경우 쿠키는 알아서 header로 들어가 서버로 전송된다. 하지만 서로 다른 출처 간의 통신에서는 header에 쿠키가 자동으로 들어가지 않기 때문에 개발자가 따로 몇 가지를 설정해주어야 한다.



### View
```jsx
 axios.post(`url`, {body}, { withCredentials: true });
```
axios로 통신할 때는 `withCredentials`를 `true`로 설정해주어야 한다.



### Express
```js
app.use(cors({
  origin: 'https://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
}));
```
express를 사용할 때는 cors 모듈의 `credentials`설정은 `Access-Control-Allow-Origin`를 true로 만들어 준다.

`origin: true`로 설정해주면 프론트 도메인 주소가 자동으로 `Access-Control-Allow-Origin`에 들어간다. 모든 주소에 대해 접근을 하는 와일드카드 `*`와는 다르다. 




출처:
- [다른 도메인간 쿠키 전송하기(axios와 express 예제)
](https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275)
- [withCredentials 옵션](https://kosaf04pyh.tistory.com/152)