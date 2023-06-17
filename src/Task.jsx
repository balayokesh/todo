const Task = (props) => {

    const editTask = () => {
        // TODO: edit task
    }

    const toggleTaskStatus = event => {
        // TODO: task status toggling
        let elem = event.target
        console.log(elem);
    }

    return (
        <div className="d-flex align-items-center justify-content-between rounded bg-light text-dark p-2 mb-2">
            <span>{props.task.task}</span>
            <div className="ms-3 d-flex">
                <button onClick={editTask} className="btn btn-sm rounded bg-primary text-white me-1"><i className="bi bi-pencil-fill"></i></button>
                <button onClick={() => props.deleteTask(props.task.id)} className="btn btn-sm rounded bg-danger text-white"><i className="bi bi-trash-fill"></i></button>
                <button onClick={toggleTaskStatus} className="ms-1 btn btn-sm rounded bg-success text-white"><i className="bi bi-check-circle-fill"></i></button>
            </div>
        </div>
    )
}

export default Task;