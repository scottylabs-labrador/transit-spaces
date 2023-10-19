document.addEventListener("DOMContentLoaded", function() {
    const locationsStr = localStorage.getItem("locations")
    const locationsArray = locationsStr.split(",");
    const location1 = locationsArray[0]
    const location2 = locationsArray[1]
    const location3 = locationsArray[2]
    let result1 = document.getElementById('location1')
    result1.textContent = location1
    let result2 = document.getElementById('location2')
    result2.textContent = location2
    let result3 = document.getElementById('location3')
    result3.textContent = location3
});

