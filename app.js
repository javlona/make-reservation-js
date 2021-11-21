let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let phone = document.querySelector('#phone');
let mkReserveBtn = document.querySelector('#mkReserveBtn');
let reservationTable = document.querySelector('#reservationTable'); //table tag
let nameList = document.querySelector('#nameList');  // tbody tag
let deleteIcon = '<i class="fas fa-trash text-center" onclick="deletePerson(event)"></i>'
let editIcon = '<i class="fas fa-edit text-center"></i>'

function Person(first, last, phone){
    this.firstName = first;
    this.LastName = last;
    this.phone = phone;
}

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
    //create tr tag
    let row = document.createElement('tr');

    //add input values inside td into tr
    row.innerHTML = `
        <td>${editIcon}</td>
        <td>${firstName.value}</td>
        <td>${lastName.value}</td>
        <td>${phone.value}</td>
        <td>${deleteIcon}</td>
    `
    //push the ready tr row into tbody
    nameList.appendChild(row);

    const person1 = new Person(firstName.value, lastName.value, phone.value);
    console.log(person1);
}

//clear input fields after addition
let inputClear = () => {
    firstName.value = "";
    lastName.value = "";
    phone.value = "";
}

//delete person on delete button
let deletePerson = (e) => e.target.parentElement.parentElement.remove()


mkReserveBtn.addEventListener("click", addToTable);
