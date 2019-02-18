
# 설계 구조
---

## Models
### ImageItemModels
 * 이미지 아이템의 데이터 모델
### ImagesModel
 * 이미지 묶음의 데이터 모델  
 * 데이터를 fetch 해서 데이터 가공 후 MainController 에 전달
---
## View-Models
### SliderViewModel
 * slider 뷰의 추상화
### ViewModel
 * 뷰의 추상화  
 * 변화된 상태 업데이트
---
## Views
### View
 * 요소 추상화
### SelectboxItemView
 * 이미지 선택박스 아이템 요소 추상화
### ViewerItemView
 * 이미지 뷰어 아이템 요소 추상화
---
## Controllers
### MainController
 * 뷰와 모델을 옵저버 패턴을 활용해서 연결

# 설계 구조도면
___
~~~
       Controller
Model            ViewModel/View
~~~
 
