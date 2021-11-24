let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let phone = document.querySelector('#phone');
let addBtn = document.querySelector('#addBtn');
let table = document.querySelector('#table'); //table tag
let nameList = document.querySelector('#nameList');  // tbody tag
let alertBox = document.querySelector('#alert')


function Person(first, last, phone){
    this.id = Date.now()
    this.firstName = first;
    this.lastName = last;
    this.phone = phone;
}

// Local Storage
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

// add entries to table from input
let addToTable = () => {

    // check if it is not empty
    if(firstName.value === "" || lastName.value === "" || phone.value === "" ) {
        alertMessage('Please fill out', 'danger')

        } else if (addBtn.innerText === 'update'){

            updatePerson()
            addBtn.innerText = 'add'

        } else {

        // add person to the table
        addPerson();
        
        // get cursor in first name input field
        firstName.focus();
    }

    // clear input fields after each use
    inputClear();
}

let isStorageEmpty = () => {
    // return !!Storage.get("data").length
    return Storage.get("data")?.length ? false : true;
}

let addPerson = () => {
    const person = new Person(firstName.value, lastName.value, phone.value);
    
    let deleteIcon = '<i class="fas fa-trash text-center" onclick="deletePerson(event, '+person.id+')"></i>'
    let editIcon = '<i class="fas fa-edit text-center" onclick="selectPerson(event, '+person.id+')"></i>'

    // create tr tag
    let row = document.createElement('tr');

    // add input values inside td into tr
    row.innerHTML = `
        <td>${editIcon}</td>
        <td>${firstName.value}</td>
        <td>${lastName.value}</td>
        <td>${phone.value}</td>
        <td>${deleteIcon}</td>
    `
    // push the ready tr row into tbody
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

    // set data array to localStorage with the name "data"
    Storage.add("data", data)

    // alert pops up after addition
    alertMessage(' Added', 'success')
}


// clear input fields after addition
let inputClear = () => {
    firstName.value = "";
    lastName.value = "";
    phone.value = "";
}

// delete person on delete button
let deletePerson = (e, id) => {
    // delete from document
    e.target.parentElement.parentElement.remove()
    
    // filtering out the person and add the remaining to the Storage
    const data = Storage.get("data")
    let newData = data.filter(data => data.id != id)
    Storage.add("data", newData)

    alertMessage(' Deleted', 'warning')
}

let ind;
let row = document.getElementById('nameList').getElementsByTagName("tr");

// edit existing entry
let selectPerson = (e, id) => {
    if(addBtn.innerText === 'add') addBtn.innerText = 'update'
    
    // copy from localStorage
    const data = Storage.get("data")

    // pick the very person and put it in input fields
    let newData = data.filter(data => data.id === id)
    console.log(newData)
    firstName.value = newData[0].firstName
    lastName.value = newData[0].lastName
    phone.value = newData[0].phone
    
    // get the index of selected row
    for (let i = 0; i < row.length; i++) {
        row[i].onclick = function(){
            ind = this.rowIndex;
            console.log(ind)
        }
    }

}


let updatePerson = () => {
    const data = Storage.get("data")

    let targetPerson = data[ind-1]

    // update in Storage
    targetPerson.firstName = firstName.value
    targetPerson.lastName = lastName.value
    targetPerson.phone = phone.value

    // cut out the old person and add new one
    data.splice(ind-1, 1, targetPerson)
    Storage.add("data", data)

    // update in document
    row[ind-1].cells[1].innerHTML = firstName.value
    row[ind-1].cells[2].innerHTML = lastName.value
    row[ind-1].cells[3].innerHTML = phone.value

}

// 
let renderStorageToDocument = () => {
    

    if(isStorageEmpty()) return;
    
    let data = Storage.get('data')
    for(let user of data){
        
        let deleteIcon = '<i class="fas fa-trash text-center" onclick="deletePerson(event, '+user.id+')"></i>'
        let editIcon = '<i class="fas fa-edit text-center" onclick="selectPerson(event, '+user.id+')"></i>'
        
        // create tr tag
        let row = document.createElement('tr');
        
        // add input values inside td into tr
        row.innerHTML = `
        <td>${editIcon}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.phone}</td>
        <td>${deleteIcon}</td>
        `
        // push the ready tr row into tbody
        nameList.appendChild(row);
    }
}

// message alert
let alertMessage = (message, type) => {
    
    const span = `<span id="mess">${message}</span>`;
    // span.innerText = message
    alertBox.innerHTML = span
    alertBox.classList.add(`${type}`)
    let mess = document.getElementById("mess")

    // disappear and delete message
    setTimeout(() => {
        alertBox.classList.remove(`${type}`)
        alertBox.removeChild(mess)
    }, 1500);

}

// submit on enter
let addTextOnEnter = (e) => {
    if(e.keyCode === 13) addToTable();
}

// events
addBtn.addEventListener("click", addToTable);
this.addEventListener('load', renderStorageToDocument)
this.addEventListener('keyup', addTextOnEnter)


