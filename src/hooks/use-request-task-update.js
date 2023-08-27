import { useState } from "react";

export const useRequestUpdateItem = (refreshTodos) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdateItem = () => {
    setIsUpdating(true);

    fetch("http://localhost:3004/todos/7", {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        userId: 777,
        title: "Update New task",
        completed: true,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("New item added, answer from server", response);
        refreshTodos();
      })
      .finally(() => setIsUpdating(false));
  };
  return {
    isUpdating,
    requestUpdateItem,
  };
};
