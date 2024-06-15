import {v4 as uuid} from 'uuid';
import { useState } from 'react';
import './itinerary.css'; 
import PropTypes from 'prop-types'; 

export default function Itinerary({trips, selectedTripId, updateTasks}) {

    const [showForm, setShowForm] = useState(false)
    const [taskName, setTaskName] = useState(""); 
    // const [showEditFrom, setShowEditForm] = useState(false); 

    function toggleForm() {
        setShowForm(prevShowForm => !prevShowForm)
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
        addTask(selectedTripId, taskName)
        setShowForm(false);

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
                                <button className="task-button">Edit Task</button>
                                <button className="task-button">Delete Task</button>
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