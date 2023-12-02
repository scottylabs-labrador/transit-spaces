import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Preferences() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [selectedTimeRequirement, setSelectedTimeRequirement] = useState(0);

  useEffect(() => {
    axios({
      url: "https://cmu-seats.onrender.com/getBuildings",
      method: "GET",
    })
      .then((res) => {
        setBuildings(res.data);
        setSelectedBuilding(res.data[0].id)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedBuilding !== "") {
      const recommendedSeats = await getRecommendation();
      localStorage.setItem(
        "recommendedSeats",
        JSON.stringify(recommendedSeats)
      );
      navigate("/recommendations");
    } else {
      alert("Please fill in the required fields");
    }
  };

  const getRecommendation = async () => {
    setIsLoading(true);

    localStorage.setItem("selectedBuilding", selectedBuilding);
    localStorage.setItem("selectedFloor", selectedFloor.toString());
    localStorage.setItem("selectedCapacity", selectedCapacity.toString());
    localStorage.setItem(
      "selectedTimeRequirement",
      selectedTimeRequirement.toString()
    );
    const res = await axios({
      url: "https://cmu-seats.onrender.com/getRecommendation",
      method: "POST",
      data: {
        buildingId: selectedBuilding,
        floor: selectedFloor,
        capacity: selectedCapacity,
        timeRequirement: selectedTimeRequirement,
      },
    }).catch((err) => {
      console.log(err);
    });
    if (res) return [res.data];
    return [];
  };

  const getBuildings = () => {
    return buildings.map((building, i) => {
      return (
        <option value={building.id} key={i}>
          {building.name}
        </option>
      );
    });
  };

  const getFloors = () => {
    const building = buildings.find((b) => b.id === selectedBuilding);
    if (building) {
      return building.floors.map((floor, i) => {
        return (
          <option value={floor} key={i}>
            {floor}
          </option>
        );
      });
    }
  };

  const getCapacities = () => {
    return [1, 2, 3, 4].map((capacity, i) => {
      return (
        <option value={capacity} key={i}>
          {capacity}
        </option>
      );
    });
  };

  const getTimeRequirements = () => {
    return [
      <option value={10} key={1}>
        10min
      </option>,
      <option value={20} key={2}>
        20min
      </option>,
      <option value={30} key={3}>
        30min
      </option>,
      <option value={60} key={4}>
        1h
      </option>,
    ];
  };

  return (
    <div>
      <h1 className="title">Input your preferences</h1>
      <p id="asterisk-instructions">* Indicates required question</p>
      <form>
        <div className="form-group">
          <label htmlFor="building">
            Building<span className="red-asterisk">*</span>
          </label>
          <select
            id="building"
            className="select-box"
            required
            onChange={(e) => {
              setSelectedBuilding(e.target.value);
              setSelectedFloor(0);
            }}
          >
            <option value="" disabled>
              Select
            </option>
            {getBuildings()}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="floor">Floor</label>
          <select
            id="floor"
            className="select-box"
            onChange={(e) => {
              setSelectedFloor(parseInt(e.target.value));
            }}
            value={selectedFloor}
          >
            <option value={0}>Select</option>
            {getFloors()}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <select
            id="capacity"
            className="select-box"
            onChange={(e) => {
              setSelectedCapacity(parseInt(e.target.value));
            }}
          >
            <option value="">Select</option>
            {getCapacities()}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time-requirement">Time Requirement</label>
          <select
            id="time-requirement"
            className="select-box"
            onChange={(e) => {
              setSelectedTimeRequirement(parseInt(e.target.value));
            }}
          >
            <option value="">Select</option>
            {getTimeRequirements()}
          </select>
        </div>
        <div className="form-group">
          <button
            id="submit-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
          {/*Link is not used for the submit button because when clicked, it goes directly to the handleSubmit function*/}
          {/*Thus, we import useNavigate to switch to the Recommendations page within the handleSubmit function*/}
        </div>
      </form>
    </div>
  );
}

export default Preferences;
