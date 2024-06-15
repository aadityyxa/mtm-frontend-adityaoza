import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Itinerary from "../itinerary-section/itinerary";
import './central-portion.css';

export default function CentralPortion() {

    const [trips, setTrips] = useState([]); 
    const [selectedTripId, setSelectedTripId] = useState(""); 

    function addTrip(trip) {
        const newTripArray = trips; 
        newTripArray.push(trip); 
        console.log(trips);
        setTrips(newTripArray); 

    }


    function removeTrip(tripToRemoveId) {
        const newTripArray = trips; 

        const deletedArray = newTripArray.filter(trip=> trip.id !== tripToRemoveId); 
        console.log(deletedArray); 

        setTrips(deletedArray)
        setSelectedTripId("");
    }

    function selectTrip(id) {
        console.log(id);
        setSelectedTripId(id);

    }

    function updateTrips(updatedTrip) {

        const newTripArray = trips.map((trip) => trip.id == updatedTrip.id ? updatedTrip : trip)

        setTrips(newTripArray); 
        console.log(trips);


        
    }




    return( 


            <div className="central-portion">

                <Sidebar trips={trips} addTrip={addTrip} removeTrip={removeTrip} selectTrip={selectTrip}/>

                <div className="itinerary-section">

                {selectedTripId !== "" && <Itinerary trips={trips} selectedTripId={selectedTripId} updateTasks={updateTrips} />}
            </div>

            </div>
    )
}
