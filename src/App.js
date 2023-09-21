import React, { useState, useEffect } from 'react';
import Task from './Task';
import TopBar from './TopBar';

import app from './firebase';

import { collection, getDocs, getFirestore, addDoc, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";

const App = () => {

    const db = getFirestore(app);

    const [tasks, setTasks] = useState([]);

    const initializeDb = async () => {
        let taskArr = [];
        const tasksRef = collection(db, "tasks");
        const q = query(tasksRef, where("email", "==", sessionStorage.getItem('userEmail')));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let newTask = {
                id: doc.id,
                task: doc.data().task,
                isFinished: doc.data().isFinished
            }
            taskArr = [...taskArr, newTask];
        });
        setTasks(taskArr);
        console.log(taskArr);
    }

    useEffect(() => {
        initializeDb();
    }, [])

    const addTask = async (event) => {
        event.preventDefault();

        if (sessionStorage.getItem('userEmail')) {
            try {
                // Make changes in firestore
                const docRef = await addDoc(collection(db, "tasks"), {
                    task: document.getElementById("task").value,
                    isFinished: false,
                    email: sessionStorage.getItem('userEmail')
                });
                console.log("Document written with ID: ", docRef.id);

                // Make changes in client
                let newTask = {
                    id: docRef.id,
                    task: document.getElementById("task").value,
                    isFinished: false,
                    email: sessionStorage.getItem('userEmail')
                }
                setTasks([...tasks, newTask]);
                document.getElementById("task").value = "";
                document.getElementById("task").focus();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        else
            console.log("not logged in");
    }

    const deleteTask = async (taskIdToDelete) => {
        // Make changes on client
        let newTasks = tasks.filter(task => task.id !== taskIdToDelete);
        setTasks(newTasks);

        // Make changes on firestore
        const documentRef = doc(db, 'tasks', taskIdToDelete);
        deleteDoc(documentRef)
            .then(() => {
                console.log(`Document with ID ${taskIdToDelete} successfully deleted.`);
            })
            .catch((error) => {
                console.error('Error deleting document:', error);
            });
    };

    const markAsDone = taskIdToToggle => {
        // Update on client
        let otherTasks = tasks.filter(task => task.id !== taskIdToToggle);
        let changedTask = tasks.filter(task => task.id === taskIdToToggle);
        changedTask[0].isFinished = true;
        setTasks([...otherTasks, changedTask[0]]);

        // Update on firestore
        let newData = changedTask[0];
        const documentRef = doc(db, 'tasks', taskIdToToggle);
        updateDoc(documentRef, newData)
            .then(() => {
                console.log(`Document with ID ${taskIdToToggle} successfully updated.`);
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
    }

    const markAsIncomplete = taskIdToToggle => {
        let otherTasks = tasks.filter(task => task.id !== taskIdToToggle);
        let changedTask = tasks.filter(task => task.id === taskIdToToggle);
        changedTask[0].isFinished = false;
        setTasks([changedTask[0], ...otherTasks]);

        // Update on firestore
        let newData = changedTask[0];
        const documentRef = doc(db, 'tasks', taskIdToToggle);
        updateDoc(documentRef, newData)
            .then(() => {
                console.log(`Document with ID ${taskIdToToggle} successfully updated.`);
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
    }

    const saveTaskChanges = (taskIdToUpdate, task) => {
        let taskCpy = tasks;
        let newData = {};
        taskCpy.forEach(elem => {
            if (elem.id === taskIdToUpdate) {
                elem.task = task;
                newData = elem;
                return;
            }
        });
        setTasks(taskCpy);

        // Update on firestore
        const documentRef = doc(db, 'tasks', taskIdToUpdate);
        updateDoc(documentRef, newData)
            .then(() => {
                console.log(`Document with ID ${taskIdToUpdate} successfully updated.`);
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            });
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