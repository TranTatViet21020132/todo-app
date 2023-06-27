import React from 'react';
import './task.css';
import {MdDelete} from 'react-icons/md'
import {BsCheckLg} from 'react-icons/bs'

function Task(props) {
  return (
    <div className="task">
      <div className="task__info">
        <h3>{props.taskName}</h3>
        <h5>{props.time}</h5>
      </div>
      <div className="editable__container">
        <button className="completed__btn" onClick={() => props.completeTask(props.id)} 
        style={{ background: props.completed ? "green" : "#eee" }}> <BsCheckLg/> </button>
        <button className="delete__btn" onClick={() => props.deleteTask(props.id)}> <MdDelete/> </button>
      </div>
    </div>
  );
};

export default Task;