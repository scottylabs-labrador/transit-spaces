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

    setIsLoading(true);

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
        <img className="object-contain rounded-t-lg" src={`../.netlify/images?url=/seat-imgs/${chosenSeat.photo}&w=600`} alt=""/>
        <div className="p-5">
          <p className="mb-2 my-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{chosenSeat.name}</p>
          {isLoading ? (
            <button disabled type="button"
              className="w-full justify-center my-4 text-lg text-white disabled:bg-red-200 bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-4 text-center inline-flex items-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
              </svg>
              Loading...
            </button>
          ) : (
            <button
              id="submit-button"
              onClick={handleNoClick}
              className="w-full justify-center my-4 text-lg text-white disabled:bg-red-200 bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-4 text-center inline-flex items-center">
              Give me another recommendation
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </button>
          )
          }
        </div>
      </div>
    </div>
  );
}

export default Feedback;
