export default function TodoInput({ $target, initialState, onSubmit }) {
  /**
   * 값을 출력하고 보내기만 한다.
   */
  const $form = document.createElement("form");
  $form.classList.add("add-todo-form");
  $target.appendChild($form);
  this.state = initialState;
  $form.innerHTML = `   <input class="add-todo-input" name="todo" placeholder="ADD TODO" required />
<select class="add-todo-select" name="difficulty" id="">
  <option value="easy">쉬움&nbsp;&nbsp;😙</option>
  <option value="challenge">어려움&nbsp;&nbsp;😏</option>
  <option value="trivial">즐거움&nbsp;&nbsp;😉</option>
  <option value="happy">행복함&nbsp;&nbsp;😊</option>
  <option value="boring">지루함&nbsp;&nbsp;😪</option>
</select>`;
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    //폼의 input태그들 중, name태그가 todo인 input의 값을 가져온다.
    //아니 이렇게 편리한게...
    const todoTextValue = $form.querySelector("input[name=todo]");
    const difficultyValue = $form.querySelector("select[name=difficulty]");
    let body = {
      text: todoTextValue.value,
      feel: difficultyValue.value,
      isComplete: false,
    };
    const regex = /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ\s\?\!\.\,]{1,20}$/;
    if (regex.test(body.text)) {
      onSubmit(body);
      todoTextValue.value = "";
      difficultyValue.value = "easy";
      return;
    } else {
      alert("Invalid input");

      return;
    }

    /**이 함수로 text값을 주게됨. TodoForm에는 아무런 영향 없이.
     * 단지 호출만 함. onSubmit이 무슨 함수인지는 관심 없음. 몰라도 됨.
     */
  });
}
