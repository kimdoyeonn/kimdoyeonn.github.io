---
title: '[Spring] 스프링 시큐리티'
date: 2021-03-03 00:02:22
category: Java
draft: false
---

참고: 코드로 배우는 스프링 웹 프로젝트

- 기본 동작 방식

  - 서블릿의 여러 종류의 필터와 인터셉터를 이용해서 처리됩니다.
  - 필터: 서블릿에서 말하는 단순한 필터
  - 인터셉터(Interceptor): 스프링에서 필터와 유사한 역할

  - 필터와 인터셉터는 특정한 서블릿이나 컨트롤 의 접근에 관여한다는 점에서는 유사하지만 결정적인 차이를 구분하자면 필터는 스프링과 무관하게 서블릿 자원이고, 인터셉터는 스프링의 빈으로 관리되면서 스프링의 컨텍스트 내에 속한다는 차이 입니다.

![img](https://t1.daumcdn.net/cfile/tistory/9983FB455BB4E5D30C)

- 인터셉터는 스프링의 내부에서 컨트롤러를 호출할 때 관여하기 때문에 스프링의 컨텍스트 내에 있는 모든 자원을 활용할 수 있습니다.
- 스프링 시큐리티를 이용하게 되면 인터셉터와 필터를 이용하면서 별도의 컨텍스트를 생성하여 처리됩니다.
- 스프링 시큐리티는 현재 동작하는 스프링 컨텍스트 내에서 동작하기 때문에 이미 컨텍스트에 포함된 여러 빈들을 같이 이용하여 다양한 방식의 인증 처리가 가능하도록 설계할 수 있습니다.

### 설정

- pom.xml에 추가

```xml
     <!-- https://mvnrepository.com/artifact/org.springframework.security/spring-security-core -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-core</artifactId>
    <version>5.0.8.RELEASE</version>
</dependency>


<!-- https://mvnrepository.com/artifact/org.springframework.security/spring-security-web -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-web</artifactId>
    <version>5.0.8.RELEASE</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.springframework.security/spring-security-config -->
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-config</artifactId>
    <version>5.0.8.RELEASE</version>
</dependency>
```

- security-context.xml 생성

  스프링 시큐리티는 단독으로 설정할 수 있기 때문에 기존의 root-context.xml이나 servlet-context.xml과는 별도로 security-context.xml을 따로 작성하는 것이 좋다.

  - 생성 후 네임스페이스에서 security 항목을 체크한다.

- web.xml 설정

  - 스프링 시큐리티가 스프링 MVC에서 사용되기 위해서는 필터를 이용해서 스프링 동작에 관여하도록 설정합니다.

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <web-app version="2.5" xmlns="http://java.sun.com/xml/ns/javaee"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd">

   <!-- The definition of the Root Spring Container shared by all Servlets and Filters -->
   <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>/WEB-INF/spring/root-context.xml</param-value>
   </context-param>

   <!-- Creates the Spring Container shared by all Servlets and Filters -->
   <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
   </listener>

   <!-- Processes application requests -->
   <servlet>
    <servlet-name>appServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
     <param-name>contextConfigLocation</param-name>
     <param-value>
      /WEB-INF/spring/appServlet/servlet-context.xml
      /WEB-INF/spring/spring-security.xml
     </param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
   </servlet>

   <servlet-mapping>
    <servlet-name>appServlet</servlet-name>
    <url-pattern>/</url-pattern>
   </servlet-mapping>

   <!-- 한글 인코딩 Start -->
   <filter>
    <filter-name>encodingFilter</filter-name>
    <filter-class>
     org.springframework.web.filter.CharacterEncodingFilter
    </filter-class>
    <init-param>
     <param-name>encoding</param-name>
     <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
     <param-name>forceEncoding</param-name>
     <param-value>true</param-value>
    </init-param>
   </filter>
   <filter-mapping>
    <filter-name>encodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
   </filter-mapping>
   <!-- 한글 인코딩 End -->
  </web-app>
  ```

**인증(Authentication)**

- 쉽게 말해서 '자신을 증명하는 것'
- 자기 스스로가 무언가 자신을 증명할 만한 자료를 제시하는 것

**권한(Authorization)**

- 남에 의해 자격이 부여된다

### AuthenticationManager(인증 매니저)

- 다양한 방식의 인증을 처리할 수 있는 구조로 되어 있음
- AuthenticationManager `<- ProviderManager <- DaoAuthenticationProvider,,,,`
- ProviderManager는 인증에 대한 처리를 AuthenticationProvider라는 타입의 객체를 이용해서 처리를 위임합니다.

- AuthenticationProvider(인증 제공자)는 실제 인증 작업을 진행합니다. 이때 인증된 정보에 권한에 대한 정보를 같이 전달하게 되는데 이 처리는 UserDetailsService라는 존재와 관련 있습니다. UserDetailsService 인터페이스의 구현체는 실제로 사용자의 정보와 사용자가 가진 권한의 정보를 처리해서 반환하게 됩니다.

- 개발자가 스프링 시큐리티를 커스터마이징 하는 방식은 크게 AuthenticationProvider를 직접 구현하는 방식과 실제 처리를 담당하는 UserDetailsService를 구현하는 방식으로 나누어집니다.
- 대부분의 경우에는 UserDetailsService를 구현하는 형태를 사용하는 것만으로도 충분하지만, 새로운 프로토콜이나 인증 구현 방식을 직접 구현하는 경우에는 AuthenticationProvider 인터페이스를 직접 구현해서 사용합니다.
