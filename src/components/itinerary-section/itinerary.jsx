import {v4 as uuid} from 'uuid';
import { useState } from 'react';
import './itinerary.css'; 
import PropTypes from 'prop-types'; 

export default function Itinerary({trips, selectedTripId, updateTasks}) {

    const [showForm, setShowForm] = useState(false)
    const [taskName, setTaskName] = useState(""); 
    const [showEditForm, setShowEditForm] = useState(false); 

    function toggleForm() {
        setShowForm(prevShowForm => !prevShowForm)
    }

    function toggleEditForm() {
        setShowEditForm(prevShowEditForm => !prevShowEditForm)
    }

    const selectedTrip = trips.find((trip) => { if(trip.id == selectedTripId) return trip}); 
    
    const duration = selectedTrip.duration;
    const destination = selectedTrip.destination;

    function addTask(selectedTripId, task ) {

        selectedTrip.tasks.push({taskTitle: task, id:uuid()});

        updateTasks(selectedTrip)
    }

    function handleSubmit(e) {
        e.preventDefault(); 

        if(taskName == "") {
            setShowForm(false); 
            return;
        }
        
        addTask(selectedTripId, taskName)
        setShowForm(false);

    }

    function handleEdit(e, id) {
        e.preventDefault(); 

        if(taskName == "") {
            setShowEditForm(false); 
            return;
        }

        const newTask = {taskTitle:taskName, id: id}
        console.log(newTask);

        const newTaskArray = selectedTrip.tasks.map((task) => task.id === id ? newTask : task);
        selectedTrip.tasks = newTaskArray;
        console.log(selectedTrip); 
        updateTasks(selectedTrip); 
        setShowEditForm(false);


    }

    function handleDelete(id) {
        
        const newTaskArray = selectedTrip.tasks.filter((task) => task.id !== id);   
        selectedTrip.tasks = newTaskArray; 
        updateTasks(selectedTrip); 

    }


    return(
        <>
            <div className="grid-header">
                                <h3>{duration} Day {destination} Trip </h3>
                                <button onClick={toggleForm} className='add-tasks-button'>+  Add Task </button>
            </div>
                        {showForm && 
                        <form onSubmit={(e) => {handleSubmit(e, selectedTripId,)}} className='add-task-form'>
                            <div className="form-item">
                                <label htmlFor="name">Task:</label>
                                <input type="text" name="name" id="name" value={taskName} onChange={(e) => {setTaskName(e.target.value)}}/>
                            </div>

                            <button type='submit'>Submit</button>
                            
                        </form>}
                    
            <ul className='grid'>
                {selectedTrip.tasks.length > 0 && selectedTrip.tasks.map((task) => {
                    return <li key={task.id} className='task-card'>
                                <h3>{task.taskTitle}</h3>
                                <button className="task-button" onClick={toggleEditForm}>Edit Task</button>

                                {
                                    showEditForm && 
                                    <form onSubmit={(e) => {handleEdit(e, task.id)}} className='edit-task-form'>
                                        <div className="form-item">
                                            <label htmlFor="name">Edit Task:</label>
                                            <input type="text" name="name" id="name" value={taskName} onChange={(e) => {setTaskName(e.target.value)}}/>
                                        </div>

                                        <button type='submit'>Submit</button>
                            
                                    </form>
                                }
                                <button className="task-button" onClick={() => handleDelete(task.id)}>Delete Task</button>
                            </li>
                })}
            </ul>

        </>

    )
}



Itinerary.propTypes = {
    trips: PropTypes.array,
    selectedTripId: PropTypes.string,
    updateTasks:PropTypes.func
}
