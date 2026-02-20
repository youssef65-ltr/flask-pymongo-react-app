import { useState } from 'react'
import './App.css'
import FormTask from './components/form_task'
import Tasks from './components/tasks'
function App() {

  const [selectedTask , setSelectedTask] = useState()
  return (
    <>
      <FormTask selectedTask={selectedTask}/>
      <Tasks onSelectTask ={setSelectedTask}/>
    </>
  )
}

export default App
