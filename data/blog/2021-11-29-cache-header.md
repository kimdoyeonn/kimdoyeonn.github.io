---
title: 캐시 관련 헤더 설정
date: 2021-11-29 23:46:16
categories:
tags:
---

## Cache-Control

### max-age

캐시 유효시간(초)

### public

응답이 public 캐시(프록시 캐시)에 저장되어도 된다.

### private

응답이 private 캐시(브라우저 캐시)에 저장되어야 한다.(default)

### s-maxage

프록시 캐시에만 적용되는 max-age

### no-cache

데이터를 캐시해도 되지만, **항상 오리진 서버에 검증 후 사용**해야 한다.

캐시가 만료된 경우 오리진 서버에 접근을 실패하더라도 200OK와 오래된 데이터를 보내준다.

### no-store

민감한 정보이므로 저장되면 안 되고 사용된 후에 최대한 빨리 삭제되어야 한다.

### must-revalidate

캐시가 만료된 후 오리진 서버의 검증을 받는데, 오리진 서버에 접근 실패시에 오류가 발생해야 한다. (504 Gateway Timeout)

## pragma: no-cache

HTTP1.0 하위 호환

## age: 60

오리진 서버에서 응답 후 프록시 캐시 내에 머문 시간(초)

## Expires: Mon, 01 Jan 1990 00:00:00: GMT

- 정확한 날짜로 만료 시간 지정
- HTTP 1.0부터 사용
- Cache-Control: max-age가 더 권장됨(함께 사용하면 Expires가 무시됨)

## Last-Modified

캐시 데이터의 마지막 수정일, 오리진 서버에서 캐시에 저장할 데이터를 보낼 때 같이 보낸다.

## If-Modified-Since, If-Unmodified-Since

클라이언트에서 유효시간이 만료된 캐시의 수정 여부를 서버에 확인할 때 사용한다.

## Etag

캐시의 해시값을 응답에 담아 클라이언트에 보내줄 때 사용한다.

## If-None-Match, If-Match

클라이언트에서 유효시간이 만료된 캐시의 수정 여부를 서버에 확인할 때 사용한다.
