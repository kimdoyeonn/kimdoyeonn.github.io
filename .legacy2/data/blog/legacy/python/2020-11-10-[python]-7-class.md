---
title: '[python]7. 클래스'
tags: [python, jump-to-python, class]
---

### 클래스

- 클래스(class) -> 과자틀

- 객체(object) -> 과자 틀에 의해서 만들어진 과자

- 객체와 인스턴스의 차이

  - 클래스로 만든 객체를 인스턴스라고도 한다.

  - `a = Cookie()`

    - a는 객체

    - a는 Cookie의 인스턴스

* 사칙연산 계산기 예제

```python
class FourCal:
    def setdata(self, first, second):
        self.first = first
        self.second = second
    def add(self):
        result = self.first + self.second
        return result
    def mul(self):
        result = self.first * self.second
        return result
    def sub(self):
        result = self.first - self.second
        return result
    def div(self):
        result = self.first / self.second
        return result



a = FourCal()
b = FourCal()

# FourCal.setdata(a,4,2) # 잘사용하진 않지만 이 방법도 가능
a.setdata(4,2)
b.setdata(3,6)

# 주소값이 다른걸 확인할 수 있다.
print(id(a.first)) #11567616
print(id(b.first)) #11567584

print(a.add())
print(a.mul())
print(a.sub())
print(a.div())

```

### 생성자(Constructor)

```pytho
class FourCal:
	def ___init___(self,first,second):
		self.first = first
		self.second = second
    def setdata(self, first, second):
        self.first = first
        self.second = second
    def add(self):
        result = self.first + self.second
        return result
    def mul(self):
        result = self.first * self.second
        return result
    def sub(self):
        result = self.first - self.second
        return result
    def div(self):
        result = self.first / self.second
        return result



a = FourCal()
b = FourCal()

# FourCal.setdata(a,4,2) # 잘사용하진 않지만 이 방법도 가능
a.setdata(4,2)
b.setdata(3,6)

# 주소값이 다른걸 확인할 수 있다.
print(id(a.first)) #11567616
print(id(b.first)) #11567584

print(a.add())
print(a.mul())
print(a.sub())
print(a.div())

```

### 클래스의 상속(inheritance)

```python
# 상속
class MoreFourCal(FourCal):
    def pow(self):
        result = self.first ** self.second
        return result
```

MoreFourCal 클래스는 FourCal 클래스를 상속했으므로 FourCal 클래스의 모든 기능을 사용할 수 있다.

- 상속을 사용하는 이유
  - 기존 클래스를 변경하지 않고 기능을 추가하거나 기존 지능을 변경하려고 할 때 사용한다.
  - 기존 클래스가 라이브러리 형태로 제공되거나 수정이 허용되지 않는 상황이라면 상속을 사용하여야 한다.

### 메서드 오버라이딩(Overriding)

```python
class MoreFourCal(FourCal):
    def div(self):
        if self.second == 0: # 나누는 값이 0인 경우 0을 리턴하도록 수정
            return 0
        else:
            return self.first / self.second
```

- 부모클래스(상속한 클래스)에 있는 메서드를 동일한 이름으로 다시 만드는 것을 메서드 오버라이딩(덮어쓰기)이라고 한다.
- 메서드를 오버라이딩하면 부모 클래스의 메서드 대신 오버라이딩한 메서드가 호출된다.

### 클래스 변수

- 객체 변수는 다른 객체들에 영향받지 않고 독립적으로 그 값을 유지한다.

```python
# 클래스변수
class Family:
    lastname = "김"

print(Family.lastname)
a = Family()
b = Family()
print(a.lastname) # 김
print(b.lastname) # 김

print(id(Family.lastname)) # 140434541531008
print(id(a.lastname)) # 140434541531008
print(id(b.lastname)) # 140434541531008
```
