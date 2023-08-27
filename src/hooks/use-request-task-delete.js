import { useState } from "react";

export const useRequestDeleteItem = (refreshTodos) => {
  const [isDeleting, setIsDeliting] = useState(false);

  const requestDeleteItem = () => {
    setIsDeliting(true);

    fetch("http://localhost:3004/todos/4", {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("TV deleted, answer from server", response);
        refreshTodos();
      })
      .finally(() => setIsDeliting(false));
  };
  return {
    isDeleting,
    requestDeleteItem,
  };
};
