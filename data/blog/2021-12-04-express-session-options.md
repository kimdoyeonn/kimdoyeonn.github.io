---
title: express-session-options
date: 2021-12-04 23:57:17
categories:
tags:
---

express-session는 express에서 session을 사용하기 위한 express 미들웨어이다.

세션을 사용한 상태유지는 데이터 자체는 서버에 저장하고, 데이터를 저장한 세션의 아이디만 클라이언트에 쿠키로 전달한다. 이 때 세션에 대한 설정과 클라이언트에 보내지는 쿠키에 대한 설정을 미리 해줘야하는데, express-session에서는 아래와 같은 형식으로 옵션을 설정한다.

```jsx
app.use(
  session({
    secret: '@doyeon',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    },
  })
)
```

### session(options)

세션을 만들 때 사용하는 미들웨어이다. 인자로 옵션 객체를 전달하여 사용한다.

## options

### cookie

클라이언트로 보낼 세션 아이디 쿠키 객체를 설정한다.

- domain: `Set-Cookie` 의 `domain`속성의 값을 정한다. 설정하지 않으면, 모든 클라이언트는 쿠키가 자신의 도메인에만 적용되는 것으로 안다.
- expires: 쿠키의 수명을 설정(Date 객체)
- httpOnly: `Set-Cookie` 의 `httpOnly` 속성의 값을 설정(boolean), `true`로 설정하면 클라이언트에서 자바스크립트에서 `document.cookie`로 접근할 수 없다.
- maxAge: `Set-Cookie`의 `Expires` 속성의 값으로 설정할 때 사용한다. 현재 서버 시간에 maxAge의 ms를 추가하여 만료 날짜를 계산한다.
- path: `Set-Cookie`의 `Path` 속성을 정한다. 기본 값은 '/'이다.
- sameSite: boolean 이나 문자열 값이 `Set-Cookie`의 `SameSite` 속성으로 정해진다.
  - true: SameSite를 Strict로 설정한다.
  - false: SameSite를 설정하지 않는다.
  - 'lax': 'Lax'로 설정 다른 origin에는 get 요청에만 쿠키를 전달한다.(같은 origin은 다 ok)
  - 'none': 'None'로 설정, 모든 origin에 대해 쿠키를 전달한다.
  - 'strict': 'Strict'로 설정, 같은 origin에만 쿠키를 전달한다.
- secure: `Set-Cookie`의 `Secure` 값을 설정한다. boolean값이며 https인 서버에만 쿠키를 전달한다.

### resave

true일 경우 요청 중에 세션을 수정하지 않은 경우에도 세션을 다시 저장소에 저장한다. 기본값은 true이지만 false로 많이 사용하기 때문에 deprecated 상태이다.

true일 경우에는 서버로 병렬 요청이 들어올 경우 한 요청의 변경 사항과 다른 요청의 변경사항이 충돌하는 경우가 발생할 수 있다.

세션 저장소에서 세션을 유지하도록 도와주는 touch 메소드를 사용하지 않을 경우에는 true로 사용한다. 하지만 거의 대부분의 저장소들이 touch 메소드를 사용하므로 false를 많이 사용한다.

### saveUninitialized

요청이 들어왔을 때마다 서버에 새로운 세션이 만들어지게 되는데 uninitialized는 요청이 새로 만들어진 세션을 사용하지 않은 경우를 말한다.

이 설정은 요청이 새로 만들어진 세션을 사용하지 않은 경우에도 서버에 저장할지 하지 않을지를 결정한다. 기본값인 true로 설정하면 빈 세션을 서버에 저장하게 된다.

출처:

- 코드스테이츠 유어클래스
- **[express-session 패키지의 resave, saveUninitialized 옵션](https://fierycoding.tistory.com/36)**
- **[express-session 공식 문서](https://www.npmjs.com/package/express-session)**
