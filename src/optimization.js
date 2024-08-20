var el = document.getElementById("element");

// 요소가 hover 상태일 때 will-change 설정
el.addEventListener("mouseenter", hintBrowser);
el.addEventListener("animationEnd", removeHint);

function hintBrowser() {
  // 애니메이션 키프레임 단락 내에서
  // 변경될 예정인 최적화 가능한 속성들
  this.style.willChange = "transform, opacity";
}

function removeHint() {
  this.style.willChange = "auto";
}
