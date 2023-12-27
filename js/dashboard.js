window.addEventListener("DOMContentLoaded",function (){
    const data = this.localStorage.getItem("EmployeeData")
    const empData = JSON.parse(data)
    displayTable(empData)
})
function displayTable(empData) {
    const addbtn = this.document.getElementById('addbtn')
    const empTable = this.document.getElementById('table-ctn')
    let template = `<table>
    <tr>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
    </tr>`
    if (localStorage.getItem("EmployeeData")) {
    empData.forEach(ele => {
        let depTemp =""
        for (const i of ele.Dept) {
            depTemp += `<div class="dept-ctn">${i}</div>`
            }
        template = template + `<tr>
        <td><div class="profileImg"><img src="/assests/${ele.empImg}.png" alt="profileimg"><label>${ele.Name}</label></div></td>
        <td>${ele.Gender}</td>
        <td><div class="dept-outter">`+depTemp+`
        </div></td>
        <td>₹ ${ele.Salary} LPA</td>
        <td>${ele.StartDate}</td>
        <td><div class="action-btn"><img src="/assests/bin.png" alt="delete" width="20px" height="24px" onclick="deleteEmp('${ele.Name}')"> <img src="/assests/edit.png" alt="edit" width="20px" height="20px" onclick="editEmp('${ele.Name}')"></div></td>
        </tr>` 
    });
    empTable.innerHTML = template
    }else{
        empTable.innerHTML = "<center><h1>No Data Found!</h1></center>"
    }
    addbtn.addEventListener("click",function (){
        window.location.href = "/pages/index.html"
    })
}
function deleteEmp(empName) {
    const data = this.localStorage.getItem("EmployeeData")
    const empData = JSON.parse(data)
    let storedData = []
    if (localStorage.length) {
        storedData = (JSON.parse(localStorage.getItem("EmployeeData")))
    }
    empData.forEach(ele => {
        storedData=storedData.filter(ele => ele.Name!=empName)
        })
    if (storedData.length) {
        localStorage.setItem("EmployeeData",JSON.stringify(storedData))
    }else{
        localStorage.clear()
    }
    window.location.reload()
    }
function editEmp(empName){
    let editEmp = []
    const data = this.localStorage.getItem("EmployeeData")
    const empData = JSON.parse(data)
    empData.forEach(ele => {
        editEmp=empData.filter(ele => ele.Name==empName)
        })
    localStorage.setItem("EditEmpData",JSON.stringify(editEmp))
    window.location.href = "/pages/index.html"
}