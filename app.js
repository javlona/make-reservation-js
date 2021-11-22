let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let phone = document.querySelector('#phone');
let addBtn = document.querySelector('#addBtn');
let reservationTable = document.querySelector('#reservationTable'); //table tag
let nameList = document.querySelector('#nameList');  // tbody tag
let alertBox = document.querySelector('#alert')

function Person(first, last, phone){
    this.id = Date.now()
    this.firstName = first;
    this.lastName = last;
    this.phone = phone;
}

//Local Storage
let Storage = {

    get: function(key){
        return JSON.parse(localStorage.getItem(key))
    },

    add: function(key, value){
        return localStorage.setItem(key, JSON.stringify(value))
    },

    delete: function(key){
        localStorage.removeItem(key)
    }
}

//add entries to table from input
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

let isStorageEmpty = () => {
    //return !!Storage.get("data").length
    return Storage.get("data")?.length ? false : true;
}

let addPerson = () => {
    const person = new Person(firstName.value, lastName.value, phone.value);
    
    let deleteIcon = '<i class="fas fa-trash text-center" onclick="deletePerson(event, '+person.id+')"></i>'
    let editIcon = '<i class="fas fa-edit text-center" onclick="updatePerson(event, '+person.id+')"></i>'

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


    let data = [];

    // if empty push new person
    if(isStorageEmpty()){
        data.push(person)
        
    // if not empty push person to the existing data
    } else {
        let oldData = Storage.get('data')
        data = [...oldData, person]
    }

    //set data array to localStorage with the name "data"
    Storage.add("data", data)

    // alert pops up after addition
    alertMessage(' Added', 'success')
}


//clear input fields after addition
let inputClear = () => {
    firstName.value = "";
    lastName.value = "";
    phone.value = "";
}

//delete person on delete button
let deletePerson = (e, id) => {
    //delete from document
    e.target.parentElement.parentElement.remove()
    
    // delete from localStorage
    const data = Storage.get("data")
    let newData = data.filter(data => data.id != id)

    Storage.add("data", newData)
    //console.log(data,id)

    alertMessage(' Deleted', 'warning')
}

//edit existing entry
let updatePerson = (e, id) => {
    console.log(id)
    const data = Storage.get("data")
    let newData = data.filter(data => data.id === id)
    firstName.value = newData[0].firstName
    lastName.value = newData[0].lastName
    phone.value = newData[0].phone
    // deletePerson(e) //first deletes the entry
    // addPerson() // then adds from input
    // inputClear() // clears the input field
    // alertMessage(' Updated', 'success') // and gives alert

}

// message alert
let alertMessage = (message, type) => {
    
    const span = `<span id="mess">${message}</span>`;
    // span.innerText = message
    alertBox.innerHTML = span
    alertBox.classList.add(`${type}`)
    let mess = document.getElementById("mess")

    //disappear and delete message
    setTimeout(() => {
        alertBox.classList.remove(`${type}`)
        alertBox.removeChild(mess)
    }, 1500);

}

let renderStorageToDocument = () => {
    if(isStorageEmpty()) return;
    
    let data = Storage.get('data')
    for(let user of data){
        
        let deleteIcon = '<i class="fas fa-trash text-center" onclick="deletePerson(event, '+user.id+')"></i>'
        let editIcon = '<i class="fas fa-edit text-center" onclick="updatePerson(event, '+user.id+')"></i>'
        
        //create tr tag
        let row = document.createElement('tr');
        
        //add input values inside td into tr
        row.innerHTML = `
        <td>${editIcon}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.phone}</td>
        <td>${deleteIcon}</td>
        `
        //push the ready tr row into tbody
        nameList.appendChild(row);
    }
}


addBtn.addEventListener("click", addToTable);
this.addEventListener('load', renderStorageToDocument)
