import { useState } from "react";

export const useRequestAddItem = (refreshProducts) => {
  const [isCreating, setIsCreatig] = useState(false);

  const requestAddItem = () => {
    setIsCreatig(true);
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
        console.log("New task added, answer from server", response);
        refreshProducts();
      })
      .finally(() => setIsCreatig(false));
  };

  return {
    isCreating,
    requestAddItem,
  };
};
