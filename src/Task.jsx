const Task = (props) => {

    const editTask = () => {
        // TODO: edit task
    }

    return (
        <div className="d-flex align-items-center justify-content-between rounded bg-light text-dark p-2 mb-2">
            {
                props.task.isFinished
                    ?
                    <s className="text-secondary">{props.task.task}</s>
                    :
                    <span>{props.task.task}</span>
            }

            <div className="ms-3 d-flex">
                <button onClick={editTask} className="btn btn-sm rounded bg-primary text-white me-1" title="Edit"><i className="bi bi-pencil-fill"></i></button>
                <button onClick={() => props.deleteTask(props.task.id)} className="btn btn-sm rounded bg-danger text-white" title="Delete"><i className="bi bi-trash-fill"></i></button>
                {
                    props.task.isFinished
                        ?
                        <button onClick={() => props.markAsIncomplete(props.task.id)} className="ms-1 btn btn-sm rounded bg-warning text-white" title="Mark as incomplete"><i className="bi bi-x-circle-fill"></i></button>
                        :
                        <button onClick={() => props.markAsDone(props.task.id)} className="ms-1 btn btn-sm rounded bg-success text-white" title="Mark as complete"><i className="bi bi-check-circle-fill"></i></button>
                }
            </div>
        </div>
    )
}

export default Task;