import { useEffect, useState } from "react";
import axios from "axios";
import Task from "./task";
export default function Tasks({onSelectTask }) {
    const [tasks, setTasks] = useState([]);
    // const [searchingTask, setsearchingTask] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/tasks").then((res) => {
            setTasks(res.data)
        })
    });

    // function searchTask(value) {
    //     axios.get("http://127.0.0.1:5000/tasks"+{value}).then((res) => {
    //         setsearchingTask(res.data);
    //         console.log(res.data)
    //     })
    // }

    return (
        <>

        {/* <input type="search" placeholder="search task" onChange={(e)=>{searchTask(e.target.value)}}/> */}
            {
                tasks.map((task) => (
                    <Task
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        date={task.date}
                        finished={task.finished}
                        discription={task.discription}
                        difficulty={task.difficulty}
                        // props drilling ! send setSelectTask of useState
                        onSelectTask = {onSelectTask}
                    />
                ))
            }
        </>
    )
}