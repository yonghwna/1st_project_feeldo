document.getElementById("todoList").addEventListener("click", function (event) {
  const target = event.target;

  //span태그를 클릭해. 클래스로 식별
  if (target.tagName === "LI") {
    //text값 획득
    const currentText = target.textContent;

    //input만들고 타입, 텍스트, 클래스 지정
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";

    //바꿔치기
    target.replaceWith(input);

    //포커스
    input.focus();

    // blur이벤트 발생하면 li로 바꿔치기 한다는데? blur?
    // input이 focus를 잃는걸 blur라고 함.
    input.addEventListener("blur", function () {
      //새로운 li만들고 텍스트 넣고
      const newLi = document.createElement("li");
      //여기서 클래스리스트 add?
      newLi.textContent = input.value;

      //바꿔치기. 근데 그 자리로 가나? 어떻게? 아아!
      //애초에 input이 그냥 input이 아니고 바꿔치기된 input임.
      input.replaceWith(newLi);
    });

    // Add a document click listener to detect clicks outside the input
    document.addEventListener("click", function handleOutsideClick(e) {
      if (e.target !== input) {
        // Replace the input with a new <li> if clicking outside the input
        const newLi = document.createElement("li");
        newLi.textContent = input.value;

        input.replaceWith(newLi);

        // Remove this document click listener once it's no longer needed
        document.removeEventListener("click", handleOutsideClick);
      }
    });
  }
});
