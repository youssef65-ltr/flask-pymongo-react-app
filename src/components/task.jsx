import '../styles/task.css'
import axios from 'axios'
import { useState } from 'react';

export default function Task({ id, title, date, finished, discription, difficulty , onSelectTask }) {
    const [finish, setFinish] = useState(finished)
    function FinishTask(checked) {
        finish ? setFinish(false) : setFinish(true);
        axios.put(`http://127.0.0.1:5000/tasks/${id}`, { finished: checked })
            .then(() => console.log('PUT success', id))
            .catch(err => console.error('PUT error', err));
    }

    function deleteTask() {
        if (window.confirm("are you sure to delete this task ?")) {
            axios.delete(`http://127.0.0.1:5000/tasks/${id}`)
        }
    }
    function updateTask() {
        onSelectTask({id : id , title : title , discription : discription , difficulty : difficulty , finished : finished})
    }
    return (
        <div className="task" style={{
            backgroundColor: finish ? "#ffffffbd" : "#fff"
        }}>
            <div className="task-checkbox">
                <input type="checkbox" name="" checked={finish} onChange={(e) => { FinishTask(e.target.checked) }} />
            </div>
            <div className="task-data">
                <div className="task-TDD">
                    <div className='task-title' >{title}</div>
                    <div className='task-date'>{date}</div>
                    <div className='task-difficulty' style={{
                        backgroundColor: difficulty == "easy" ? "#2dab71ff" : difficulty == "medium" ? "#f9cc46ff" : "#e35260ff"
                    }}>{difficulty}</div>
                </div>
                <div className='buttons-with-discription'>
                    <div className="task-discription">{discription}</div>
                    <div className='buttons'>
                        <button><i className="bi bi-trash3 delete" onClick={deleteTask}></i></button>
                        <button><i className="bi bi-pencil-square update" onClick={updateTask}></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}