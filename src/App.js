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
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortPressed, setIsSortPressed] = useState(false);

  const refreshTodos = () => setrefreshTodosFlag(!refreshTodosFlag);

  const { isLoading, todos } = useRequestGetTodos(refreshTodosFlag);
  const { isCreating, requestAddItem } = useRequestAddItem(refreshTodos);
  const { isUpdating, requestUpdateItem } = useRequestUpdateItem(refreshTodos);
  const { isDeleting, requestDeleteItem } = useRequestDeleteItem(refreshTodos);

  let filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isSortPressed) {
    filteredTodos = filteredTodos.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className="App">
      <h1>Todos List</h1>
      <input
        type="text"
        placeholder="Search Todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
              {filteredTodos.map(({ userId, id, title, completed }) => (
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
      <button disabled={isUpdating} onClick={requestUpdateItem}>
        Update Todo
      </button>
      <button disabled={isDeleting} onClick={requestDeleteItem}>
        Delete Todo
      </button>
      <button onClick={() => setIsSortPressed(!isSortPressed)}>Aa-Zz</button>
    </div>
  );
};

export default App;
