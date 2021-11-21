let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let phone = document.querySelector('#phone');
let mkReserveBtn = document.querySelector('#mkReserveBtn');
let reservationTable = document.querySelector('#reservationTable'); //table tag
let nameList = document.querySelector('#nameList');  // tbody tag
let deleteIcon = '<i class="fas fa-trash text-center"></i>'
let editIcon = '<i class="fas fa-edit text-center"></i>'

let addToTable = () => {
    
    if(firstName.value != null && firstName.value != "") {
        //add person to the table
        addPerson();

        //clear input fields after each use
        inputClear();

        //get cursor in first name input field
        firstName.focus();
    }
}

let addPerson = () => {

    let row = document.createElement('tr');

    row.innerHTML = `
        <td>${editIcon}</td>
        <td>${firstName.value}</td>
        <td>${lastName.value}</td>
        <td>${phone.value}</td>
        <td>${deleteIcon}</td>

    `
    
    nameList.appendChild(row);
}

let inputClear = () => {
    firstName.value = "";
    lastName.value = "";
    phone.value = "";
}



mkReserveBtn.addEventListener("click", addToTable)