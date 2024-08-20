## 화면 디자인

## API

https://port-0-todo-server-lzyb7pqu6942a3da.sel4.cloudtype.app/todoList

## 데이터 형태

```
  {
    isComplete: { type: Boolean, default: false },
		createdAt: { type: Date, default: Date.now },
		feel: {
      type: String,
      enum: ["happy", "happier", "happiest"],
      default: "neutral",
    },
    text: { type: String, required: true },
    priority: { type: Number, min: 0, max: 5 }, // 예: 0~5 범위의 우선순위
    /*
	    customOrder: { type: Number, min: 0 }, // 음수 허용 안 함
			userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },*/
  },
```

## 기능

1. 할 일 목록 불러오기
2. 할 일 추가하기
3. 할 일 상태 '완료'로 바꾸기
4. 할 일 삭제하기

## 추가 기능

1. 로그인
2. 로그아웃
3. 이번 달 내 날짜 선택 시 투두리스트 불러오기

마주친 문제

알게된 것<br>

<h3>스크롤이 있는 화면에서 sticky, fixed를 사용하면 성능 및 접근성 문제를 유발할 수 있다.</h3>
사용자가 스크롤을 할 때마다 sticky, fixed인 요소를 새로운 위치에 repaint해야하는데, 해당 요소가 포함하는 내용의 양, 브라우저 및 기기의 성능에 따라 60fps를 유지하지 못하게 된다.<br>
이는 민감한 사용자에게는 접근성 문제를, 다른 사용자들에게는 Ux경험 악화를 야기하므로,

```
will-change: transform;
```

will-change속성을 추가해서 요소를 자신만의 레이어에서 렌더링시키는 방식으로 repaint속도를 향상시킬 수 있다.<br>
정말일까? 실험해보자

- will-change? <br>
잠재적으로 성능 비용이 큰 작업이 실행되기 전에 미리 실행함으로써 페이지 반응성을 증가시키는 속성. <br>
<h3>리스트에 이벤트 추가할 때 for말고 한 번에 추가하는 방법</h3>

<h3>div를 따라 삭선을 긋는 방법</h3>
```
      .todo-item::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 50%;
        width: 0%;
        height: 2px;
        background-color: red;
        transition: width 0.3s ease;
      }
      .todo-item.completed::after {
        width: 100%;
      }
```
<br>
content: ""; 이 속성은 생성한 값으로 element를 대체한다.
