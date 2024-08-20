// router.js
export const navigateTo = (url) => {
  history.pushState(null, null, url);
  handleRouting();
};

export const handleRouting = () => {
  const userCode = localStorage.getItem("user-code");
  const { pathname } = window.location;

  if (!userCode && pathname !== "/login") {
    navigateTo("/login");
    return;
  }

  if (pathname === "/login") {
    renderLoginPage();
  } else if (pathname === "/todolist") {
    renderTodoListPage();
  } else {
    navigateTo("/login");
  }
};
