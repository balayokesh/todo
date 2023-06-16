const Task = (props) => {

    const editTask = () => {
        // TODO: edit task
    }

    const deleteTask = () => {
        // TODO: delete task
    }

    const toggleTaskStatus = () => {
        // TODO: task status toggling
    }

    return (
        <div className="d-flex align-items-center justify-content-between rounded bg-light text-dark p-2 mb-2">
            {props.task}
            <div className="ms-3 d-flex">
                <button onClick={editTask} className="btn btn-sm rounded bg-primary text-white me-1"><i class="bi bi-pencil-fill"></i></button>
                <button onClick={deleteTask} className="btn btn-sm rounded bg-danger text-white"><i class="bi bi-trash-fill"></i></button>
                <button onClick={toggleTaskStatus} className="ms-1 btn btn-sm rounded bg-success text-white"><i class="bi bi-check-circle-fill"></i></button>
            </div>
        </div>
    )
}

export default Task;