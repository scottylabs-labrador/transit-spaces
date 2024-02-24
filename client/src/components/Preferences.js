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
      url: "https://transit-spaces-hcgbrvfnma-ul.a.run.app/getBuildings",
      method: "GET",
    })
      .then((res) => {
        setBuildings(res.data);
        setSelectedBuilding(res.data[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedBuilding !== "") {
      const recommendedSeats = await getRecommendation();
      localStorage.setItem("chosenSeat", JSON.stringify(recommendedSeats[0]));
      console.log(recommendedSeats);
      navigate("/feedback");
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
      url: "https://transit-spaces-hcgbrvfnma-ul.a.run.app/getRecommendation",
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
        <option value={building.id} key={i} selected>
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
      <option value={30} key={1}>
        30min
      </option>,
      <option value={60} key={2}>
        1h
      </option>,
      <option value={120} key={3}>
        2h
      </option>,
      <option value={180} key={4}>
        3h
      </option>,
    ];
  };

  return (
    <form className="max-w-sm mx-auto my-10">
      <div className="mb-5">
        <label htmlFor="building" className="block mb-2 text-lg font-medium text-gray-900">
          Building<span className="text-red-500">*</span>
        </label>
        <select
          id="building"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200 disabled:cursor-not-allowed"
          required
          disabled
        >
          <option value="" disabled>Select</option>
          {getBuildings()}
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="floor" className="block mb-2 text-lg font-medium text-gray-900">
          Floor<span className="text-red-500">*</span>
        </label>
        <select
          id="floor"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          onChange={(e) => {
            setSelectedFloor(parseInt(e.target.value));
          }}
          value={selectedFloor}
        >
          <option value={0}>Select</option>
          {getFloors()}
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="capacity" className="block mb-2 text-lg font-medium text-gray-900">
          Capacity<span className="text-red-500">*</span>
        </label>
        <select
          id="capacity"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          onChange={(e) => {
            setSelectedCapacity(parseInt(e.target.value));
          }}
        >
          <option value="">Select</option>
          {getCapacities()}
        </select>
      </div>
      <div className="mb-5">
        <label htmlFor="time-requirement" className="block mb-2 text-lg font-medium text-gray-900">
          Time Requirement<span className="text-red-500">*</span>
        </label>
        <select
          id="time-requirement"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          onChange={(e) => {
            setSelectedTimeRequirement(parseInt(e.target.value));
          }}
        >
          <option value="">Select</option>
          {getTimeRequirements()}
        </select>
      </div>
      <div className="form-group py-6">
        <button
          id="submit-button"
          onClick={handleSubmit}
          disabled={isLoading || selectedFloor === 0 || selectedCapacity === 0 || selectedTimeRequirement === 0}
          className="w-full justify-center text-lg text-white disabled:bg-gray-300 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-4 text-center inline-flex items-center">
          Find me a seat
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </button>
      </div>
    </form>
  );
}

export default Preferences;
