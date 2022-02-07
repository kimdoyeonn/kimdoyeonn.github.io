---
title: '[django]8. Django 뷰 만들기'
excerpt: ''
category:
  - django
tags: [python, django]
---

참고: [장고걸스](https://tutorial.djangogirls.org/ko/django_views/)

뷰(view)는 애플리케이션의 로직을 넣는 곳이다.
이전 장에서 만들었던 `모델`에서 필요한 정보를 받아와서 `템플릿`에 전달하는 역할을 한다.

#### blog/views.py

```python
#blog/views.py
def post_list(request):
    return render(request, 'blog/post_list.html', {})
```

위 함수는 `request`을 넘겨받아 `render`메서드를 호출하여 넘겨받은 `blog/post_list.html`템플릿을 보여준다.

> `TemplateDoesNotExist ~~`가 뜬다면 잘 된 것

장고 뷰에 대한 [장고 공식문서](https://docs.djangoproject.com/en/2.0/topics/http/views/)
