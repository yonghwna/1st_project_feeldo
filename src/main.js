import { getRequest, deleteRequest, patchRequest, postRequest } from "./api.js";
import App from "./App.js";
const $app = document.getElementById("app");
const response = await getRequest();
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
