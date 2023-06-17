import { useState } from "react";

const Task = (props) => {

    const [task, setTask] = useState(props.task.task);

    const editTask = () => {
        // TODO: edit task
    }

    return (
        <div className="d-flex align-items-center justify-content-between rounded p-2 mb-2 bg-dark border-bottom">
            {
                props.task.isFinished
                    ?
                    <s className="text-secondary">{props.task.task}</s>
                    :
                    <span>{task}</span>
            }

            <div className="ms-3 d-flex">
                <button onClick={editTask} className="btn btn-sm rounded bg-primary text-white mr-1" title="Edit" data-toggle="modal" data-target={"#editTaskModal" + props.task.id}>
                    <i className="bi bi-pencil-fill"></i>
                </button>
                <button onClick={() => props.deleteTask(props.task.id)} className="btn btn-sm rounded bg-danger text-white" title="Delete"><i className="bi bi-trash-fill"></i></button>
                {
                    props.task.isFinished
                        ?
                        <button onClick={() => props.markAsIncomplete(props.task.id)} className="ml-1 btn btn-sm rounded bg-warning text-white" title="Mark as incomplete"><i className="bi bi-x-circle-fill"></i></button>
                        :
                        <button onClick={() => props.markAsDone(props.task.id)} className="ml-1 btn btn-sm rounded bg-success text-white" title="Mark as complete"><i className="bi bi-check-circle-fill"></i></button>
                }
            </div>

            {/* Bootstrap modal - hidden by default */}
            <div className="modal fade" id={"editTaskModal" + props.task.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header text-dark">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input value={task} onChange={(e) => setTask(e.target.value)} className="form-control" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => props.saveTaskChanges(props.task.id, task)} data-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task;