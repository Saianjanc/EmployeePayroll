import EmpolyeeDetails from "/js/EmployeeDetails.js"
window.addEventListener("DOMContentLoaded", function (){
    if (localStorage.getItem("EditEmpData")) {
        editData()
    }else{
        const empData = new EmpolyeeDetails()
        displayForm(empData)
    }
    })
function getIds(){
    const empName = window.document.getElementById('formname')
    const profileImg = window.document.querySelectorAll('.profile')
    const empGender = window.document.querySelectorAll('.gender')
    const salaryrange = window.document.getElementById('salary')
    const salarytxt = window.document.getElementById('salarytxt')
    const empDept = window.document.querySelectorAll('.dept')
    const empStartDay = window.document.getElementById('startday')
    const empStartMonth = window.document.getElementById('startmonth')
    const empStartYear = window.document.getElementById('startyear')
    const empNote = window.document.getElementById('notes')
    const cancelbtn = window.document.getElementById('cancel-btn')
    const submitbtn = window.document.getElementById('submit-btn')
    const resetbtn = window.document.getElementById('reset-btn')
    return {empName:empName,profileImg:profileImg,empGender:empGender,salaryrange:salaryrange,salarytxt:salarytxt,empDept:empDept,empStartDay:empStartDay,empStartMonth:empStartMonth,empStartYear:empStartYear,empNote:empNote,cancelbtn:cancelbtn,submitbtn:submitbtn,resetbtn:resetbtn}
}
function displayForm(empData){
    const {empName,profileImg,empGender,salaryrange,salarytxt,empDept,empStartDay,empStartMonth,empStartYear,empNote,cancelbtn,submitbtn,resetbtn} = getIds()
    submitbtn.addEventListener("click", function (){if (empName.value) {storeValue(empData)}})
    cancelbtn.addEventListener("click", function (){
        window.location.href="/pages/dashboard.html"})
    salarytxt.setAttribute("value",salaryrange.value)
    resetbtn.addEventListener("click", function (){
        empName.value=""
        profileImg.forEach(ele=>{ele.checked=false})
        empGender.forEach(ele=>{ele.checked=false})
        empDept.forEach(ele=>{ele.checked=false})
        salaryrange.value=""
        salarytxt.setAttribute("value",salaryrange.value)
        empStartDay.value=""
        empStartMonth.value=""
        empStartYear.value=""
        empNote.value=""
        })
    salaryrange.addEventListener("change", function (){
        salarytxt.setAttribute("value",salaryrange.value)
    })
}
let storedData = []
function storeValue(empData){
    const {empName,profileImg,empGender,salaryrange,empDept,empStartDay,empStartMonth,empStartYear} = getIds()
    empData.name=empName.value
    empData.salary=salaryrange.value
    empData.gender=empGender.value
    empData.dept=empDept.value
    let empStartDate = empStartDay.value+" "+empStartMonth.value+" "+empStartYear.value
    empData.startDate = empStartDate
    profileImg.forEach(ele=>{if(ele.checked){empData.profileImg=ele.value}})
    empGender.forEach(ele=>{if(ele.checked){empData.gender=ele.value}})
    const dataDept = []
    empDept.forEach(ele=>{
        if(ele.checked){dataDept.push(ele.value)}
        empData.dept=dataDept
    })
    if (localStorage.length) {
        storedData = (JSON.parse(localStorage.getItem("EmployeeData")))
        storedData = storedData.filter(ele => ele.Name!=empData.Name)
        localStorage.removeItem("EditEmpData")
    }
    storedData.push(empData)
    localStorage.setItem("EmployeeData",JSON.stringify(storedData))
    window.location.href = "/pages/dashboard.html"
    }
function editData(){
    let i = 0
    const editEmpdata = new EmpolyeeDetails()
    const {empName,profileImg,empGender,salaryrange,salarytxt,empDept,empStartDay,empStartMonth,empStartYear,submitbtn} = getIds()
    const empEditData = localStorage.getItem("EditEmpData")
    const editEmp = JSON.parse(empEditData)
    empName.value=editEmp[0].Name
    salaryrange.value=editEmp[0].Salary
    salarytxt.setAttribute("value",salaryrange.value)
    empDept.value=editEmp[0].Dept
    let empStartDate = editEmp[0].StartDate.split(" ")
    empStartDay.value=empStartDate[0]
    empStartMonth.value=empStartDate[1]
    empStartYear.value=empStartDate[2]
    profileImg.forEach(ele=>{if(ele.value==editEmp[0].empImg){ele.checked=true}})
    empGender.forEach(ele=>{if(ele.value==editEmp[0].Gender){ele.checked=true}})
    empDept.forEach((ele)=>{
    if(ele.value==editEmp[0].Dept[i]){ele.checked=true
    i++}})
    displayForm(editEmpdata)
}