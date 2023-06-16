import React, { useState } from 'react';
import Task from './Task';

const App = () => {

    const [tasks, setTasks] = useState([]);

    const addTask = (event) => {
        event.preventDefault();
        let newTask = document.getElementById("task").value;
        setTasks([...tasks, newTask]);
        document.getElementById("task").value = "";
    }

    return (
        <main className="vh-100 p-2 p-md-5 text-white" style={{background: "#000"}}>
            <form className="input-group">
                <input id="task" autoFocus autoComplete='false' className="form-control" placeholder="Write your task here" />
                <input
                    type='submit'
                    onClick={addTask}
                    className="input-group-append btn btn-primary"
                    value="Add Task"
                />
            </form>

            <section className='mt-3 p-3' style={{maxHeight: "75vh", overflowY: "scroll"}}>
                {
                    tasks.length > 0
                        ?
                        tasks.map(task => {
                            return <Task task={task} />
                        })
                        :
                        <p className='text-center'>No tasks have been added yet</p>
                }
            </section>
        </main>
    );
}

export default App;