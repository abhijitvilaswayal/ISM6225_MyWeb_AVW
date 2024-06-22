let boats = [];
let editingBoatIndex = -1;

function validateForm() {
    const boatName = document.getElementById('boatName').value;
    const boatType = document.getElementById('boatType').value;
    const boatPrice = document.getElementById('boatPrice').value;
    const boatDays = document.getElementById('boatDays').value;
    const saleDate = document.getElementById('saleDate').value;
    const boatLocation = document.getElementById('boatLocation').value;

    if (!boatName || !boatType || !boatPrice || !boatDays || !saleDate || !boatLocation) {
        alert('All fields must be filled out');
        return false;
    }
    return true;
}

function createBoat() {
    if (!validateForm()) return;

    const boatName = document.getElementById('boatName').value;
    const boatType = document.getElementById('boatType').value;
    const boatPrice = document.getElementById('boatPrice').value;
    const boatDays = document.getElementById('boatDays').value;
    const saleDate = document.getElementById('saleDate').value;
    const boatLocation = document.getElementById('boatLocation').value;

    const newBoat = { boatName, boatType, boatPrice, boatDays, saleDate, boatLocation };

    if (editingBoatIndex >= 0) {
        boats[editingBoatIndex] = newBoat;
        editingBoatIndex = -1;
    } else {
        boats.push(newBoat);
    }

    document.getElementById('boatForm').reset();
    localStorage.setItem('boats', JSON.stringify(boats));
    readBoats();
}

function readBoats() {
    boats = JSON.parse(localStorage.getItem('boats')) || [];
    const boatsList = document.getElementById('boatsList');
    boatsList.innerHTML = '<table><tr><th>Boat Name</th><th>Boat Type</th><th>Price</th><th>Number of Days</th><th>Sale Date</th><th>Location</th><th>Actions</th></tr></table>';
    const table = boatsList.querySelector('table');

    boats.forEach((boat, index) => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${boat.boatName}</td>
            <td>${boat.boatType}</td>
            <td>${boat.boatPrice}</td>
            <td>${boat.boatDays}</td>
            <td>${boat.saleDate}</td>
            <td>${boat.boatLocation}</td>
            <td>
                <span class="edit-btn" onclick="editBoat(${index})">Edit</span> | 
                <span class="delete-btn" onclick="deleteBoat(${index})">Delete</span>
            </td>
        `;
    });
}

function editBoat(index) {
    const boat = boats[index];
    document.getElementById('boatName').value = boat.boatName;
    document.getElementById('boatType').value = boat.boatType;
    document.getElementById('boatPrice').value = boat.boatPrice;
    document.getElementById('boatDays').value = boat.boatDays;
    document.getElementById('saleDate').value = boat.saleDate;
    document.getElementById('boatLocation').value = boat.boatLocation;
    editingBoatIndex = index;
}

function updateBoat() {
    if (!validateForm() || editingBoatIndex < 0) return;

    const boatName = document.getElementById('boatName').value;
    const boatType = document.getElementById('boatType').value;
    const boatPrice = document.getElementById('boatPrice').value;
    const boatDays = document.getElementById('boatDays').value;
    const saleDate = document.getElementById('saleDate').value;
    const boatLocation = document.getElementById('boatLocation').value;

    boats[editingBoatIndex] = { boatName, boatType, boatPrice, boatDays, saleDate, boatLocation };
    editingBoatIndex = -1;

    document.getElementById('boatForm').reset();
    localStorage.setItem('boats', JSON.stringify(boats));
    readBoats();
}

function deleteBoat(index) {
    boats.splice(index, 1);
    localStorage.setItem('boats', JSON.stringify(boats));
    readBoats();
}

window.onload = function() {
    readBoats();
};
