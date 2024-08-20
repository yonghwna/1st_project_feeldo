import { getRequest, deleteRequest, patchRequest, postRequest } from "./api.js";
import App from "./App.js";
import LoginPage from "./LoginPage.js";
// import { handleRouting, navigateTo } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  window.onpopstate = handleRouting;
  handleRouting();
});

const renderTodoListPage = async () => {
  const $app = document.getElementById("app");
  $app.innerHTML = "";
  const response = await getRequest();
  console.log(`main.js_response: `, response);
  const initialState = await response.map(({ feel, isComplete, text, _id }) => {
    return { feel, isComplete, text, _id };
  });

  new App({
    $target: $app,
    initialState,
    get: getRequest,
    post: postRequest,
    update: patchRequest,
    remove: deleteRequest,
  });
};

const renderLoginPage = () => {
  localStorage.setItem("user-code", "");
  const $app = document.getElementById("app");
  LoginPage({
    $target: $app,
    navigateTo: navigateTo,
  });
};
/**pushSate로 url을 변경하고, routing함수실행 */
export const navigateTo = (url) => {
  history.pushState(null, null, url);
  handleRouting();
};

/**url이 변경된 후에 호출됨 */
export const handleRouting = () => {
  /**유저코드와 pathname이 있는지 확인 */
  const userCode = localStorage.getItem("user-code");
  const { pathname } = window.location;

  /**코드가 없고, 로그인 창이 아니라면 navigate함수 호출하고 리턴.
   * navigate함수는 주어진 인수인 /login으로 사용자를 이동시키고 종료.
   */
  if (!userCode && pathname !== "/login") {
    navigateTo("/login");
    return;
  }
  /**경로가 로그인이라면 로그인페이지 리턴  */
  if (pathname === "/login") {
    renderLoginPage();
    /**경로가 todolist라면 todolist로 */
  } else if (pathname === "/todolist") {
    renderTodoListPage();
    /**경로가 로그인도 투두리스트도 아니라면 로그인으 */
  } else {
    navigateTo("/login");
  }
};
// window.addEventListener("popstate", () => {
//   handleRouting();
// });

/**
 * 애니메이션이 끝나면 로그인페이지에서 사용자 코드를 입력받는다. 코드는 로컬 스토리지에 저장한다
 * 만약 로컬 스토리지에 코드가 있다면 이 과정을 거치지 않는다.
 *
 * 유저코드 입력을 검증하고 보내야한다. 6자~15자 영어,한글
 *
 * 입력받은 후 투두리스트로 이동한다.
 * 뒤로가기, 앞으로 가기
 * 엣지케이스
 * * 유저가 url에 아무거나 입력한다 - 404 - redirect? - 404page로
 * * todolist에서 새로고침할 때 404
 * =>유저가 수동으로 이동하는 경우에 대한 방어코드가 없음.
 * => login이나 todolist에서는 해당 페이지를 돌려줘야하고, 아니며 404나,로그인페이지(코드 있다면 투두로)로 보내야함.
 * 로그인 구현
 * 로그아웃 구현
 *
 *
 */
/**think
 * history api를 이용하면 브라우저의 세션기록(방문기록)을 조작할 수 있다.
 * History.state() = 기록 스택 최상단의 스테이트를 나타내는 값을 반환.
 * History.back() = popstate = history.go(-1) = 뒤로가기
 * History.forward() = history.go(1) = 앞으로 가기
 * History.pushState() = 매개변수로 넣은 값을 세션 기록 스택에 삽입. nul null url
 * History.replaceState() = 세션 기록 스택의 제일 최근항목을 변경
 *
 */

/**
 * 8/19
 * 앱 시작 시 데이터를 가져온다(완료)
 * [헤더에 코드를 담아 데이터를 가져온다, todoList에 넘겨준다, 그린다]
 * 가져온 데이터를 todolist에 넘겨준다(완료)
 * 그리게 한다(완료)
 *
 * create를 한다(완료)
 * [데이터를 전송한다, 데이터를 가져온다 todolist에 넘겨준다 그린다 ]
 *
 * update를 한다 (prompt?)(todo누르면 Input에 focus?)
 * 입력을 한다 =>!!!!
 * [데이터를 전송한다, 데이터를 가져온다, todolist에 넘겨준다 그린다 ]
 *
 * delete를 한다 (prompt?)(휴지통, 삭제 버튼)
 * [요청을 전송한다, 데이터를 가져온다, todoList에 넘겨준다, 그린다]
 *
 */
/**
 * 8/20
 * 시작 애니메이션을 부착한다(완료)
 * 
 * 애니메이션이 끝나면 사용자 코드를 입력받는다. 코드는 로컬 스토리지에 저장한다
 * 만약 로컬 스토리지에 코드가 있다면 이 과정을 거치지 않는다.
 * 입력받은 후 투두리스트로 이동한다.
 * ㄴhistory api로 구현한다.
 .
 * 배포.
 */
/**
 * 추가
 *  고양이 theme
 *  유저코드 입력 안하고 프롬프트 끄면 웹도 꺼진다
 *  폼 전송과 서버에 validation을 추가한다
 */
