import React, { useState, useEffect } from 'react';
import Task from './Task';
import TopBar from './TopBar';

import app from './firebase';

import { collection, getDocs, getFirestore, addDoc, query, where } from "firebase/firestore";

const App = () => {

    const db = getFirestore(app);

    const [count, setCount] = useState(0);
    const [tasks, setTasks] = useState([]);

    const initializeDb = async () => {
        let taskArr = [];
        const tasksRef = collection(db, "tasks");
        const q = query(tasksRef, where("email", "==", sessionStorage.getItem('userEmail')));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let newTask = {
                id: doc.data().id,
                task: doc.data().task,
                isFinished: doc.data().isFinished
            }
            taskArr = [...taskArr, newTask];
        });
        setTasks(taskArr);
    }

    useEffect(() => {
        initializeDb();
    }, [])

    const addTask = async(event) => {
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

        // Add to firestore
        if (sessionStorage.getItem('userEmail')) {
            try {
                const docRef = await addDoc(collection(db, "tasks"), {
                    id: newTask.id,
                    task: newTask.task,
                    isFinished: false,
                    email: sessionStorage.getItem('userEmail')
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        else 
            console.log("not logged in");
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

    const saveTaskChanges = (taskIdToUpdate, task) => {
        let taskCpy = tasks;
        taskCpy.forEach(elem => {
            if (elem.id === taskIdToUpdate)
                elem.task = task;
        });
        setTasks(taskCpy);
    }

    return (
        <>
            <header className='me-3 text-white'>
                <TopBar />
            </header>
            <main className="p-2 p-md-5 text-white" style={{ minHeight: '100vh' }}>
                <form className="input-group">
                    <input id="task" autoFocus autoComplete='off' className="form-control" placeholder="Write your task here" />
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
                                return <Task
                                    task={task}
                                    key={task.id}
                                    deleteTask={deleteTask}
                                    markAsDone={markAsDone}
                                    markAsIncomplete={markAsIncomplete}
                                    saveTaskChanges={saveTaskChanges}
                                />
                            })
                            :
                            <p className='text-center'>No tasks have been added yet</p>
                    }
                </section>
            </main>
        </>
    );
}

export default App;