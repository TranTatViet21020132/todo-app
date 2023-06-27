import "./App.css";
import { useEffect, useState } from "react";
import Task from "./Task";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const [newTask, setNewTask] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    setNewTask('');
  };

  const addTask = () => {
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      time: new Date().toLocaleString(),
      completed: false,
    };
    setTodoList(task.taskName !== "" ? [...todoList, task] : todoList);

    if (task.taskName !== "") {
      toast.success('Task added successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: false
    });
    } else {
      toast.error('Please insert a title!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2500,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: false
    });
    }
  }

  const deleteTask = (id) => {
    toast.success('Task delete successfully!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2500,
      hideProgressBar: true,
      pauseOnHover: true,
      closeOnClick: false
    });
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          if (task.completed === false) {
            return { ...task, completed: true };
          } else {
            return { ...task, completed: false };
          }   
        } else {
          return task;
        }
      })
    );
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>
      <form className="toolbar__container" onSubmit={handleChange}>
        <input className="toolbar__input" value={newTask} onChange={event => setNewTask(event.target.value)} />
        <button className="toolbar__submit" onClick={addTask}> Add Task</button>
      </form>
      <div className="taskList__container">
        {todoList.map((task) => {
            return (
                <Task
                taskName={task.taskName}
                time={task.time}
                id={task.id}
                completed={task.completed}
                deleteTask={deleteTask}
                completeTask={completeTask}
              />
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
