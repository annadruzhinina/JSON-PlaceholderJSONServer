import { useState } from "react";
import "./App.css";

import {
  useRequestAddItem,
  useRequestGetTodos,
  useRequestUpdateItem,
  useRequestDeleteItem,
} from "./hooks";

const App = () => {
  const [refreshTodosFlag, setrefreshTodosFlag] = useState(false);

  const refreshTodos = () => setrefreshTodosFlag(!refreshTodosFlag);

  const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);
  const { isCreating, requestAddItem } = useRequestAddItem(refreshTodos);
  // const { isUpdating, requestUpdateItem } = useRequestUpdateItem(refreshTodos);
  const { isDeleting, requestDeleteItem } = useRequestDeleteItem(refreshTodos);

  return (
    <div className="App">
      <h1>Todos List</h1>
      {isLoading ? (
        <div className="loader">...</div>
      ) : (
        <div className="table-container">
          <table className="centered-table">
            <thead>
              <tr>
                <th>UserID</th>
                <th>Title</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(({ userId, id, title, completed }) => (
                <tr key={id}>
                  <td>{userId}</td>
                  <td>{title}</td>
                  <td>{completed ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button disabled={isCreating} onClick={requestAddItem}>
        Add new item
      </button>
      {/* <button disabled={isUpdating} onClick={requestUpdateItem}>
        Update Laptop
      </button> */}
      <button disabled={isDeleting} onClick={requestDeleteItem}>
        Delete New Item
      </button>
    </div>
  );
};

export default App;
