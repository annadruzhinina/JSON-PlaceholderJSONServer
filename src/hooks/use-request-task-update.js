import { useState } from "react";

export const useRequestUpdateItem = (refreshTodos) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const requestUpdateItem = () => {
    setIsUpdating(true);

    fetch("http://localhost:3004/todos/14", {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        userId: 777,
        title: "Update New task",
        completed: true,
        id: 14,
      }),
    });
  };
  return {
    isUpdating,
    requestUpdateItem,
  };
};
