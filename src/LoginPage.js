export default function LoginPage({ $target, navigateTo }) {
  const $input = document.createElement("div");
  $target.appendChild($input);

  //   this.setState = (nextState) => {
  //     this.state = nextState;
  //   };
  $input.innerHTML = `
  <div class="container login-container">
  <header class="loginHeader">FEELDO</header>
  <div class="login-form">
    <input
      id="userCode"
      type="text"
      class="login-input"
      placeholder="code"
    />

    <button id="loginButton" type="button" class="login-button">
      계획 세우기
    </button>
  </div>
</div>
   `;
  document.getElementById("loginButton").addEventListener("click", () => {
    const userCode = document.getElementById("userCode").value;
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,14}$/;
    if (!regex.test(userCode)) {
      alert(
        "6자이상, 15자 미만의 문자열을 영어 소문자와 숫자를 조합해서 띄어쓰기 없이 입력해주세요"
      );
      return;
    }
    localStorage.setItem("user-code", userCode);
    console.log(`userCode: `, localStorage.getItem("user-code"));
    navigateTo("/todolist");
  });
}
