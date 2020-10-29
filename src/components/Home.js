import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";

const FILTER_MAP = {
    All: () => true,
    NotStarted: (task) => {
        if (task.status === 0) {
            return true
        } else {
            return false
        }
    },
    Started: (task) => {
        if (task.status === 1) {
            return true
        } else {
            return false
        }
    },
    Completed: (task) => {
        if (task.status === 2) {
            return true
        } else {
            return false
        }
    }
}

const DATA = [
    { id: "todo-0", name: "Eat", status: 0 },
    { id: "todo-1", name: "Sleep", status: 1 },
    { id: "todo-2", name: "Repeat", status: 2 }
];

const FILTER_NAMES = Object.keys(FILTER_MAP);

function Home(props) {
    const [tasks, setTasks] = useState(DATA);

    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const data = localStorage.getItem("listOfTasks");
        if (data) {
            setTasks(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("listOfTasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask(name) {
        const newTask = { id: "todo-" + nanoid(), name: name, status: 0 };
        setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(id, status) {
        const updatedTasks = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // use object spread to make a new object
                // whose `completed` prop has been inverted
                return {...task, status: status}
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function editTask(id, newName) {
        const editedTaskList = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                //
                return {...task, name: newName}
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }

    const clearTasks = () => {
        setTasks([]);
        localStorage.clear();
    }

    const taskList = tasks
        .filter(task => FILTER_MAP[filter](task))
        .map(task => (
            <Todo
                id={task.id}
                name={task.name}
                status={task.status}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    const filterList = FILTER_NAMES.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;
    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Form addTask={addTask} />
            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">{headingText}</h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
                <button onClick={clearTasks} id="clearTasksButton" className="btn btn__primary btn__lg">Clear All Tasks</button>
            </ul>
        </div>
    );
}

export default Home;