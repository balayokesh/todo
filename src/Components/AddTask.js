import React, { useState, Component } from 'react';

class AddTask extends Component {

    render() {

        return (

            <div className="container">
                <div className="form-group text-center">
                    <label htmlFor="taskInput" style={{ fontSize: '2em', float: 'left' }}>Add task:</label>
                    <div className="input-group">
                        <input type="text" id="taskInput" autoFocus className="form-control" placeholder="Write your task here" />
                        <button
                            onClick={() => {
                                var z = document.createElement('h3');
                                z.setAttribute('contentEditable', true);
                                z.setAttribute('class', 'border text-white bg-secondary rounded p-3');
                                z.innerHTML = document.getElementById("taskInput").value + "<button contentEditable = 'false' class= 'btn btn-danger' style = 'float:right' onclick = this.parentElement.style.display='none'><b>-</b></button>";
                                document.getElementById("parent").appendChild(z);
                            }}

                            className="input-group-append btn btn-success"
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                <div id="parent" className="text-center my-3">

                </div>
            </div>

        );

    }

}

export default AddTask;