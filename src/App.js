import TodoList from "./TodoList.js";
import TodoInput from "./TodoInput.js";
export default function App({
  $target,
  initialState,
  get,
  post,
  update,
  remove,
}) {
  // 컨테이너 생성
  const container = document.createElement("div");
  container.className = "container";

  // 헤더 생성
  const header = document.createElement("header");
  header.className = "header";
  header.textContent = "FEELDO";
  container.appendChild(header);

  // todo-list 생성 얘
  const todoListWrapper = document.createElement("ul");
  todoListWrapper.className = "todo-list";
  container.appendChild(todoListWrapper);

  // inputWrapper 생성 얘랑
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "inputWrapper";
  // bottomMenu 생성
  const bottomMenu = document.createElement("div");
  bottomMenu.className = "bottomMenu";

  // 이미지 생성
  const img = document.createElement("img");
  img.src = "/asset/plus.svg";
  img.alt = "";
  inputWrapper.appendChild(img);

  // inputWrapper를 bottomMenu에 추가
  bottomMenu.appendChild(inputWrapper);

  // bottomMenu를 container에 추가
  container.appendChild(bottomMenu);

  // 최종적으로 container를 body에 추가
  document.body.appendChild(container);

  //   /*todoList */
  //   const $list = document.getElementsByClassName("todo-list")[0];
  //   /*input,select wrapper */
  //   const $inputWrapper = document.getElementsByClassName("inputWrapper")[0];
  // /**list, inputWrapper를 밖에서 가져와서 넣고있다.
  //  * 여기서 만든다음 타겟안에 넣고
  //  * 밑에서 innerHtml로 추가해야함.
  //  */

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  /**배열리스트를 받아서 리스트를 그릴 컴포넌트 */
  const todoList = new TodoList({
    $target: todoListWrapper,
    initialState: initialState,
    onClickTrashBox: (id) => {
      remove(id) // post 요청 보내기
        .then(() => {
          return get(); // post가 완료되면 get 요청 보내기
        })
        .then((v) => {
          todoList.setState(v); // get 요청으로 받은 데이터로 상태 변경
        })
        .catch((error) => {
          console.error("Error:", error); // 에러 처리
        });
    },
    onClickToPatch: ({ id, body }) => {
      update({ id, body }) // post 요청 보내기
        .then(() => {
          return get(); // post가 완료되면 get 요청 보내기
        })
        .then((v) => {
          todoList.setState(v); // get 요청으로 받은 데이터로 상태 변경
        })
        .catch((error) => {
          console.error("Error:", error); // 에러 처리
        });
    },
  });
  /**데이터를 입력해서 crud를 하는 컴포넌트*/
  const todoInput = new TodoInput({
    $target: inputWrapper,
    initialState,
    onSubmit: (body) => {
      post(body) // post 요청 보내기
        .then(() => {
          return get(); // post가 완료되면 get 요청 보내기
        })
        .then((v) => {
          todoList.setState(v); // get 요청으로 받은 데이터로 상태 변경
        })
        .catch((error) => {
          console.error("Error:", error); // 에러 처리
        });
    },
  });
  // todoList.setState();
  this.render = () => {};
  this.render();
}
/**
 * main에서 데이터를 요청하고(시작)
 * App에 넘겨주고
 * 변경이 있을 때 마다 다시 요청해서(setState) => 이걸 어디서? 일단 나중에
 * 넘겨주고
 *
 */
