# 데브코스 프로젝트 1회 / FEELDO

### 프로젝트 주제

데이터 생성, 삭제를 최소기능으로 가지는 to-do 리스트의  구현 

### 기획 배경

- **왜 모바일 화면으로 만들었나?**
    
    ‘투두 리스트로 어떻게 화면을 다 채우지?’
    
    할 일을 리스트로 나열하고, 생성하고, 수정하고, 삭제하는 단순한 기능으로는 화면을 채 반도 채우기 어려워보였습니다. 그래서 모바일 버전으로 만들어보자. 라고 생각했습니다. 
    
    또 다른 이유는 요즘 모바일 트래픽이 pc트래픽을 앞질렀다는 소식을 들었기 때문입니다. 저만 해도 개발하지 않을때는 pc보단 휴대폰을 이용해서 웹서핑을 하는 편입니다. 
    
    우리나라 가장 많은 트래픽을 수신하는 유튜브는 모바일이 pc의 9배에 달하는 트래픽 차이를 보이고있습니다.   또한 손꼽히는 e커머스 기업인 무신사마저 pc버전의 웹 개발을 중단했습니다. 저는 모바일 웹의 점유율이 지금보다 더 확대될 것이라고 생각합니다. 
    
    그에 맞춰 모바일 웹에 대한 역량을 올리기위해, 앞으로 만들 포트폴리오들도 모바일 우선으로 디자인하고 ux를 구성한 뒤, pc버전으로 확대할 계획입니다. 그 첫 번째가 FEELDO가 되겠습니다. 
    
- **FEELDO는 무슨 의미인가요?**
    
    느낌(feel), 할 일(to do)에서 두 글자씩 따서 FEELDO라고 지었습니다. 
    
    TODO를 추가할 때, 그 일에 대한 자신의 느낌을 딴 이모티콘을 포함하는것이 제가 만든 FEELDO의 핵심 기능입니다. 저는 부정적인 기분은 말이나 행동으로 표현하는 순간 현실이 된다고 생각하기에, 지루함 이상의 부정적인 기분은 option에 넣지 않았습니다. 
    

### **프로젝트 목적**

프로그래머스 데브코스에서 한 달간 배운 html, css, js 지식을 총망라하여, 개발의 시작이라고 볼 수 있는 CRUD 구현을 해 보고, 거기에 더해 추가 기능을 구현해 보는것이 이번 프로젝트의 목적입니다.

### 프로젝트 수행

![image.png](%E1%84%83%E1%85%A6%E1%84%87%E1%85%B3%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%201%E1%84%92%E1%85%AC%20FEELDO%204b90e30a1d814cab84f219497531fe56/image.png)

### 와이어프레임

![image.png](%E1%84%83%E1%85%A6%E1%84%87%E1%85%B3%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%201%E1%84%92%E1%85%AC%20FEELDO%204b90e30a1d814cab84f219497531fe56/image%201.png)

### 프로젝트 수행 도구

형상관리 : GitHub

### 포함 기술

개발 언어 : html, css, javascript

데이터베이스 : mongodb

서버 : express

배포 : cloudtype(백엔드), GitHub Pages(프론트엔드)


























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

1. history api로 변경된 url에서 유저가 새로고침을 하면 404에러가 뜨는데, html,js만으로는 대응할 수가없다. 서버가 필요.
   그러다 이걸 깃허브에 배포한다는 사실을 깨달음.
   혹시 깃허브 pages에 뭔가 설정이 있진 않을까 ?
   깃허브로 배포된 페이지에서 새로고침하니 404에러가 뜬다.
   https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
   그리고 404페이지는 수정 가능하다.
   그렇다면 404페이지도 todolist로 만들어버리면 어떨까?
   index.html 내용을 복사해서 404.html로 붙여넣는다.
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
