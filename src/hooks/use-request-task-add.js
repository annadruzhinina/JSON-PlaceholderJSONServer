import { useState } from "react";

export const useRequestAddItem = (refreshTodos) => {
  const [isCreating, setIsCreating] = useState(false);

  const requestAddItem = () => {
    setIsCreating(true);
    // POST
    fetch("http://localhost:3004/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        userId: 333,
        title: "New task",
        completed: true,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("New Todo is added, answer from server", response);
        refreshTodos();
      })
      .finally(() => setIsCreating(false));
  };

  return {
    isCreating,
    requestAddItem,
  };
};
