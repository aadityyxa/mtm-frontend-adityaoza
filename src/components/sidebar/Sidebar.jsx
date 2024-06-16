import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import {mdiTrashCanOutline} from '@mdi/js';
import { useState } from 'react';
import './sidebar.css';
import {v4 as uuid} from 'uuid';



export default function Sidebar({trips, addTrip, removeTrip, selectTrip}) {

    const [showForm, setShowForm] = useState(false);
    const [destination, setDestination] = useState(""); 
    const [duration, setDuration] = useState(1);

    function toggleForm() {
        setShowForm(prevShowForm => !prevShowForm); 
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(destination == "") {
            setShowForm(false); 
            return;
        }
        const tasks = [];
        addTrip({destination, duration,tasks, id: uuid()})
        setShowForm(false);
    }

    function handleRemove(id) {
        console.log(id);
        removeTrip(id)
    }

    return(
            <div className="sidebar">
                <div className="sidebar-header">
                        <h2>Your Trips</h2>
                        <button onClick={toggleForm} className='add-trips-button'>+  Add Trip </button>
                        {showForm && 
                        <form onSubmit={handleSubmit} className='add-trip-form' >
                            <div className="form-item">
                                <label htmlFor="name">Destination</label>
                                <input type="text" name="name" id="name " value={destination} onChange={(e) => {setDestination(e.target.value)}}/>
                            </div>

                            <div className="form-item">
                                <label htmlFor="duration">Duration (in days) </label>
                                <input type="number" name="duration" id="duration" min='1' value={duration} onChange={(e) => {setDuration(e.target.value)}}/>
                            </div>

                            <button type='submit'>Submit</button>
                            
                        </form>}
                        
                </div>
                <div className="trip-list">
                    <ul>
                        {trips.map((trip) => {
                            return <li key={trip.id} className='trip-item'>
                                        <p onClick={() => {
                                            console.log(trip.id)
                                            selectTrip(trip.id)}}>{trip.destination}</p>
                                        <Icon path={mdiTrashCanOutline} size={1} onClick={() => {handleRemove(trip.id)}} />
                                    </li>
                        })}
                    </ul>
                </div>
            </div>
    )
}


Sidebar.propTypes = {
    trips:PropTypes.array,
    addTrip:PropTypes.func,
    removeTrip:PropTypes.func,
    selectTrip:PropTypes.func
}
