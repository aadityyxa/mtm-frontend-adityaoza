import {v4 as uuid} from 'uuid';
import { useState } from 'react';
import './itinerary.css'; 
import PropTypes from 'prop-types'; 

export default function Itinerary({trips, selectedTripId, updateTrips}) {

    const [showForm, setShowForm] = useState(false)
    const [taskName, setTaskName] = useState(""); 

    function toggleForm() {
        setShowForm(prevShowForm => !prevShowForm)
    }

    const selectedTrip = trips.filter((trip) => { if(trip.id == selectedTripId) return trip}); 

    const days = selectedTrip[0].days;
    console.log(days); 

    const addTaskToDay = (tripId, dayId, newTask) => {
        const updatedTrips = trips.map(trip => {
            if (trip.id === tripId) {
                return {
                ...trip,
                days: trip.days.map(day => {
                    if (day.id === dayId) {
                        return {
                            ...day,
                            tasks: [...day.tasks, newTask] 
                        };
                    }
                return day;
            })
            };
      }
      return trip;
    });

    // Update the state with the modified trips array
    updateTrips(updatedTrips);
  };



    function handleSubmit(e) {
        e.preventDefault(); 
        addTaskToDay(taskName, uuid()); 
        setShowForm(false);

    }


    return(
        <div className="itinerary">
        <ul className='grid'>
            {days.map((day) => {
                return <li key={day.id} className='day-section'>
                            <div className="day-section-header">
                                <h4>Day {(days.indexOf(day)) + 1}</h4>
                                <button onClick={toggleForm} className='add-tasks-button'>+  Add Task </button>
                            </div>
                        {showForm && 
                        <form onSubmit={(e) => {handleSubmit(e, selectedTripId, day.id)}} className='add-task-form'>
                            <div className="form-item">
                                <label htmlFor="name">Task Name</label>
                                <input type="text" name="name" id="name" value={taskName} onChange={(e) => {setTaskName(e.target.value)}}/>
                            </div>

                            <button type='submit'>Submit</button>
                            
                        </form>}
                        </li>
            })}
        </ul>
        </div>

    )
}



Itinerary.propTypes = {
    trips: PropTypes.array,
    selectedTripId: PropTypes.string,
    updateTrips:PropTypes.func
}