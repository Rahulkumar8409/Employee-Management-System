const employees = {};

const modeltogglebtn = document.getElementById("model-toggle-btn");
const model = document.getElementById("model");
const closeicon = document.getElementById("close-icon");
const form = document.getElementById("form");
const tableBody = document
  .getElementById("Employee-List")
  .getElementsByTagName("tbody")[0];

let inc = 1;
function formId() {
  return inc++;
}

function toggleMode() {
  model.classList.toggle("hide-model");
  model.classList.toggle("show-model");
}

function deleteRecord(e) {
  // parentNode of deleteButton is => td => td.parentNode => tr
  const deleteButton = e.target;
  const td = deleteButton.parentNode; // td element
  const tr = td.parentNode; // table row
  tr.remove(); // <button class="material-icons">delete</button>
}

function createNewEmployeeRecored(employee) {
  const record = document.createElement("tr");
  record.id = employee.id;
  for (let key in employee) {
    const cell = document.createElement("td");
    cell.innerText = employee[key];
    record.appendChild(cell);
  }

  const option = document.createElement("td");

  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.className = "material-icon";
  editButton.addEventListener("click", editRecord);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";
  deleteButton.className = "material-icon";
  deleteButton.addEventListener("click", deleteRecord);

  option.append(editButton, deleteButton);
  record.appendChild(option);
  tableBody.appendChild(record);

  tableBody.appendChild(record);
}

modeltogglebtn.addEventListener("click", toggleMode);
closeicon.addEventListener("click", toggleMode);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const employee = {
    name: form.fullName.value,
    email: form.email.value,
    id: formId(),
    role: form.role.value,
    doj: form.doj.value,
    gender: form.gender.value,
  };
  employees[employee.id] = employee;
  createNewEmployeeRecored(employee);
 
  form.reset();
  toggleMode();
});

const model1 = document.getElementById("model1");
const updateForm=document.getElementById("form1");
let editingEmployee=null;
function toggleUpdateModel() {
  model1.classList.toggle("hide-model");
  model1.classList.toggle("show-model");
}

function preFilData(employee) {
  for (let i in employee) {
    updateForm[i] && (updateForm[i].value=employee[i])
  }
}

function editRecord(e) {
  const empId = e.target.parentNode.parentNode.id;
editingEmployee=empId;
  toggleUpdateModel();
  preFilData(employees[empId]);
}
updateForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const updateInfo={
    name: updateForm.name.value,
    email: updateForm.email.value,
    id:editingEmployee,
    role: updateForm.role.value,
    doj: updateForm.doj.value,
    gender: updateForm.gender.value,
  }
  employees[editingEmployee]=updateInfo;
  updateForm.reset();
  toggleUpdateModel();

  const record=document.getElementById(editingEmployee);
  let tdcellIndex=0;
  for(let i in updateInfo){
    record.children[tdcellIndex++].innerText=updateInfo[i];
  }
})