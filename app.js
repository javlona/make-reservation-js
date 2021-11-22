let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let phone = document.querySelector('#phone');
let addBtn = document.querySelector('#addBtn');
let reservationTable = document.querySelector('#reservationTable'); //table tag
let nameList = document.querySelector('#nameList');  // tbody tag
let deleteIcon = '<i class="fas fa-trash text-center" onclick="deletePerson(event)"></i>'
let editIcon = '<i class="fas fa-edit text-center" onclick="updatePerson(event)"></i>'
let alertBox = document.querySelector('#alert')

function Person(first, last, phone){
    this.firstName = first;
    this.LastName = last;
    this.phone = phone;
}

let addToTable = () => {

    // check if it is not empty
    if(firstName.value === "" || lastName.value === "" || phone.value === "" ) {
        alertMessage('Please fill out', 'danger')
        } else {
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

    const person = new Person(firstName.value, lastName.value, phone.value);
    console.log(person);

    alertMessage(' Added', 'success')
}


//clear input fields after addition
let inputClear = () => {
    firstName.value = "";
    lastName.value = "";
    phone.value = "";
}

//delete person on delete button
let deletePerson = (e) => {
    e.target.parentElement.parentElement.remove()
    alertMessage(' Deleted', 'warning')
}
//edit existing entry
let updatePerson = (e) => {
    
    deletePerson(e) //first deletes the entry
    addPerson() // then adds from input
    inputClear() // clears the input field
    alertMessage(' Updated', 'success') // and gives alert
}

// message
let alertMessage = (message, type) => {
    
    const p = document.createElement('span');
    p.innerText = message
    alertBox.appendChild(p)
    // alertBox.innerText = `${message}`
    alertBox.classList.add(`${type}`)

    setTimeout(() => {
        alertBox.classList.remove(`${type}`)
        alertBox.removeChild(p)
    }, 1500);

}


addBtn.addEventListener("click", addToTable);
