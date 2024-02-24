import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feedback() {
  const [chosenSeat, setChosenSeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedChosenSeat = JSON.parse(localStorage.getItem("chosenSeat"));
    if (!storedChosenSeat) navigate("/");
    setChosenSeat(storedChosenSeat);
  }, [navigate]);

  const handleNoClick = () => {
    const selectedBuilding = localStorage.getItem("selectedBuilding");
    const selectedFloor = parseInt(localStorage.getItem("selectedFloor"));
    const selectedCapacity = parseInt(localStorage.getItem("selectedCapacity"));
    const selectedTimeRequirement = parseInt(
      localStorage.getItem("selectedTimeRequirement")
    );

    axios({
      url: "https://transit-spaces-hcgbrvfnma-ul.a.run.app/updateAvailability",
      method: "PUT",
      data: {
        seatId: chosenSeat.id,
        wasAvailable: false,
      },
    })
      .then(() => {
        axios({
          url: "https://transit-spaces-hcgbrvfnma-ul.a.run.app/getRecommendation",
          method: "POST",
          data: {
            buildingId: selectedBuilding,
            floor: selectedFloor,
            capacity: selectedCapacity,
            timeRequirement: selectedTimeRequirement,
          },
        })
          .then((res) => {
            setChosenSeat(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center my-10">
      <div className="max-w-lg bg-white mx-4 my-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={`../seat-imgs/${chosenSeat.photo}`} alt=""/>
        <div className="p-5">
          <p className="mb-2 my-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{chosenSeat.name}</p>
          <button
            id="submit-button"
            onClick={handleNoClick}
            className="w-full justify-center my-4 text-lg text-white disabled:bg-gray-700 bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-4 text-center inline-flex items-center">
            Give me another recommendation
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Feedback;
