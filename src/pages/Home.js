import React, { useState } from 'react';
import TodoList from './TodoList';
import Todoform from './Todofrom';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleTodo = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id, newTitle) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const addTodo = title => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const filteredTodos = showCompleted
    ? todos.filter(todo => todo.completed)
    : todos;


    const [city, setCity] = useState('');
  const [result, setResult] = useState('');

  const changeHandler = e => {
    setCity(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    const apiKey = 'abfdd6412c3c74f7290743a4e1ad3125';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15; // Corrected conversion formula
        setResult(`Temperature at ${city}: ${Math.round(celsius)}°C`);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setResult(`Error fetching weather data`);
      });
    }


  return (
    <>
    <section>
    <div >
      <h1>Todo App</h1>
      <Todoform addTodo={addTodo} />
      <button onClick={() => setShowCompleted(!showCompleted)}>
        Show 
      </button>
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
      
    </div>
    </section>
    <section>

          <div className="App">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Weather App</h4>
            <form onSubmit={submitHandler}>
              <input type="text" name="city" value={city} onChange={changeHandler} />
              <br />
              <br />
              <input type="submit" value="Get Temperature" />
            </form>
            <h1>{result}</h1>
          </div>
        </div>
    </div>

    </section>
    </>
  );
};

export default Home;
