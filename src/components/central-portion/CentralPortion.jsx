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
        // console.log(trip.id);
        console.log(trips);

        setTrips(newTripArray); 

    }


    function removeTrip(tripToRemoveId) {
        const newTripArray = trips; 

        const deletedArray = newTripArray.filter(trip=> trip.id !== tripToRemoveId); 

        setTrips(deletedArray)
    }

    function selectTrip(id) {
        console.log(id);
        setSelectedTripId(id);
    }




    return( 


            <div className="central-portion">

                <Sidebar trips={trips} addTrip={addTrip} removeTrip={removeTrip} selectTrip={selectTrip}/>

                {selectedTripId !== "" && <Itinerary trips={trips} selectedTripId={selectedTripId} updateTrips={setTrips} />}
            </div>
    )
}
