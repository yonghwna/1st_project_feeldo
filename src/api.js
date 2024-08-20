const API_END_POINT =
  "https://port-0-todo-server-lzyb7pqu6942a3da.sel4.cloudtype.app/todoList";
const returnUrl = (todoId = "") => {
  return `${API_END_POINT}${todoId !== "" ? `/${todoId}` : todoId}`;
};
const defaultHeaders = {
  "Content-Type": "application/json",
  "user-code": JSON.stringify("user4"),
};

export const getRequest = async () => {
  try {
    const response = await fetch(`${returnUrl()}`, {
      headers: defaultHeaders,
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
  try {
    const response = await fetch(`${returnUrl()}`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(body),
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
  try {
    const response = await fetch(`${returnUrl(id)}`, {
      method: "PATCH",
      headers: defaultHeaders,
      body: JSON.stringify(body),
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
  try {
    const response = await fetch(`${returnUrl(todoId)}`, {
      method: "DELETE",
      headers: defaultHeaders,
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status}Error`);
    }
  } catch (error) {}
};
