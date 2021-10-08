---
title: "[Django]장고튜토리얼-장고앱작성하기 part3"
excerpt: ""
category:
  - django
tags: [python, django]
---

출처: [첫번째 장고앱 작성하기](https://docs.djangoproject.com/ko/3.1/intro/tutorial03/)



### 뷰(view)

뷰는 Django 어플리케이션이 일반적으로 특정 기능과 템플릿을 제공하는 웹 페이지의 한 종류입니다. 예를 들어 블로그 어플리케이션의 경우 다음과 같은 뷰를 가질 수 있습니다.

- 블로그 홈페이지 - 가장 최근의 항목들을 보여줍니다.
- 세부페이지 = 하나의 항목에 연결하는 영구적인 링크를 제공합니다.
- 년도별 축적 페이지 - 주어진 연도의 모든 월별 항목들을 표시합니다.
- 월별 축적 페이지 - 주어진 월의 날짜 별 항목들을 표시합니다.
- 날짜별 축적 페이지 = 주어진 난ㄹ짜의 모든 항목들을 표시합니다.
- 댓글 기능 - 특정 항목의 댓글을 다룰 수 있는 기능



poll 어플리케이션에서는 다음 네개의 view를 만들어 보겠습니다.

- 질문 <색인> 페이지 - 최근의 질문들을 표시합니다.
- 질문 <세부> 페이지 - 질문 내용과, 투표할 수 있는 서식을 표시합니다.
- 질문 <결과> 페이지 - 특정 질문에 대한 결과를 표시합니다.
- 투표 기능 - 측정 질문에 대해 특정 선택을 할 수 있는 투표 기능을 제공합니다.

장고에서 웹 페이지들, 컨텐츠는 뷰에 의해 전달된다. 각각의 뷰는 파이썬 함수(또는 클래스 기반의 뷰일 경우엔 메소드 )에 의해 표현된다. 장고는 요청된 URL(정확히 말하자면 도메인 이름 뒤에 있는 URL)을 검사하여 뷰를 고른다.

URL로부터 뷰를 얻기 위해, Django는 URLconfs 라는 것을 사용합니다. URLconf는 URL 패턴을 뷰에 연결합니다.

좀 더 자세한 정보는 [URL dispatcher](https://docs.djangoproject.com/ko/3.1/topics/http/urls/)

---



### 뷰 추가하기

`polls/urls.py`

```python
    # /polls/5/
    path('<int:question_id>/', views.detail, name='detail'),

    # /polls/5/results/
    path('<int:question_id>/results/', views.results, name='results'),

    # /polls/5/vote/
    path('<int:question_id>/vote/', views.vote, name='vote'),
```

`polls/views.py`

```python
def detail(reqeust, question_id):
    return HttpResponse("You're looking at question %s." % question_id)


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```

사용자가 웹사이트의 페이지를 요청할 때, `polls/34/`를 요청했다고 하면, Django는 **mysite.urls** 파이썬 모듈을 불러오게 됩니다. **ROOT_URLCONF**설정에 의해 해당 모듈을 바라보도록 지정되어 있기 때문입니다. **mysite.urls**에서 **urlpatterns**라는 변수를 찾고, 순서대로 패턴을 따라갑니다. **polls/**를 찾은 후엔, 일치하는 텍스트(**polls/**)를 버리고, 남은 텍스트인 **34/**를 polls.urls URLconf로 전달하여 남은 처리를 진행합니다. 거기에 **`<int:question_id>/`**와 일치하여, 결과적으로 **detail()**뷰 함수가 호출됩니다.

```python
detail(request=<HttpRequest object>, question_id=34)
```

`question_id=34`는 `<int:question_id>`에서 왔습니다. 괄호를 사용하여 URL의 일부를 캡쳐하고, 해당 내용을 keyword 인수로서 뷰 함수로 전달합니다. 문자열의 `:question_id>`부분은 일치하는 패턴을 구별하기 위해 정의한 이름이며 `<int:`부분은 어느 패턴이 해당 URL 경로에 일치되어야 하는지를 결정하는 컨버터입니다.

---



### 뷰가 실제로 뭔가를 하도록 만들기

각 뷰는 두 가지 중 하나를 하도록 되어 있습니다.

- 요청된 페이지의 내용이 담긴 HttpResponse 객체를 반환
- Http04 같은 예외를 발생

당신이 작성한 뷰는 데이터베이스의 레코드를 읽을 수 있습니다. 또한 뷰는 Django나 Python에서 서드파티로 제공되는 템플릿 시스템을 사용할 수도 있습니다. 뷰는 PDF를 생성하거나, XML을 출력하거나, 실시간으로 ZIP파일을 만들 수 있습니다.뷰는 당신이 원하는 무엇이든, Python의 어떤 라이브러리라도 사용할 수 있습니다.

Django에 필요한 것은 HttpResponse 객체 혹은 예외 입니다. 그렇게 다루는 게 편리하기 때문입니다.



뷰에서 사용할 수 있는 템플릿을 작성하여 Python코드로부터 디자인을 분리하도록 Django의 템플릿 시스템을 사용해 봅시다.

우선 **polls** 디렉토리에 **templates**라는 디렉토리를 만듭니다. Django는 여기서 템플릿을 찾게 될 것입니다.

프로젝트의 **TEMPLATES**설정은 Django가 어떻게 템플릿을 불러오고 랜더링 할 것인지 기술합니다. 기본 설정 파일 **APP_DIRS**옵션이 **True**로 설정된 **DjangoTemplates** 백앤드를 구성합니다. 관례에 따라 **DjangoTemplates**dms rkr **INSTALLED_APPS**디렉토리의 templates 하위 디렉토리를 탐색합니다.

실제로 index.html 파일의 경로는 polls/templates/polls/index.html이 됩니다. templates 아래에 파일을 만들 수도 있지만 장고는 찾는 이름과 일치하는 첫번째 템플릿을 읽기 때문에, 다른 애플리케이션에 이름이 중복되는 템플릿이 있을 경우 올바르지 않게 동작할 수 있습니다. 때문에 장고가 올바른 것을 가르킬 수 있도록 만들어주기 위해 네임 스페이스를 지정하여 해당 템플릿을 응용 프로그램 자체의 이름이 지정된 디렉토리에 넣어주는 방법을 사용합니다.

```python
from django.http import HttpResponse
from django.template import loader

from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'lastest_question_list':
        latest_question_list,
    }
    return HttpResponse(template.render(context, request))
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My test page</title>
  </head>
  <body>
    {% if lastest_question_list %}
    <ul>
      {% for question in lastest_question_list %}
      <li><a href="/polls/{{question.id}}/">{{question.question_text}}</a></li>
      {% endfor %}
    </ul>
    {% else %}
    <p>No polls are available.</p>
    {% endif %}
  </body>
</html>
```

![django_poll_question_list](https://user-images.githubusercontent.com/53068706/107882568-67c35c80-6f2d-11eb-942d-1cc51f32c8f2.PNG)

#### **render()**

템플릿에 context를 채워넣어 표현한 결과를 HttpResponse 객체와 함께 돌려주는 구문은 자주 쓰는 용법입니다. 따라서 Django는 이런 표현을 쉽게 표현할 수 있도록 단축기능을 제공합니다. **index()**뷰를 단축기능으로 작성하면 다음과 같습니다. 

```python
from django.shortcuts import render

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {
        'lastest_question_list':
        latest_question_list,
    }
    return render(request, 'polls/index.html', context)
```

모든 뷰에 적용한다면, 더이상 loader와 HttpResponse를 임포트하지 않아도 됩니다. (만약 detail, results, vote에서 stub 메소드를 가지고 있다면, HttpResponse를 유지해야합니다.)

**render()** 함수는 request 객체를 첫번째 인수로 받고 템플릿 이름을 두번째 인수로 받으며, context 사전형 객체를 세번째 선택적(optional)인수로 받습니다. 인수로 지정된 context로 표현된 템플릿의 **HttpResponse**객체가 반환됩니다.

---



### 404 에러 일으키기

뷰는 요청된 질문의 ID가 없을 경우 **Http404**예외를 발생시킵니다.

```python
def detail(reqeust, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'polls/detail.html', {'question': question})
```

#### get_object_or_404()

만약 객체가 존재하지 않을 때 get()을 사용하여 Http404 예외를 발생시키는 것은 자주 쓰이는 용법입니다. Django에서 이 기능에 대한 단축 기능을 제공합니다.

detail() 뷰를 단축 기능으로 작성하면 다음과 같습니다.

```python
from django.shortcuts import get_object_or_404, render

def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})
```

**get_object_or_404()** 함수는 Django 모델을 첫번째 인자로 받고, 몇 개의 키워드 인수를 모델 관리자의 **get()**함수에 넘깁니다. 만약 객체가 존재하지 않을 경우, **Http404** 예외가 발생합니다.

> **ObjectDoesNotExist** 예외를 자동으로 잡아내는 대신 **get_object_or_404()** 도움 한수를 사용하거나, **ObjectDoesNotExist** 예외를 사용하는 대신 **Http404**를 사용하는 이유는 무엇일까요?
>
> 모델 계층에 연결하는 방법이기 때문입니다. 
>
> Django의 중요한 설계 목표는 약결합(loose coupling)을 관리하는데에 있습니다. 일부 제어된 결합이 **django.shortcuts** 모듈에도 도입되었습니다.



