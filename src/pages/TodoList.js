import React, { useState } from 'react';

const TodoList = ({ todos, editTodo, deleteTodo }) => {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');
  const [strikethroughIds, setStrikethroughIds] = useState([]);

  const handleEditChange = e => {
    setEditedTodoText(e.target.value);
  };

  const handleEditSave = (id) => {
    editTodo(id, editedTodoText);
    setEditingTodoId(null);
    setEditedTodoText('');
  };

  const handleCheckboxToggle = (id) => {
    if (strikethroughIds.includes(id)) {
      setStrikethroughIds(strikethroughIds.filter(itemId => itemId !== id));
    } else {
      setStrikethroughIds([...strikethroughIds, id]);
    }
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={strikethroughIds.includes(todo.id)}
            onChange={() => handleCheckboxToggle(todo.id)} 
          />
          {editingTodoId === todo.id ? (
            <div>
              <input
                type="text"
                value={editedTodoText}
                onChange={handleEditChange}
              />
              <button onClick={() => handleEditSave(todo.id)}>Save</button>
            </div>
          ) : (
            <div>
              <span style={{ textDecoration: strikethroughIds.includes(todo.id) ? 'line-through' : 'none' }}>
                {todo.title}
              </span>
              <button onClick={() => setEditingTodoId(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;