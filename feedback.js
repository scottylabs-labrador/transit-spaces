document.addEventListener("DOMContentLoaded", function() {
    const chosenLocation = localStorage.getItem("chosen location")
    let chosenLocationDisplay = document.getElementById('chosenLocationDisplay')
    chosenLocationDisplay.textContent = chosenLocation
});
