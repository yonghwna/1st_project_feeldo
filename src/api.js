// const API_END_POINT =
//   "https://port-0-todo-server-lzyb7pqu6942a3da.sel4.cloudtype.app/todoList";
const API_END_POINT = "http://localhost:8080/todoList";
const returnUrl = (todoId = "") => {
  return `${API_END_POINT}${todoId !== "" ? `/${todoId}` : todoId}`;
};

export const getRequest = async () => {
  const userCode = localStorage.getItem("user-code");
  console.log(`api.js_user-code :`, userCode);
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      "user-code": JSON.stringify(userCode),
    };
    const response = await fetch(`${returnUrl()}`, {
      headers: defaultHeaders,
      cache: "no-cache",
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status}Error`);
    }
  } catch (error) {}
};

// POST 요청
export const postRequest = async (body) => {
  const userCode = localStorage.getItem("user-code");

  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      "user-code": JSON.stringify(userCode),
    };
    const response = await fetch(`${returnUrl()}`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(body),
      cache: "no-cache",
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status}Error`);
    }
  } catch (error) {}
};

// PATCH 요청
export const patchRequest = async ({ id, body }) => {
  const userCode = localStorage.getItem("user-code");

  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      "user-code": JSON.stringify(userCode),
    };
    const response = await fetch(`${returnUrl(id)}`, {
      method: "PATCH",
      headers: defaultHeaders,
      body: JSON.stringify(body),
      cache: "no-cache",
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status}Error`);
    }
  } catch (error) {}
};

// DELETE 요청
export const deleteRequest = async (todoId) => {
  const userCode = localStorage.getItem("user-code");

  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
      "user-code": JSON.stringify(userCode),
    };
    const response = await fetch(`${returnUrl(todoId)}`, {
      method: "DELETE",
      headers: defaultHeaders,
      cache: "no-cache",
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status}Error`);
    }
  } catch (error) {}
};
