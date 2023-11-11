import React from 'react';
import { useNavigate } from 'react-router-dom';


function Preferences() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      const buildingStart = document.getElementById("building-start");
      const floor = document.getElementById("floor");
      const room = document.getElementById("room");
      const buildingEnd = document.getElementById("building-end");
      const space = document.getElementById("space-type");
      const busyness = document.getElementById("busyness");
      
      if (buildingStart.value.trim() !== "") {
        console.log("all required fields were filled");
        const locations = giveRecommendation(buildingStart, floor, room, buildingEnd, space, busyness);
        console.log(locations);
        localStorage.setItem("locations", JSON.stringify(locations));
        navigate('/recommendations');
      } else {
        console.log("some required fields were empty");
        alert("Please fill in the required fields");
      }
    };
  
    function giveRecommendation(buildingStart, floor, room, buildingEnd, space, busyness){
      return ["GHC F3 cafe cluster", "GHC F6 collaborative commons", "GHC F5 tables"];
    }

    return (
        <div>
          <h1 className="title">Input your preferences</h1>
          <p id='asterisk-instructions'>* Indicates required question</p>
          <h2 className="subtitle">Start location:</h2>
          <section className="starting-location">
            <form>
              <div className="form-group">
                <label htmlFor="building-start">Building<span className="red-asterisk">*</span></label>
                <select id="building-start" className="select-box" required>
                  <option value="" disabled selected>Select</option>
                  <option value="GHC">GHC</option>
                  <option value="CUC">CUC</option>
                </select>
              </div>
    
              <div className="form-group">
                <label htmlFor="floor">Floor</label>
                <select id="floor" className="select-box">
                  <option value="">Select</option>
                  <option value="F1">F1</option>
                  <option value="F2">F2</option>
                  <option value="F3">F3</option>
                </select>
              </div>
    
              <div className="form-group">
                <label htmlFor="room">Room</label>
                <select id="room" className="select-box">
                  <option value="">Select</option>
                  <option value="Rangos">Rangos</option>
                  <option value="McConomy">McConomy</option>
                </select>
              </div>
            </form>
          </section>
    
          <h2 className="subtitle">Destination options:</h2>
          <section className="destination-options">
            <form>
              <div className="form-group">
                <label htmlFor="building-end">Building</label>
                <select id="building-end" className="select-box">
                  <option value="">Select</option>
                  <option value="GHC">GHC</option>
                  <option value="CUC">CUC</option>
                </select>
              </div>
    
              <div className="form-group">
                <label htmlFor="space-type">Type of space</label>
                <select id="space-type" className="select-box">
                  <option value="">Select</option>
                  <option value="Single-study">Single study</option>
                  <option value="Group-study">Group study</option>
                  <option value="Eat">Eat</option>
                </select>
              </div>
    
              <div className="form-group">
                <label htmlFor="busyness">Busyness level</label>
                <select id="busyness" className="select-box">
                  <option value="">Select</option>
                  <option value="Complete">Completely empty</option>
                  <option value="Slightly">Slightly busy</option>
                  <option value="Moderately">Moderately busy</option>
                </select>
                <button id="submit-button" onClick={handleSubmit}>Submit</button>
                {/*Link is not used for the submit button because when clicked, it goes directly to the handleSubmit function*/}
                {/*Thus, we import useNavigate to switch to the Recommendations page within the handleSubmit function*/}
              </div>
              
            </form>
          </section>
        </div>
      );
    }
    
    export default Preferences;