
const success_message = document.querySelector('.success-message');
const error_message = document.querySelector('.error-message');
const employees_container = document.getElementById('employees-container');

const form = document.getElementById('form');

const employessArray = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = form.name;
    let profession = form.profession;
    let age = form.age;

    if(name.value == '' || profession.value == '' || age.value == '') {
        error_message.innerText = 'Error : Please Make sure All the fields are filled before adding in an employee !';
        success_message.innerHTML = null;
        return;
    }

    const newEmployee = new Employee(name.value, profession.value, age.value);
    newEmployee.createId();
    employessArray.push(newEmployee);

    name.value = '';
    profession.value = '';
    age.value = '';
    appendData(employessArray);
    
    success_message.innerText = 'Success : Employee Added!';
    error_message.innerHTML = null;
})

class Employee {
    constructor(name, profession, age) {
        this.name = name;
        this.profession = profession;
        this.age = age;
    }

    createId() {
        const employeeId = Date.now();
        this.id = employeeId;
    }
}


function appendData(data) {
    employees_container.innerHTML = null;

    data.forEach((employee, index) => {

        const mainDiv = document.createElement('div');
        mainDiv.className = 'employee-div';

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'employee-details-div';

        const id = document.createElement('p');
        id.innerText = `Id : ${employee.id}`;
        
        const name = document.createElement('p');
        name.innerText = `Name : ${employee.name}`;
        
        const profession = document.createElement('p');
        profession.innerText = `Profession : ${employee.profession}`;
        
        const age = document.createElement('p');
        age.innerText = `Age : ${employee.age}`;

        detailsDiv.append(id, name, profession, age);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete User';
        deleteBtn.className = 'employee-delete-button';
        deleteBtn.onclick = () => {
            delete_user(index);
        }

        mainDiv.append(detailsDiv, deleteBtn);

        employees_container.append(mainDiv);
    });
}


function delete_user(index) {
    employessArray.splice(index, 1);
    appendData(employessArray);
}