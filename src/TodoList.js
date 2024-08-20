export default function TodoList({
  $target,
  initialState,
  onClickTrashBox,
  onClickToPatch,
}) {
  const $todo = document.createElement("div");
  $target.appendChild($todo);
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  const returnFillIcon = (feel) => {
    switch (feel) {
      case "trivial":
        return "😉";
      case "happy":
        return "😊";
      case "easy":
        return "😙";
      case "challenge":
        return "😏";
      case "boring":
        return "😪";
      default:
        return ""; // 기본값으로 빈 문자열이나 다른 적절한 값을 반환
    }
  };
  /**데이터에 따라 다른 todo리턴 */
  const listComponent = ({ _id, feel, isComplete, text }) => {
    if (isComplete) {
      return `<li data-id="${_id}" class="todo-item completed"><img class="todoCheck" src="https://yonghwna.github.io/1st_project_feeldo/image/circle-check.svg" alt="" />
      <span class="todoText">${text}</span><span class="emozi">${returnFillIcon(
        feel
      )}</span><span class="todoDelete" >🗑️</span></li>`;
    } else {
      return `<li data-id="${_id}" class="todo-item">
      <img class="todoCheck" src="https://yonghwna.github.io/1st_project_feeldo/image/circle.svg" alt="" />
      <span class="todoText">${text}</span><span class="emozi">${returnFillIcon(
        feel
      )}</span><span class="todoDelete" >🗑️</span></li>`;
    }
  };
  let isInit = false;
  this.render = () => {
    /*이벤트 등록 한 번만 */
    if (!isInit) {
      document.querySelector(".todo-list").addEventListener("click", (e) => {
        console.log(e.target);
        const id = e.target.parentNode.dataset["id"];
        /**쓰레기통 클릭한 경우 */
        if (e.target.classList.contains("todoDelete")) {
          onClickTrashBox(id);
          return;
        }

        /**텍스트 클릭한 경우 */
        if (e.target.classList.contains("todoText")) {
          const todo = this.state.filter((v) => v._id == id)[0];
          const currentText = todo.text;
          const currentDifficulty = todo.feel;
          console.log(
            "🚀 ~ document.querySelector ~ currentDifficulty:",
            currentDifficulty
          );
          //input만들고 타입, 텍스트, 클래스 지정
          const inputWrapper = document.createElement("form");
          inputWrapper.className = "add-todo-form";
          inputWrapper.innerHTML = `   <input class="add-todo-input" name="todo" type="text" value="${currentText}" placeholder="ADD TODO" required />
          <select class="add-todo-select" selected="trivial" name="difficulty" id="">
            <option value="easy">쉬움&nbsp;&nbsp;😙</option>
            <option value="challenge">어려움&nbsp;&nbsp;😏</option>
            <option value="trivial">즐거움&nbsp;&nbsp;😉</option>
            <option value="happy">행복함&nbsp;&nbsp;😊</option>
            <option value="boring">지루함&nbsp;&nbsp;😪</option>
          </select>`;

          // input.type = "text";
          // input.value = currentText;
          //여기서 클래스변경 (스타일 유지)

          //바꿔치기
          e.target.replaceWith(inputWrapper);
          //form
          const todoInput = inputWrapper.querySelector("input");
          //포커스
          todoInput.focus();
          /**
           * 이벤트리스너를 등록해서 폼 전송을 한 다음
           * 렌더링.
           */
          inputWrapper.addEventListener("submit", (e) => {
            e.preventDefault();
            //폼의 input태그들 중, name태그가 todo인 input의 값을 가져온다.
            //아니 이렇게 편리한게...
            const todo = this.state.filter((v) => v._id == id)[0];

            const todoTextValue =
              inputWrapper.querySelector("input[name=todo]").value;

            const difficultyValue = inputWrapper.querySelector(
              "select[name=difficulty]"
            ).value;
            const body = {
              text: todoTextValue,
              feel: difficultyValue,
              priority: 1,
              isComplete: todo.isComplete,
            };

            const regex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s\?\!\.\,]{1,29}$/;
            if (regex.test(body.text)) {
              onClickToPatch({ id, body });
              return;
            } else {
              alert("Invalid input");
              return;
            }

            /**이 함수로 text값을 주게됨. TodoForm에는 아무런 영향 없이.
             * 단지 호출만 함. onSubmit이 무슨 함수인지는 관심 없음. 몰라도 됨.
             */
          });

          // blur이벤트 발생하면 li로 바꿔치기 한다는데? blur?
          // input이 focus를 잃는걸 blur라고 함.

          document.addEventListener("blur", function () {
            //새로운 li만들고 텍스트 넣고
            const newLi = document.createElement("span");
            //여기서 클래스변경 (스타일 유지)
            newLi.className = "todoText";
            newLi.textContent = currentText;

            //바꿔치기. 근데 그 자리로 가나? 어떻게? 아아!
            //애초에 input이 그냥 input이 아니고 바꿔치기된 input임.
            inputWrapper.replaceWith(newLi);
          });

          // onClickTrashBox(id);
        }

        /**완료버튼 클릭한 경우 */
        if (e.target.classList.contains("todoCheck")) {
          const todo = this.state.filter((v) => v._id == id)[0];
          const body = {
            text: todo.text,
            feel: todo.feel,
            priority: 1,
            isComplete: !todo.isComplete,
          };

          onClickToPatch({ id, body });
        }
      });
    }
    $todo.innerHTML = `
    ${this.state
      .map(({ _id, feel, isComplete, priority, text }) =>
        listComponent({ _id, feel, isComplete, priority, text })
      )
      .join("")}
    `;
    isInit = true;
  };
  this.render();
}
/**
 * completed일 경우 체크 표시에 가로줄에 circle-check
 * 아닐 경우 그냥 circle
 */
