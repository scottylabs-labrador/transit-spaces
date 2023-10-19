document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("submit-button");
    const buildingStart = document.getElementById("building-start");
    const floor = document.getElementById("floor");
    const room = document.getElementById("room");
    const buildingEnd = document.getElementById("building-end");
    const space = document.getElementById("space-type");
    const busyness = document.getElementById("busyness");
    button.addEventListener("click", function(event) {
        event.preventDefault();
        if (buildingStart.value.trim() !== "") {
            console.log("all required fields were filled")
            const locations = giveRecommendation(buildingStart, floor, room, buildingEnd, space, busyness);
            console.log(locations)
            localStorage.setItem("locations", locations)
            window.location.href = "recommendations.html";
        } else {
            console.log("some required fields were empty")
            alert("Please fill in the required fields");
        }
    });
});



function giveRecommendation(buildingStart, floor, room, buildingEnd, space, busyness){
    return ["GHC F3 cafe cluster", "GHC F6 collaborative commons", "GHC F5 tables"]
}


