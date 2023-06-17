import React, { useState } from 'react';
import Task from './Task';

const App = () => {

    const [count, setCount] = useState(0);
    const [tasks, setTasks] = useState([]);

    const addTask = (event) => {
        event.preventDefault();
        let newTask = {
            id: count,
            task: document.getElementById("task").value,
            isFinished: false
        }
        setCount(count + 1);
        setTasks([...tasks, newTask]);
        document.getElementById("task").value = "";
        document.getElementById("task").focus();
    }

    const deleteTask = taskIdToDelete => {
        let newTasks = tasks.filter(task => task.id !== taskIdToDelete);
        setTasks(newTasks);
    };

    const markAsDone = taskIdToToggle => {
        let otherTasks = tasks.filter(task => task.id !== taskIdToToggle);
        let changedTask = tasks.filter(task => task.id === taskIdToToggle);
        changedTask[0].isFinished = true;
        setTasks([...otherTasks, changedTask[0]]);
    }

    const markAsIncomplete = taskIdToToggle => {
        let otherTasks = tasks.filter(task => task.id !== taskIdToToggle);
        let changedTask = tasks.filter(task => task.id === taskIdToToggle);
        changedTask[0].isFinished = false;
        setTasks([changedTask[0], ...otherTasks]);
    }

    return (
        <main className="p-2 p-md-5 text-white" style={{minHeight: '100vh'}}>
            <form className="input-group">
                <input id="task" autoFocus autoComplete='false' className="form-control" placeholder="Write your task here" />
                <input
                    type='submit'
                    onClick={addTask}
                    className="input-group-append btn btn-secondary"
                    value="Add Task"
                />
            </form>

            <section className='mt-3 p-3'>
                {
                    tasks.length > 0
                        ?
                        tasks.map(task => {
                            return <Task task={task} key={task.id} deleteTask={deleteTask} markAsDone={markAsDone} markAsIncomplete={markAsIncomplete} />
                        })
                        :
                        <p className='text-center'>No tasks have been added yet</p>
                }
            </section>
        </main>
    );
}

export default App;